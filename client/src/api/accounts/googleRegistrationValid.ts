import axios from "axios"

export const googleAuthenticationValid = async (url: string) => {

    const config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }

    try {
        const response = await axios.post(url, config)
        const { data } = response
        return { data }

    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}
