import axios from "axios";
import { refreshTokens } from '../../utils/refreshTokens';
import { useUserStore } from '../../stores/userStore'; 

export const getUserOrders = async (id: string) => {
    const { accessToken } = useUserStore.getState(); 
    const url = `http://localhost:8000/orders/${id}/orders`;

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

                useUserStore.setState({ 
                    accessToken: newAccessToken, 
                });


                
                const retryResponse = await axios.get(url, {
                    headers: {
                        Authorization: `JWT ${newAccessToken}` 
                    }
                });

                return { status: retryResponse.status, data: retryResponse.data }; 
            } else {
                console.error('No se pudo refrescar el token. Redirigiendo al login.');
                return { error: 'Token refresh failed' }; 
            }
        }

        return { error }; 
    }
};