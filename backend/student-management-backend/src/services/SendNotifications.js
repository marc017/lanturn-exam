const models = require('../models');
const Notifications = models.Notifications;
const Student = models.Student;
const Tutor = models.Tutor;
const TutorsStudents = models.Tutors_Students;
const commonHelper = require('../helpers/common');
const { sequelize } = require('../models');
const { Op } = require("sequelize");

let params = {};

class SendNotifications {
  constructor(body) {
    params = body;
  }

  async call() {
    const transaction = await sequelize.transaction();
    try {
        const tutor = await Tutor.findOne({ where: {email: params.tutor},  include: ['Students']});
        if (!tutor) return false;
        const taggedEmails = commonHelper.extractTaggedEmails(params.notification)?.map(email => email.substr(1));
        let recipients = tutor.Students.map(student => student.dataValues.email);
        
        if (taggedEmails && taggedEmails !== null) {
            // has tagged emails
            taggedEmails.map(email => {
                const receipientIndex = recipients.findIndex(r => r === email);
                if (receipientIndex <= -1) recipients.push(email);
            });
        }

        const formattedBody = await this.getFormattedBody([...recipients], tutor.id, params.notification);
        const finalReceipients = formattedBody.map(body => body.studentEmail);

        return Notifications.bulkCreate(formattedBody, {transaction: transaction})
            .then(res => {
                transaction.commit();
                return { recipients: finalReceipients};
            })
            .catch(err => {
                transaction.rollback();
                return err;
            });
    } catch (error) {
        transaction.rollback();
        console.log('Unexpected error', error);
        return new Error(`Unexpected error occured during suspending student '${params}'`);
    }
  }

  getFormattedBody = (recipients, tutorId, message) => {
    let promises = [];
    // prepare body for bulkCreate
    recipients.map(async (email) => {
        promises.push(this.getStudentByEmail(email));
        
    });
    
    return Promise.all(promises)
        .then(res => {
            return(res.map(student => {
                if (student && student !== null) {
                    return {
                        tutorId: tutorId,
                        studentId: student.id,
                        studentEmail: student.email,
                        message: message
                    }
                }
            }).filter(body => body));
        })
        .catch(err => {return(err)});
    
  }

  getStudentByEmail = async (email) => {
      return await Student.findOne({
          where: {
            [Op.and]: [
                {email: email },
                {isSuspended: false}
            ]
        }});
  }

}

module.exports = SendNotifications;
