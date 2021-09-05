
const models = require('../models');
const Student = models.Student;
const Tutor = models.Tutor;
const TutorsStudents = models.Tutors_Students;

const commonHelper = require('../helpers/common');
const { sequelize } = require('../models');

let params = {};

class RegisterStudents {
  constructor(body) {
    params = body;
    
  }

  createTutor = async (email) => {
    try {
      let tutor = await Tutor.findOrCreate({
        where: {email: params.tutor}
      });
      return  tutor;
    } catch (error) {
      return this.createTutor(email);
    }
  }

  async call() {
    const transaction = await sequelize.transaction();
    
    try {
      let tutor = await this.createTutor(params.tutor) 
      console.log('Start registration attempt.');
      // created formatted array for bulkCreation of students
      const formattedStudentEmails = commonHelper.formatEmailArray(params.students);
      return await Student.bulkCreate(formattedStudentEmails, { updateOnDuplicate: ['email'],  transaction: transaction })
        .then(async(students) => {
          const newStudentRecords = await Student.findAll({
            lock: true,
            transaction: transaction
          }); // get all newly created students from transaction
          console.log('Student creation success.');

          // created formatted array for bulkCreation of tutors_students
          const tutorStudentsList = commonHelper.mapTutorStudents(tutor[0].dataValues.id, newStudentRecords).map(ts => ts);
          
          return await TutorsStudents.bulkCreate(tutorStudentsList, {  transaction: transaction })
            .then((newMapping) => {
              transaction.commit();
              console.log('Student registration to tutor success.');
              return 'Student registration to tutor success';
            })
            .catch((err) => {
              transaction.rollback();
              console.log('Student registration to tutor failed. Transaction rolled back.\n\n', err);
              return new Error('Student registration to tutor failed. Transaction rolled back.\n\n', err);
            });
        })
        .catch((err) => {
          transaction.rollback();
          console.log('Student creation failed. Transaction rolled back.\n\n', err);
          return new Error('Student creation failed. Transaction rolled back.\n\n', err);
        });
      
    } catch (error) {
      transaction.rollback();
      console.log('Registration attempt failed. Transaction rolled back.\n\n', error);
      return new Error('Registration attempt failed. Transaction rolled back.\n\n', error)
    }
  }

}

module.exports = RegisterStudents;
