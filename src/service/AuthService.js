import axios from "axios";

const endpoint = process.env.REACT_APP_API_ENDPOINT;

export class AuthService {
    getLogin(email, password) {
        return axios.post(endpoint + "/login", {
            email: email,
            password: password,
        });
    }
    getLogout(AuthToken) {
        const config = {
            headers: { Authorization: `Bearer ${AuthToken}` },
        };
        return axios.post(endpoint + "/logout", {}, config);
    }
    getForgotPassword(email) {
        return axios.post(endpoint + "/forgot-password", {
            email: email,
        });
    }
    getResetPassword(token, password, password_confirm, email) {
        return axios.post(endpoint + "/update-password", {
            email: email,
            password: password,
            password_confirmation: password_confirm,
            token: token,
        });
    }
}
