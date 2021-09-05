const models = require('../models');
const Student = models.Student;

let params = {};

class SuspendStudent {
  constructor(body) {
    params = body.student;
  }

  async call() {
    try {
        const student = await Student.findOne({ where: {email: params}});
        if (!student) return false;
        student.isSuspended = true;
        student.save({ fields: ['isSuspended']});
        return true;    
    } catch (error) {
        return new Error(`Unexpected error occured during suspending student '${params}'`);
    }
  }

}

module.exports = SuspendStudent;
