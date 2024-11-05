import axios from 'axios'

export const getUserProfile = async ( user_id: string ) => {

    const url = `http://localhost:8000/users/profile/${user_id}`

    try {
        const response = await axios.post(url)
        const { status, data } = response
        return { status, data }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}