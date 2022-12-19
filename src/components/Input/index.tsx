import React from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface iInputProps{
    label?: string;
    id: string;
    type: "text" | "email" | "password" | "number";
    placeholder?: string;
    disabled?: boolean;
    register: UseFormRegisterReturn;
    error?: FieldError;
}

const Input = ({ type, id, label, placeholder, disabled, register, error }: iInputProps) => {
  return (
    <fieldset>
        {label && <label htmlFor={id}>{label}</label>}
        <input type={type} id={id} placeholder={placeholder} {...register} disabled={disabled}/>
        {error && <p>{error.message}</p>}
    </fieldset>    
  )
}

export default Input