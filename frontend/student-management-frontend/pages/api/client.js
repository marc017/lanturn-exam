import axios from 'axios';
import * as settings from '../../config/settings';

// const apiClient = create({
//   baseURL: settings.default.apiUrl,
// });

const apiClient = axios.create({
    baseUrl: settings.default.apiUrl
});

// const get = apiClient.get;
// apiClient.get = async (url, params) => {
//     console.log(url, apiClient.get);
//   const response = await get(url, params);

//   if (response.ok) {
//     return response;
//   }

//   return response;
// };

export default apiClient;
