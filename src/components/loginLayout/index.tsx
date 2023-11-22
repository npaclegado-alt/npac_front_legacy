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
                        <Link to="#">O que é</Link>
                    </li>
                    <li>
                        <Link to="#">Que plano</Link>
                    </li>
                    <li>
                        <Link to="#">
                            Quem somos
                        </Link>
                    </li>
                </ul>
            </nav>
            {children}
        </section>
    )

}