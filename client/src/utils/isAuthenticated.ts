// src/utils/isAuthenticated.js
import { useUserStore } from '../stores/userStore'; // Asegúrate de que la ruta sea correcta

export const isAuthenticated = () => {
    const { accessToken } = useUserStore.getState(); 

    if (accessToken) {
        return true; 
    } else {
        return false;
    }
};