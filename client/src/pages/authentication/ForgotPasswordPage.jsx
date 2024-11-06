import React from 'react'
import { Toaster } from 'react-hot-toast'
import { CiMail } from "react-icons/ci";
import { useForgotPasswordPage } from '../../hooks/accounts/useForgotPasswordPage'
import { InputField } from '../../components/InputField'

export const ForgotPasswordPage = () => {
    
    const {
        canReSendEmail,

        submit,
        onEmailChange,

    } = useForgotPasswordPage();

  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{ "backgroundImage": "url('../src/assets/bg.jpg')" }}> 
      <Toaster/>
        <div>
            <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-30 relative'>

            <h1 className='text-4xl text-white font-bold text-center mb-6'>Password Change</h1>

                <form action="" onSubmit={ submit }>
                    <InputField text={ 'Your Email' } onChangeFunction={ onEmailChange } icon={ CiMail } isEmail={ true }/>

                    {
                        canReSendEmail === false 
                        ?
                        (
                            <button disabled={!canReSendEmail} className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-red-800 hover:bg-red-600 hover:text-white py-2 transition-colors duration-300'>Please Wait...</button>
                        )
                        :
                        (
                            <button type='submit' className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-blue-800 hover:bg-blue-600 hover:text-white py-2 transition-colors duration-300'>Send Email</button>
                        )
                    }

                </form>

            </div>

        </div>
    </div>
  )
}
