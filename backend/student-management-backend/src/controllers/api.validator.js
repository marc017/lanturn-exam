import { Joi } from "express-validation";

export const register = {
  body: Joi.object({
    tutor: Joi.string().email().required(),
    students: Joi.array().items(Joi.string().email()).required().min(1),
  }),
};

export const getCommonsStudents = {
  query: Joi.object({
    tutor: Joi.array().items(Joi.string().email()).required().single(),
  }),
};

export const suspendStudent = {
  body: Joi.object({
    student: Joi.string().email().required(),
  }),
};

export const sendNotifications = {
  body: Joi.object({
    tutor: Joi.string().email().required(),
    notification: Joi.string().required()
  }),
};

