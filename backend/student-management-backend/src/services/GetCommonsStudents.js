
const models = require('../models');
const Tutor = models.Tutor;

let params = {};

class GetCommonsStudents {
  constructor(query) {
    params = query.tutor;
  }

  async call() {
    const tutorList = await Tutor.findAll({
        include: [
            'Students'
        ],
        where: { 
            email: params
        }
    });

    // get common students
    let commonStudents = [];
    let combinedStudentList = tutorList.map(tutor => tutor.Students).flat();
     // combine student lists

    if (tutorList.length > 1) {
        // has multiple tutors, perform filter
        commonStudents = this.filterCommonStudents([...combinedStudentList]); // call function to get common students from list
    } else {
        // has only one tutor, get all emails from current list
        commonStudents = combinedStudentList.map(student => student.dataValues.email);
    }

    return { students : commonStudents };
  }

  /**
   * Recursive function to get common students
   * @param studentList Array<Student> input required
   * @param commonStudentList Array<String> input optional, will be populated and returned when recursion ends
   * **/
  filterCommonStudents = (studentList, commonStudentList = []) => {
    const student = studentList.pop(); // remove one element from list to easily check for 
    const duplicateIndex = studentList.findIndex(s => s.email === student.email); // try to check if another record of exists in the array

    if (duplicateIndex >= 0) {
        const commonIndex = commonStudentList.findIndex(c => c === student.dataValues.email); // check first if current student is in the common list
        if (commonIndex <= -1) commonStudentList.push(student.dataValues.email); // if not yet existing on common list, add it
    }

    if (studentList.length === 0 ) {
        return commonStudentList; // return common student list once input list is empty
    } else {
        return this.filterCommonStudents(studentList, commonStudentList); // call function recursively until length of input array is 0
    }
  }
}

module.exports = GetCommonsStudents;
