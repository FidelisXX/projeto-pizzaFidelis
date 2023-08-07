import {GetServerSideProps, GetStaticPathsContext, GetServerSidePropsResult, GetServerSidePropsContext} from 'next'
import {parseCookies, destroyCookie} from 'nookies'
import {AuthTokenError} from '../services/errors/AuthTokenError'
//func para paginas só user logados podem ter acesso.

export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies =parseCookies(ctx);
         
        const token = cookies['@pizzaFidelis.token'];

        if(!token){
            return{
                 redirect: {
                     destination: '/',
                     permanent: false
                 }
            }
        }
        try{
            return await fn(ctx);
        } catch(err){
           if( err instanceof AuthTokenError){
                destroyCookie(ctx, '@pizzaFidelis.token')

                return{
                    redirect: {
                         destination: '/',
                         permanent: false
                      }
                }
           }
    }
 }
}