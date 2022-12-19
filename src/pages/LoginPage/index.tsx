import React, { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../../components/Input';
import { UserContext } from '../../contexts/UserContext';
import { iLoginFormValues } from './@types';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);  
  const { register, handleSubmit, formState: {errors}, reset } = useForm<iLoginFormValues>();  
  const { userLogin } = useContext(UserContext);

  const submit: SubmitHandler<iLoginFormValues> = async (formData) => {
    await userLogin(formData, setLoading);
    reset();
  }

  return (
    <div>
        <form noValidate onSubmit={handleSubmit(submit)}>
            <Input type="text" label='Email' id="email" placeholder='Seu e-mail' register={register("email")} disabled={loading} />
            <input type="password" placeholder='Sua senha' {...register("password")}  disabled={loading}/>
            <button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    </div>
  )
}

export default LoginPage