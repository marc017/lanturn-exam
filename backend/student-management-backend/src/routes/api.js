import express from "express";

import { validate } from "express-validation";

import * as apiController from "../controllers/api.controller";
import * as apiValidator from "../controllers/api.validator";

const router = express.Router();
const models = require('../models');
const Student = models.Student;
const Tutor = models.Tutor;


// tutor routes
router.post("/register", validate(apiValidator.register, { keyByField: true }), apiController.register);
router.get('/getCommonsStudents', validate(apiValidator.getCommonsStudents, { keyByField: true }),apiController.getCommonsStudents);

// suspension routes
router.post('/suspend', validate(apiValidator.suspendStudent, { keyByField: true }), apiController.suspendStudent);
router.post('/unsuspend', validate(apiValidator.suspendStudent, { keyByField: true }), apiController.unsuspendStudent);

// notification routes
router.post('/sendNotification', validate(apiValidator.sendNotifications, { keyByField: true }), apiController.sendNotification)


module.exports = router;
