import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserContext } from "../../contexts/UserContext";
import { iRegisterFormValues } from "./@types";

const RegisterPage = () => {
   const [loading, setLoading] = useState(false);
   const { register, handleSubmit, formState: { errors }, reset} = useForm<iRegisterFormValues>();
   const { userRegister } = useContext(UserContext);

   const submit: SubmitHandler<iRegisterFormValues> = async (formData) => {
      await userRegister(formData, setLoading);
      reset();
   };

   return (
      <div>
         <form onSubmit={handleSubmit(submit)} noValidate>
            <input type="email" {...register("email")} disabled={loading} />
            <input type="password" {...register("password")} disabled={loading} />
            <input type="text" {...register("name")} disabled={loading} />
            <input type="text" {...register("bio")} disabled={loading} />
            <input type="text" {...register("contact")} disabled={loading} />
            <select {...register("course_module")} disabled={loading}>
               <option value="">Selecione um módulo</option>
               <option value="M1">M1</option>
               <option value="M2">M2</option>
               <option value="M3">M3</option>
            </select>
            <button type="submit" disabled={loading}>
               {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
         </form>
      </div>
   );
};

/*
"email": "johndoe@email.com",
  "password": "123456",
  "name": "John Doe",
  "bio": "Lorem ipsum dolor emet",
  "contact": "linkedin/in/johndoe",
  "course_module": "Segundo Módulo (Frontend avançado)"
 */

export default RegisterPage;
