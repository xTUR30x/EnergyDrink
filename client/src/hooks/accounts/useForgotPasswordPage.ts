import toast from "react-hot-toast";
import { sendChangePasswordMail } from "../../api/accounts/sendChangePasswordMail";
import { useState } from "react";
import { errorHandler } from "../../api/accounts/errorHandler";


export const useForgotPasswordPage = () => {

    const [email, setEmail] = useState('');
    const [canReSendEmail, setCanReSendEmail] = useState(true)
    

    const onEmailChange = ( { target } ) => {
        setEmail(target.value)
      }

    const sendEmail = () => {
        setCanReSendEmail(true);
    }

    const handleSendEmail = () => {

        if( canReSendEmail === true ) {
            setCanReSendEmail(false);
            setTimeout(sendEmail, 60000);
        }
  
      }

    
    const submit = async (event) => {

        event.preventDefault()
        const loading = toast.loading('Loading')
   

        try {
            const { status, error } = await sendChangePasswordMail(email);
            
                if (status === 204) {
                    toast.dismiss(loading)
                    // Mostrar notificación
                    toast.success("Email sent, check your mail", {
                    position: "top-center",
                    duration: 3000
                    })
                
                    handleSendEmail()
                
                }
                else {
                    toast.dismiss(loading)
                    errorHandler(error.response.data)
                }
        } catch (error) {
            console.error('Error petition went wrong:', error);
        }

    }



    return {
        canReSendEmail,


        submit,
        onEmailChange,
    }
          
}