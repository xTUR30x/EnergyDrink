import axios from 'axios'

export const validateAccount = async ( uid: string, token: string ) => { 

    const url = `http://localhost:8000/auth/users/activation/`

    const body = { 
        uid, 
        token 
    };
    console.log(body);

    try {
        const response = await axios.post(url, body)
        const { status } = response
        return { status }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}