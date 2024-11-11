import axios from 'axios';
import { refreshTokens } from '../../utils/refreshTokens';
import { useUserStore } from '../../stores/userStore';

export const getUsers = async (accessToken: string) => {
    const url = `http://localhost:8000/users/users/`; // Asegúrate de que esta URL sea correcta

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `JWT ${accessToken}` // Incluye el token en las cabeceras
            }
        });
        
        const { status, data } = response;
        console.log(data)
        return { status, data };
    } catch (error) {
        console.error('Error al realizar la petición:', error);

        // Verifica si el error es por un token expirado o inválido
        if (error.response && error.response.data && error.response.data.code === "token_not_valid") {
            console.log('Token expirado o inválido. Intentando refrescar el token...');
            const refreshResponse = await refreshTokens(); // Llama a la función para refrescar el token

            if (refreshResponse.status === 200) {
                // Si el refresco fue exitoso, intenta obtener el perfil del usuario nuevamente
                const newAccessToken = refreshResponse.data.access;

                useUserStore.setState(prevState => ({
                    ...prevState, // Mantiene el resto del estado
                    accessToken: newAccessToken, // Actualiza solo el accessToken
                }));

                return getUserProfile(newAccessToken, userId); // Llama nuevamente a getUserProfile con el nuevo token
            } else {
                console.error('No se pudo refrescar el token. Redirigiendo al login.');
                return { error: 'Token refresh failed' }; // Maneja el fallo en el refresco según tu lógica
            }
        }

        return { error };
    }
};