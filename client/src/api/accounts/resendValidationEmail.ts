import axios from 'axios'

export const reSendValidationEmail = async ( email: string ) => { 

    const url = `http://localhost:8000/auth/users/resend_activation/`

    const body = { 
        email 
    };

    try {
        const response = await axios.post(url, body)
        const { status } = response
        console.log(status);
        return { status }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}