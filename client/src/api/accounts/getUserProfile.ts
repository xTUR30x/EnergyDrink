import axios from 'axios';
import { refreshTokens } from '../../utils/refreshTokens';
import { useUserStore } from '../../stores/userStore';

export const getUserProfile = async (accessToken: string, userId: string) => {
    const url = `http://localhost:8000/users/profile/${userId}`;
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `JWT ${accessToken}`
            }
        });
        
        const { status, data } = response;
        return { status, data };
    } catch (error) {
        console.error('Error al realizar la petición:', error);

        
        if (error.response && error.response.data && error.response.data.code === "token_not_valid") {
            console.log('Token expirado o inválido. Intentando refrescar el token...');
            const refreshResponse = await refreshTokens(); 

            if (refreshResponse.status === 200) {
                
                const newAccessToken = refreshResponse.data.access;

                useUserStore.setState(prevState => ({
                    ...prevState, 
                    accessToken: newAccessToken, 
                }));

                return getUserProfile(newAccessToken, userId); 
            } else {
                console.error('No se pudo refrescar el token. Redirigiendo al login.');
                return { error: 'Token refresh failed' }; 
            }
        }

        return { error };
    }
};