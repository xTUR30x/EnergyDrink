import axios from "axios"

export const googleRegistration = async () => {
  
    const url = `http://127.0.0.1:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:5173/auth`

    try {
        const response = await axios.get(url)
        console.log(response)
        const { data } = response
        return { data }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}
