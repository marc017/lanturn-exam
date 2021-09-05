export const formatEmailArray = (emails) => {
    let results = [];
    for (let email of emails) {
        results.push({ email: email });
    }

    return results;
}

export const mapTutorStudents = (tutorId, students) => {
    let results = [];
    for (let student of students) {
        results.push({tutorId: tutorId, studentId: student.dataValues.id});
    }
    return results;
}

export const extractTaggedEmails = (input) => input.match(/\@[a-zA-Z0-9\.]+\@[a-zA-Z0-9\.]+\.[a-zA-Z]+/g);

