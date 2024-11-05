import React from 'react'
import { Link } from 'react-router-dom'
import { CiMail } from "react-icons/ci";
import { AiOutlineLock } from 'react-icons/ai'
import { InputField } from '../components/InputField';
import { useLoginPage } from '../hooks/accounts/useLoginPage';
import { Toaster } from 'react-hot-toast';


export const LoginPage = () => {

    const {
    
        //methods
        onEmailChange,
        onPasswordChange,
        submit,
    
    } = useLoginPage();

  return (
      <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{ "backgroundImage": "url('../src/assets/bg.jpg')" }}> 
      <Toaster/>
        <div>
            <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-30 relative'>

            <h1 className='text-4xl text-white font-bold text-center mb-6'>Login</h1>

                <form action="" onSubmit={ submit }>
                    <InputField text={ 'Your Email' } onChangeFunction={ onEmailChange } icon={ CiMail } isEmail={ true }/>

                    <InputField text={ 'Your Password' } onChangeFunction={ onPasswordChange} icon={ AiOutlineLock } isPassword={ true }/>


                    <div className=''>
                        <Link to={'/change-password'} className='text-blue-300'>Forgot Password?</Link>
                    </div>

                    <button type='submit' className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-blue-800 hover:bg-blue-600 hover:text-white py-2 transition-colors duration-300'>Login</button>

                    <div>
                        <span className='m-6'>Register Here <Link to='/register' className='text-blue-400'>Create an Account</Link></span>
                    </div>

                </form>

            </div>

        </div>
    </div>
  )
}
