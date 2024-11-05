import React from 'react'

export const InputField = ({ text, value, onChangeFunction, icon: Icon, isPassword=false, isEmail=false }) => {
  let type = 'text';
  if(isPassword) type = 'password';
  if(isEmail) type = 'email';

  return (
    <div className='relative my-6'>
        <input value={ value } onChange={ onChangeFunction } type={ type }  className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' placeholder=""/>
        <label htmlFor="" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>{ text }</label>
       { Icon && <Icon className='absolute top-0 right-0'/> }
    </div>
  )
}
