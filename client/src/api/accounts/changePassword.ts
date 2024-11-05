import axios from "axios";

export const changePassword = async (uid: string, token: string, new_password: string, re_new_password: string) => {

    const url = `http://localhost:8000/auth/users/reset_password_confirm/`;

    const data = {
        uid,
        token,
        new_password,
        re_new_password,
    }

    try {
        const response = await axios.post(url, data)
        const { status } = response
        return { status }
    } catch(error) {
        console.error('Error al realizar la peticion', error)
        return { error };
    }
}
