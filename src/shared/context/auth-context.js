import { createContext } from "react";


export const  authCotext = createContext({isLoggedIn :false , login:()=>{} ,logout :()=>{} })