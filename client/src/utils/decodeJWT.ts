// src/api/jwtService.js
import { useUserStore } from '../stores/userStore'; // Asegúrate de que la ruta sea correcta

export const decodeJWT = (token: string) => {
    try {
        // Divide el token en sus tres partes
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Token no válido');
        }

        // Decodifica la parte del payload (segunda parte)
        const payload = JSON.parse(atob(parts[1])); // atob() decodifica Base64

        if (payload) {
            const { user_id, is_staff } = payload; // Asegúrate de que estos campos existan en tu payload
            const setUserStore = useUserStore.getState(); 
            
            // Actualiza el store con los valores decodificados
            setUserStore.setUserId(user_id);
            setUserStore.setIsStaff(is_staff);
        } else {
            console.error('No se pudo decodificar el payload.');
        }
    } catch (error) {
        console.error('Error al decodificar el JWT:', error);
    }
};