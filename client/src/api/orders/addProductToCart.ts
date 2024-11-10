import axios from "axios";
import { refreshTokens } from '../../utils/refreshTokens';
import { useUserStore } from '../../stores/userStore'; 

export const addProductToCart = async (user_id: string, product_id: string) => {
    
    const { accessToken } = useUserStore.getState(); 
    const url = `http://localhost:8000/orders/${user_id}/add/${product_id}/`;

    try {
        const response = await axios.post(url, {}, { // Asegúrate de enviar un cuerpo vacío si no es necesario
            headers: {
                Authorization: `JWT ${accessToken}` // Incluye el token en las cabeceras
            }
        });

        const { status, data } = response;
        return { status, data };
    } catch (error) {
        console.error('Error al realizar la petición:', error);

        // Verifica si el error es por un token expirado o inválido
        if (error.response && error.response.data && error.response.data.code === "token_not_valid") {
            console.log('Token expirado o inválido. Intentando refrescar el token...');
            const refreshResponse = await refreshTokens(); // Llama a la función para refrescar el token

            if (refreshResponse.status === 200) {
                const newAccessToken = refreshResponse.data.access;

                useUserStore.setState({ 
                    accessToken: newAccessToken,
                });

                // Intenta nuevamente la solicitud con el nuevo token
                const retryResponse = await axios.post(url, {}, {
                    headers: {
                        Authorization: `JWT ${newAccessToken}` // Usa el nuevo token
                    }
                });

                return { status: retryResponse.status, data: retryResponse.data }; // Retorna los datos de la nueva solicitud
            } else {
                console.error('No se pudo refrescar el token. Redirigiendo al login.');
                return { error: 'Token refresh failed' }; // Maneja el fallo en el refresco según tu lógica
            }
        }

        return { error }; // Retorna cualquier otro error
    }
};