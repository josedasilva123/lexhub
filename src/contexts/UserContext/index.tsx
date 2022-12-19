/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { iLoginFormValues } from "../../pages/LoginPage/@types";
import { iRegisterFormValues } from "../../pages/RegisterPage/@types";
import { iDefaultProviderProps } from "../@types";
import { iUserContext, iUser, iTech, iUserLoginResponse } from "./@types";

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iDefaultProviderProps) => {
   const [user, setUser] = useState<iUser | null>(null);
   const [techs, setTechs] = useState<iTech[]>([]);

   const navigate = useNavigate();
   /* Authorization: Bearer {token} */

   useEffect(() => {
      const token = localStorage.getItem("@TOKEN");
      if (token) {
         (async () => {
            try {
               const response = await api.get<iUser>("/profile", {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               });
               setUser(response.data);
               setTechs(response.data.techs);
               navigate("/dashboard");
            } catch (error) {
               localStorage.removeItem("@TOKEN");
               console.log("error");
            }
         })();
      }
   }, []);

   const userRegister = async (formData: iRegisterFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      try {
         setLoading(true);
         await api.post<iUser>("/users", formData);
         console.log("Cadastro realizado com sucesso");
         navigate("/");
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const userLogin = async (formData: iLoginFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      try {
         setLoading(true);
         const response = await api.post<iUserLoginResponse>("/sessions", formData);
         setUser(response.data.user);
         setTechs(response.data.user.techs);
         localStorage.setItem("@TOKEN", response.data.token);
         navigate("/dashboard");
         console.log("Login realizado com sucesso!");
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const userLogout = () => {
      setUser(null);
      setTechs([]);
      localStorage.removeItem("@TOKEN");
      navigate("/");
   }
   
   return <UserContext.Provider value={{ user, techs, userRegister, userLogin, userLogout }}>{children}</UserContext.Provider>;
};
