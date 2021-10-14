// declarar todas las llamadas de la api
import { Http, HttpGet } from './https';
import getEnvVars from '../../environment';
const {
    API_URL,
} = getEnvVars();

export const login = (username, password, code) => (
    Http(
        url = `${API_URL}/login`,
        method = 'post',
        data = { username, password, code },
        showError = true,
    )
);

export const getLeaderboard = (urlExtra) => (
    HttpGet(
        url = `${API_URL}/dashboard/leaderboard?${urlExtra}`,
        method = 'get',
        showError = false,
    )
);

export const markNotifications = () => (
    Http(
        url = `${API_URL}/notifications/mark_as_seen`,
        method = 'put',
        data = {},
        showError = false,
    )
);