import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Request interceptor for adding tokens
axiosInstance.interceptors.request.use(
    async config => {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));

        if (authTokens) {
            const { access, refresh } = authTokens;
            const decodedToken = jwtDecode(access);
            const currentTime = Date.now() / 1000;

            // Check if the access token is expired
            if (decodedToken.exp < currentTime) {
                try {
                    const response = await axios.post('http://localhost:8000/api/token/refresh/', {
                        refresh: refresh
                    });

                    const newAuthTokens = response.data;
                    localStorage.setItem('authTokens', JSON.stringify(newAuthTokens));
                    config.headers['Authorization'] = `Bearer ${newAuthTokens.access}`;
                } catch (error) {
                    console.log('Error refreshing token:', error);
                    // Handle token refresh error (e.g., redirect to login)
                }
            } else {
                config.headers['Authorization'] = `Bearer ${access}`;
            }
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
