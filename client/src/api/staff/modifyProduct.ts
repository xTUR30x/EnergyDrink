// src/api/orders/addProduct.js
import axios from 'axios';
import { refreshTokens } from '../../utils/refreshTokens';
import { useUserStore } from '../../stores/userStore'; 

export const modifyProduct = async (productData: object, bevarage_id: string) => {
    const { accessToken } = useUserStore.getState(); // Obtén el access token desde el store
    const url = `http://localhost:8000/bevarages/staff/${bevarage_id}/`; // URL para agregar productos

    try {
        const response = await axios.patch(url, productData, {
            headers: {
                Authorization: `JWT ${accessToken}`
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

                return modifyProduct(productData, bevarage_id);
            } else {
                console.error('No se pudo refrescar el token. Redirigiendo al login.');
                return { error: 'Token refresh failed' };
            }
        }

        return { error: error.response ? error.response.data : error }; // Retorna el mensaje de error
    }
};