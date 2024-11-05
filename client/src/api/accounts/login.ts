import axios from 'axios'

export const login = async ( user: Object ) => {

    const url = `http://localhost:8000/users/token/`

    try {
        const response = await axios.post(url, user)
        const { status, data } = response
        return { status, data }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}