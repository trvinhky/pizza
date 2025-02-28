import axios from "axios";
import store from '~/store';
import AccountAPI from '~/services/account'
import { logOut, setToken } from "~/store/slices/accountSlice";
import { PATH } from "~/utils/const/path";

const api = axios.create({
    baseURL: import.meta.env.VITE_URL_BACKEND,
    withCredentials: true, // Để cookie chứa refreshToken có thể được gửi
});

api.interceptors.request.use(
    config => {
        const state = store.getState();
        const token = state.account.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (!error.response) {
//             store.dispatch(logOut());
//             return Promise.reject(error);
//         }

//         if ((error.response.status === 401 || error.response.status === 403) && originalRequest && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 const response = await AccountAPI.updateToken();

//                 if (!response || !response.data || response.status !== 201) {
//                     throw new Error("Token refresh failed");
//                 }

//                 const { data } = response;
//                 store.dispatch(setToken(data.token));
//                 originalRequest.headers['Authorization'] = `Bearer ${data.token}`;

//                 return axios(originalRequest);
//             } catch (refreshError) {
//                 console.error("Token refresh failed", refreshError);
//                 window.location.href = `/${PATH.LOGIN}`;
//                 store.dispatch(logOut());
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );


export default api