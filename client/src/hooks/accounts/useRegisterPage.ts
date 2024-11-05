import { useState } from 'react';
import toast from 'react-hot-toast';
import { register } from '../../api/accounts/register';
import { reSendValidationEmail } from '../../api/accounts/resendValidationEmail';
import { errorHandler } from '../../api/accounts/errorHandler';
import { googleRegistration } from '../../api/accounts/googleRegistration';

export const useRegisterPage = () => {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('') ;
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [canReSendEmail, setCanReSendEmail] = useState(true);
  const [showMessage, setShowMessage] = useState(false);


    const onNameChange = ( { target } ) => {
        setName(target.value)
    }
  
    const onLastNameChange = ( { target } ) => {
      setLastName(target.value)
    }
  
    const onEmailChange = ( { target } ) => {
      setEmail(target.value)
    }

    const onDniChange = ( { target } ) => {
      setDni(target.value)
    }
  
    const onPasswordChange = ( { target } ) => {
      setPassword(target.value)
    }
  
    const onRePasswordChange = ( { target } ) => {
      setRePassword(target.value)
    }
  
    const sendEmail = () => {
      setCanReSendEmail(true);
    }

    const handleSendEmail = () => {

      if( canReSendEmail === true ) {
        setShowMessage(true);
        setCanReSendEmail(false);
        setTimeout(sendEmail, 60000);
      }

    }

    const onResendEmail = async () => {

      if (email !== '') {
        const loading = toast.loading('Loading')
        const { status } = await reSendValidationEmail(email);
  
        if (status === 204) {
          toast.dismiss(loading)
            // Mostrar notificación
            toast.success("Validation Email Sent, Check your email", {
              position: "top-center",
              duration: 3000
            })
            handleSendEmail()
        }
        else {
          toast.dismiss(loading)
          toast.error("Error verify your email")
        }

      }
      else {
        toast.error("Please check your email")
      }

    }
  
    const submit = async (event) => {
  
        event.preventDefault();
        const loading = toast.loading('Loading')
  
        const user = {
            first_name: name,
            last_name: lastName,
            email: email,
            dni: dni,
            password: password,
            re_password: rePassword,
        }
  
        try {
          const { status, error } = await register(user);
          
          if (status === 201) {
              toast.dismiss(loading)
                // Mostrar notificación
                toast.success("Account Created, Check your email", {
                  position: "top-center",
                  duration: 3000
                })
                
                handleSendEmail()
                
                
                // Redirigir a la página de login después de un breve retraso
                setTimeout(() => {
                }, 3000);
            }
            else {
              toast.dismiss(loading)
              errorHandler(error.response.data)
            }
        } catch (error) {
            console.error('Error petition went wrong:', error);
        }
    }

    const onGoogleRegistration = async () => {

      try {
        const { data } = await googleRegistration();

        console.log(data.authorization_url)
        if (data) {
          console.log(data.authorization_url)
          window.location.replace(data.authorization_url);
        }
        else {
          console.log('no data')
        }
        
      } catch (error) {
          console.error('Error petition went wrong:', error);
      }
    }

  return {
    //Props
    name,
    lastName,
    email,
    dni,
    password,
    rePassword,
    showMessage,
    canReSendEmail,

    //Methods
    onNameChange,
    onGoogleRegistration,
    onLastNameChange,
    onEmailChange,
    onDniChange,
    onPasswordChange,
    onRePasswordChange,
    onResendEmail,
    submit,
  }
}
