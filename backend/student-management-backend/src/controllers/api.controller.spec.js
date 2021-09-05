require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const request = require("supertest");
const app = require("../testEntry");
const faker = require("faker");

const { truncate } = require("../testHelper");

const { fake } = require("faker");

describe("Api Controller", () => {
  describe("Register API", () => {
    describe("Invalid body", () => {
      it("should fail without tutor ", async (done) => {
        const { statusCode, body } = await request(app).post("/api/register").send();
        const { message, details } = body;

        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ tutor: '"tutor" is required' }]);
        expect(statusCode).toEqual(400);
        done();
      });

      it("should fail without students ", async (done) => {
        let payload = {
            tutor: 'a@tutor.com'
        }
        const { statusCode, body } = await request(app).post("/api/register").send(payload);
        const { message, details } = body;
        
        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ students: '"students" is required' }]);
        expect(statusCode).toEqual(400);
        done();
      });

      it("should fail if tutor is not an email", async (done) => {
        const { statusCode, body } = await request(app).post("/api/register").send({tutor: 'atutorcom'});
        const { message, details } = body;


        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ tutor: '"tutor" must be a valid email' }]);
        expect(statusCode).toEqual(400);
        done();
      });

      it("should fail if students are not in email format", async (done) => {
        const { statusCode, body } = await request(app).post("/api/register").send({tutor: 'a@tutor.com', students: ['astudent']});
        const { message, details } = body;
        console.log(details[0][0]);
        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ '0': '"students[0]" must be a valid email' }]);
        expect(statusCode).toEqual(400);
        done();
      });
    });

    describe("Valid body", () => {
      it("should pass for new tutor and students", async (done) => {
        let payload = {
          tutor: 'a@tutor.com',
          students: [
            'newA@student.com',
            'newB@student.com'
          ]
        }
        const { statusCode, body } = await request(app).post("/api/register").send(payload);

        expect(statusCode).toEqual(204);
        done();
      });

      it("should pass for existing tutor and new students", async (done) => {
        let payload = {
          tutor: 'a@tutor.com',
          students: [
            'newD@student.com',
            'newE@student.com'
          ]
        }
        const { statusCode, body } = await request(app).post("/api/register").send(payload);

        expect(statusCode).toEqual(204);
        done();
      });

      it("should pass for new tutor and old students", async (done) => {
        let payload = {
          tutor: 'newA@tutor.com',
          students: [
            'newA@student.com',
            'newB@student.com'
          ]
        }
        const { statusCode, body } = await request(app).post("/api/register").send(payload);

        expect(statusCode).toEqual(204);
        done();
      });
    });
  });

  describe("GetCommonStudents API", () => {
    describe("Invalid query", () => {
      it("should fail without tutor ", async (done) => {
        const { statusCode, body } = await request(app).get("/api/getCommonsStudents").send();
        const { message, details } = body;

        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ tutor: '"tutor" is required' }]);
        expect(statusCode).toEqual(400);
        done();
      });

      it("should fail if tutor is not an email ", async (done) => {
        const query = {
          tutor: ['atutorcom']
        }
        // const result = await request(app).get("/api/getCommonsStudents").send(query);
        const { statusCode, body } = await request(app).get("/api/getCommonsStudents").query(query);
        const { message, details } = body;
        console.log(body);
        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ undefined: '"tutor" must be a valid email' }]);
        expect(statusCode).toEqual(400);
        done();
      });
    });

    describe("Valid query", () => {
      it("should pass for single common tutor ", async (done) => {
        const query = {
          tutor: ['newA@tutor.com']
        }
        const { statusCode, body } = await request(app).get("/api/getCommonsStudents").query(query);
        const { message, details } = body;

        expect(body.students instanceof Array).toBeTruthy();
        expect(statusCode).toEqual(200);
        done();
      });

      it("should pass for multiple common tutor", async (done) => {
        const query = {
          tutor: ['a@tutor.com', 'newA@tutor.com']

        }
        const { statusCode, body,  } = await request(app).get("/api/getCommonsStudents").query(query);
        const { message, details } = body;
        
        expect(body.students instanceof Array).toBeTruthy();
        expect(statusCode).toEqual(200);
        done();
      });
    });
  });

  describe("SuspendStudent API", () => {
    describe("Invalid body", () => {
      it("should fail for nonexistent student", async (done) => {
        const payload = {
          student: 'nonexisting@student.com'
        }
        const { statusCode, body } = await request(app).post("/api/suspend").send(payload);
        const { message, details, code } = body;

        expect(message).toEqual("Student provided does not exist");
        expect(code).toEqual(400);
        done();
      });
    });

    describe("Valid body", () => {
      it("should pass for existing student", async (done) => {
        const payload = {
          student: 'newA@student.com'
        }
        const { statusCode, body } = await request(app).post("/api/suspend").send(payload);

        expect(statusCode).toEqual(204);
        done();
      });
    });
  });

  describe("ReceiveNotifications API", () => {
    describe("Invalid body", () => {
      it("should fail if tutor is empty", async (done) => {
        const payload = {
          notification: 'some message'
        }
        const { statusCode, body } = await request(app).post("/api/sendnotification").send(payload);
        const { message, details } = body;

        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ tutor: '"tutor" is required' }]);
        expect(statusCode).toEqual(400);
        done();
      });

      it("should fail if notification is empty", async (done) => {
        const payload = {
          tutor: 'a@tutor.com'
        }
        const { statusCode, body } = await request(app).post("/api/sendnotification").send(payload);
        const { message, details } = body;

        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ notification: '"notification" is required' }]);
        expect(statusCode).toEqual(400);
        done();
      });
    });
  });

  describe("Valid body", () => {
    it("should fail if tutor doesnt exist", async (done) => {
      const payload = {
        tutor: 'nonexisting@tutor.com',
        notification: 'some notification'
      }
      const { statusCode, body } = await request(app).post("/api/sendnotification").send(payload);
      const { message, details, code } = body;

      expect(message).toEqual("Tutor does not exist");
      expect(code).toEqual(400);
      done();
    });

    it("should pass and retrieve students that belongs to the tutor", async (done) => {
      const payload = {
        tutor: 'nonexisting@tutor.com',
        notification: 'some notification'
      }
      const { statusCode, body } = await request(app).post("/api/sendnotification").send(payload);
      const { message, details, code } = body;

      // console.log(message, body);
      expect(message).toEqual("Tutor does not exist");
      expect(code).toEqual(400);
      done();
    });

    it("should pass and retrieve students that belongs to the tutor and mentioned students", async (done) => {
      done();
    });

    it("should pass and retrieve students that are not suspended only", async (done) => {
      done();
    });
  });
});
