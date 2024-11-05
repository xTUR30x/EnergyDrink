import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'
import { AiOutlineLock } from 'react-icons/ai'
import { CiMail } from "react-icons/ci";
import { useRegisterPage } from '../hooks/accounts/useRegisterPage';
import { InputField } from '../components/InputField';

export const RegisterPage = () => {

  //Esto despues se cambia por una redireccion a la pagina de verificacion de cuenta
  

  const {
    name,
    lastName,
    email,
    dni,
    password,
    rePassword,
    showMessage,
    canReSendEmail,

    onNameChange,
    onGoogleRegistration,
    onLastNameChange,
    onEmailChange,
    onDniChange,
    onPasswordChange,
    onRePasswordChange,
    onResendEmail,
    submit,

  } = useRegisterPage() 

  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{ "backgroundImage": "url('../src/assets/bg.jpg')" }}> 
        <Toaster/>
        <div>
            <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-30 relative'>

            <h1 className='text-4xl text-white font-bold text-center mb-6'>Register</h1>

                <form action="" onSubmit={ submit }>
                  
                  <InputField text={ 'First Name' } value={ name } onChangeFunction={ onNameChange } icon={ BiUser }/>
                  <InputField text={ 'Last Name' } value={ lastName } onChangeFunction={ onLastNameChange } icon={ BiUser }/>
                  <InputField text={ 'Your DNI' } value={ dni } onChangeFunction={ onDniChange } icon={ BiUser }/>
                  <InputField text={ 'Your Email' } value={ email } onChangeFunction={ onEmailChange } icon={ CiMail }/>
                  <InputField text={ 'Your Password' } value={ password } onChangeFunction={ onPasswordChange } icon={ AiOutlineLock } isPassword={ true }/>
                  <InputField text={ 'Repeat Your Password' } value={ rePassword } onChangeFunction={ onRePasswordChange } icon={ AiOutlineLock } isPassword={ true }/>

                    {
                      showMessage && (
                        canReSendEmail === true ? 
                          (
                          <div>
                            <span className='m-4'>Validation Email Sent <strong onClick={ onResendEmail } className='text-blue-400 cursor-pointer'> Resend Email</strong></span>
                          </div>
                          )
                          : 
                          (
                          <div>
                            <span className='m-4'>Please wait email <strong className='text-red-400'>Check your Mail...</strong></span>
                          </div>
                          )
                        )
                      }

                    <button type='submit' className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-blue-800 hover:bg-blue-600 hover:text-white py-2 transition-colors duration-300'>Register</button>           
                    <div>
                        <span className='m-14'>Have an Account? <Link to='/login' className='text-blue-400'>Log in</Link></span>
                    </div>

                </form>
                <button onClick={onGoogleRegistration} className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-blue-800 hover:bg-blue-600 hover:text-white py-2 transition-colors duration-300'>Google</button>    
            </div>

        </div>
    </div>
  )
}
