import axios from "axios";

export const sendChangePasswordMail = async (email: string) => {

    const url = `http://localhost:8000/auth/users/reset_password/`;

    const data = {
        email
    }

    try {
        const response = await axios.post(url, data);
        const { status } = response
        return { status }
    } catch(error) {
        console.error('Error realizando la peticion', error)
        return { error }
    }
}