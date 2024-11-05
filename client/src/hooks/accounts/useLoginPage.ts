import { useState } from 'react';
import toast from 'react-hot-toast';
import { login } from '../../api/accounts/login';
import { errorHandler } from '../../api/accounts/errorHandler';
import { useUserStore } from '../../stores/userStore';


export const useLoginPage = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setAccessToken = useUserStore(state => state.setAccessToken);
  const setRefreshToken = useUserStore(state => state.setRefreshToken);
  const setFirstName = useUserStore(state => state.setFirstName);
  const setLastName = useUserStore(state => state.setLastName);
  const setUserId = useUserStore(state => state.setUserId);
  const setUserEmail = useUserStore(state => state.setEmail);
  
    const onEmailChange = ( { target } ) => {
      setEmail(target.value)
    }
  
    const onPasswordChange = ( { target } ) => {
      setPassword(target.value)
    }

    const submit = async (event) => {
  
        event.preventDefault();
        const loading = toast.loading('Loading')
  
        const user = {
            email: email,
            password: password,
        }
  
        try {
          const { status, data, error } = await login(user);
            
            if (status === 200) {
              toast.dismiss(loading)
                // Mostrar notificación
                toast.success("Login Succesfull", {
                  position: "top-center",
                  duration: 3000
                })
                
                const { access, refresh, user_id, first_name, last_name, email } = data;
                setAccessToken(access);
                setRefreshToken(refresh);
                setFirstName(first_name);
                setLastName(last_name);
                setEmail(email);
                setUserId(user_id);
                setUserEmail(email);
                
                // Redirigir a la página de login después de un breve retraso
                setTimeout(() => {
                  window.location.href = 'http://localhost:5173';
                }, 1000);
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
    //Props
    email,
    password,

    //Methods
    onEmailChange,
    onPasswordChange,
    submit,
  }
}
