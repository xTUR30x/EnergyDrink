import axios from 'axios'

export const register = async ( user: Object ) => {

    const url = `http://localhost:8000/auth/users/`

    try {
        const response = await axios.post(url, user)
        const { status } = response
        return { status }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}