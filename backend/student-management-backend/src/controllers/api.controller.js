import { successResponse, errorResponse } from "../helpers";
import RegisterStudents from "../services/RegisterStudents";
import GetCommonsStudents from "../services/GetCommonsStudents";
import SuspendStudent from "../services/SuspendStudent";
import UnsuspendStudent from "../services/UnsuspendStudent";
import SendNotifications from "../services/SendNotifications";

export const register = async (req, res) => {
  try {
    const service = new RegisterStudents(req.body);
    await service.call();
    return successResponse(req, res, {}, 204);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getCommonsStudents = async (req, res) => {
  try {
    const service = new GetCommonsStudents(req.query);
    const result = await service.call();
    return successResponse(req, res, result, 200);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const suspendStudent = async (req, res) => {
  try {
    const service = new SuspendStudent(req.body);
    const result = await service.call();
    if (!result) return errorResponse(req, res, 'Student provided does not exist', 400);
    return successResponse(req, res, result, 204);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const unsuspendStudent = async (req, res) => {
  try {
    const service = new UnsuspendStudent(req.body);
    const result = await service.call();
    return successResponse(req, res, result, 204);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const sendNotification = async (req, res) => {
  try {
    const service = new SendNotifications(req.body);
    const result = await service.call();
    if (!result) return errorResponse(req, res, 'Tutor does not exist', 400);
    return successResponse(req, res, result, 200);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
