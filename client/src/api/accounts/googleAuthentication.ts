import axios from "axios"

axios.defaults.withCredentials = true;

export const googleAuthentication = async (state: string, code: string) => {
  
    const body = {
        'state': state,
        'code': code,
    }

    const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');
    
    const url = `http://127.0.0.1:8000/auth/o/google-oauth2/?${formBody}`;
    console.log(url)
    
    const config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }

    try {
        const response = await axios.post(url)
        const { data } = response
        return { data }

    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}
