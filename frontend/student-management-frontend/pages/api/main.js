import client from './client';
import axios from 'axios';
import * as settings from '../../config/settings';

const endPoint = '/getCommonsStudents';
const baseUrl = settings.default.apiUrl;
// axios.create({
//     baseUrl: settings.default.apiUrl
// });

const getCommonsStudents = async (tutorEmails) => {
    return axios.get(`${baseUrl}${endPoint}`, {params:{tutor: tutorEmails}});
}

export default {
    getCommonsStudents
}