import styles from './styles.module.scss'
import Link from 'next/link'
import {FiLogOut} from "react-icons/fi"

import {AuthContext} from '../../contexts/AuthContext'
import {useContext} from 'react'

//header function
export function Header(){

        const {signOut} = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}> 
           <div className={styles.headerContent}>
                <Link href={"/dashboard"}>
                <img src="/pizzariaFidelis.png" width={120} height={120}/>
                </Link>
                <nav className={styles.menuNav}>
                    <Link href={"/category"} passHref={true} legacyBehavior>
                    <a>Categoria</a>
                    </Link>

                    <Link href={"/product"} passHref={true} legacyBehavior>
                    <a>Cardapio</a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#fff' size={24}/>
                    </button>
                </nav>
           </div>
        </header>
    )
}