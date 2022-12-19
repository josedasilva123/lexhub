import { iLoginFormValues } from "../../pages/LoginPage/@types";
import { iRegisterFormValues } from "../../pages/RegisterPage/@types";

export interface iUserLoginResponse{
    user: iUser;
    token: string;
}

export interface iTech{
    id: string;
    title: string;
    status: string;
}

export interface iUser{
    id: string;
    name: string;
    email: string;
    course_module: string;
    contact: string;
    techs: iTech[]; 
}

export interface iUserContext{
    user: iUser | null;
    techs: iTech[];
    userRegister: (formData: iRegisterFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
    userLogin: (formData: iLoginFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
    userLogout: () => void;
}