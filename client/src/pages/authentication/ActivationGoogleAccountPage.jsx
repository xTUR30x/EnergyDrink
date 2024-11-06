import React, { useEffect } from 'react'
import { googleAuthentication } from '../../api/accounts/googleAuthentication';
import { useLocation, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast'
import queryString from 'query-string';

export const ActivationGoogleAccountPage = () => {
  
  const navigate = useNavigate();
  let location = useLocation();

  const validateUser = async (state, code) => {

    const loading = toast.loading('Loading') //arreglar
    const { data } = await googleAuthentication(state, code)
    
    if(data.status === 204) {
        toast.dismiss(loading)
        // Mostrar notificación
        toast.success("Account Validated, Redirecting to Login", {
          position: "top-center",
          duration: 3000
        })
        
        // Redirigir a la página de login después de un breve retraso
        setTimeout(() => {
          navigate('/login');
        }, 3000);
    }

  }

  useEffect(() => {

    const values = queryString.parse(location.search);
    const state = values.state ? values.state : null;
    const code = values.code ? values.code : null;
    //console.log(state, code)
    validateUser(state, code)

  }, [location])


  return (
    <div>
      <Toaster />
      <h1 className='text-4xl text-white font-bold text-center mb-6 my-6'>Account Validated</h1>
    </div>
  )
}
