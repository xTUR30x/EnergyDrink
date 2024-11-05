import axios from 'axios'
import { useUserStore } from '../../stores/userStore';

export const updateAccessToken = async () => {

    const { refreshToken } = useUserStore(); 

    const url = `http://localhost:8000/auth/jwt/refresh`

    try {
        const response = await axios.post(url, refreshToken)
        const { status, data } = response
        return { status, data }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}