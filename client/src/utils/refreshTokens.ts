import axios from 'axios';
import { useUserStore } from '../stores/userStore';

export const refreshTokens = async () => {
    const url = `http://localhost:8000/auth/jwt/refresh`;
    const { refreshToken, setAccessToken, setRefreshToken } = useUserStore.getState(); 

    const refresh = {
        "refresh": refreshToken
    };

    try {
        
        const response = await axios.post(url, refresh);
        const { status, data } = response;

        
        if (status === 200) {
            setAccessToken(data.access); 
        }

        return { status, data };
    } catch (error) {
        console.error('Error al realizar la petición:', error);
        return { error };
    }
};