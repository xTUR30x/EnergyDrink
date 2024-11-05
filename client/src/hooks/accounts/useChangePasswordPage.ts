import { useState } from "react"
import toast from "react-hot-toast"
import { changePassword } from "../../api/accounts/changePassword";
import { getChangePasswordData } from "../../api/accounts/getChangePasswordData";
import { useNavigate } from "react-router-dom";

export const useChangePassword = () => {

    const navigate = useNavigate()
    const [newPassword, setNewPassword] = useState('')
    const [reNewPassword, setReNewPassword] = useState('')

    const onNewPasswordChange = ( { target } ) => {
        setNewPassword(target.value);
    }

    const onReNewPasswordChange = ( { target } ) => {
        setReNewPassword(target.value);
    }


    const submit = async (event) => {
        event?.preventDefault()
        const loading = toast.loading('Loading') //arreglar
        const { uid, token } = await getChangePasswordData()
        const { status } = await changePassword(uid, token, newPassword, reNewPassword)
        console.log(status)
        
        if(status === 204) {
            toast.dismiss(loading)
            // Mostrar notificación
            toast.success("Password Changed, Redirecting to Login", {
              position: "top-center",
              duration: 3000
            })
            
            // Redirigir a la página de login después de un breve retraso
            setTimeout(() => {
              navigate('/login');
            }, 3000);
        }
    
      }

    return {
        newPassword,
        reNewPassword,

        onNewPasswordChange,
        onReNewPasswordChange,
        submit,
    }
}