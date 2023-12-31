import {createContext, ReactNode, useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {api} from '../services/apiClient'

import {destroyCookie, setCookie, parseCookies} from 'nookies'
import Router from 'next/router'

type AuthContextData ={
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credential: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credential: SignUpProps) =>  Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignUpProps ={
    name: string,
    email: string,
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@pizzaFidelis.token')
        Router.push('/')
    }catch{
        toast.error('Erro ao deslogar')
        console.log('erro ao deslogar')
    }
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser]= useState<UserProps>()
    const isAuthenticated = !!user;

        useEffect(()=>{
           //pegar algo no cookie 
           const {'@pizzaFidelis.token': token} = parseCookies();
           if(token){
            api.get('/me').then(response =>{
                const {id, name, email} = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(() =>{
                //Se deu erro deslogamos o user
                signOut();
            })
           }
        })

    async function signIn({email, password}: SignInProps){
        try{
     const response = await api.post('/session', {email, password})

     const {id, name, token} = response.data
   
            setCookie(undefined, '@pizzaFidelis.token',token, {
                maxAge: 60 * 60 * 24 *30,  // expira em 1 mês
                path: "/" //Quais caminhos terão acesso ao cookie
            })

            setUser({
                id,
                name,
                email,
            })

            //passar para as proximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

             toast.success("Logado com sucesso.")

            //Redirecionar para /dashboard
            Router.push('/dashboard')



        }catch(err){
            toast.error("Erro ao acessar.")
            console.log("Erro ao acessar", err)
        }
    }

    async function signUp({name, email, password}: SignUpProps){
        try{
            const response = await api.post('/users', {name, email, password})
            toast.success("Sua conta foi criada!")
            Router.push('/')



        }catch(err){
            toast.error("Erro ao cadastrar ")
            console.log("Erro ao cadastrar ", err)
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp  }}>
                    {children}
                </AuthContext.Provider>
    )
}