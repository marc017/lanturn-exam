const models = require('../models');
const Student = models.Student;

let params = {};

class UnsuspendStudent {
  constructor(body) {
    params = body.student;
  }

  async call() {
    try {
        const student = await Student.findOne({ where: {email: params}});
        student.isSuspended = false;
        student.save({ fields: ['isSuspended']});
        return true;    
    } catch (error) {
        return new Error(`Unexpected error occured during unsuspending student '${params}'`);
    }
  }

}

module.exports = UnsuspendStudent;
