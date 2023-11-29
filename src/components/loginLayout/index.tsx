import { ReactNode } from "react"
import styles from './login-layout.module.scss'
import { Link } from "react-router-dom"

type loginLayoutProps = {
    children: ReactNode
}

export const LoginLayout = ({ children }: loginLayoutProps) => {

    return (
        <section className={styles.pageLogin}>
            <nav className={styles.pageLoginNavegation}>
                <div className={styles.pageLoginNavegationLogo}>
                    <h4>Plano<span>NPAC</span></h4>
                </div>

                <ul className={styles.pageLoginNavegationListMenu}>
                    <li>
                        <Link to="https://leonardomarcondes.com.br/plano-npac/" target="_blank">O que é</Link>
                    </li>
                    <li>
                        <Link to="https://leonardomarcondes.com.br/plano-npac/" target="_blank">Que plano</Link>
                    </li>
                    <li>
                        <Link to="https://leonardomarcondes.com.br/plano-npac/" target="_blank">
                            Quem somos
                        </Link>
                    </li>
                </ul>
            </nav>
            {children}
        </section>
    )

}