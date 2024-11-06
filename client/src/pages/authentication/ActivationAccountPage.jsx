import React, { useEffect } from 'react'
import { getVerificationData } from "../../api/accounts/getVerificationData";
import { validateAccount } from "../../api/accounts/validateAccount";
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast'

export const ActivationAccountPage = () => {
  
  const navigate = useNavigate();

  const validateUser = async () => {

    const loading = toast.loading('Loading') //arreglar
    const { uid, token } = await getVerificationData()
    const { status } = await validateAccount(uid, token)
    
    if(status === 204) {
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
    validateUser();
  }, [])


  return (
    <div>
      <Toaster />
      <h1 className='text-4xl text-white font-bold text-center mb-6 my-6'>Account Validated</h1>
    </div>
  )
}
