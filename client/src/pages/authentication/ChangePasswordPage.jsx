import React from 'react'
import { AiOutlineLock } from 'react-icons/ai'
import { InputField } from '../../components/InputField';
import { Toaster } from 'react-hot-toast';
import { useChangePassword } from '../../hooks/accounts/useChangePasswordPage';



export const ChangePasswrodPage = () => {

    const {
        newPassword,
        reNewPassword,

        onNewPasswordChange,
        onReNewPasswordChange,
        submit,

    } = useChangePassword();


  return (
      <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{ "backgroundImage": "url('../src/assets/bg.jpg')" }}> 
      <Toaster/>
        <div>
            <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-30 relative'>

            <h1 className='text-4xl text-white font-bold text-center mb-6'>Dont Worry </h1>

                <form action="" onSubmit={ submit }>
                    <InputField text={ 'Your New Passord' } onChangeFunction={ onNewPasswordChange } icon={ AiOutlineLock } isPassword={ true }/>

                    <InputField text={ 'Repeat Password' } onChangeFunction={ onReNewPasswordChange } icon={ AiOutlineLock } isPassword={ true }/>

                    <button type='submit' className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-blue-800 hover:bg-blue-600 hover:text-white py-2 transition-colors duration-300'>Change Password</button>

                </form>

            </div>

        </div>
    </div>
  )
}
