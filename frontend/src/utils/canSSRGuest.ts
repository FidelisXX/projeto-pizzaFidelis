import {GetServerSideProps, GetStaticPathsContext, GetServerSidePropsResult, GetServerSidePropsContext} from 'next'
import {parseCookies} from 'nookies'

//func para paginas que só serão acessadas por visitantes

export function canSSRGuest<P>(fn:GetServerSideProps<P>){
    return async(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{

        const cookies =parseCookies(ctx);
        //Se alguém tentar acessar a pagina tendo já um login, será redirecionado.
        if(cookies['@pizzaFidelis.token']){
            return {
                redirect: {
                 destination: "/dashboard",
                 permanent: false,
                  }
            }
        }

        return await fn(ctx);

    }
}