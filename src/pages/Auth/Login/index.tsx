import React, { ChangeEvent, useContext, useState } from "react";
import styles from './login.module.scss'
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { ContextApi } from "../../../contexts"
import { LoginLayout } from "../../../components/loginLayout";

type userType = {
  email: string;
  password: string
}


function Login(): JSX.Element {


  const { loginRequest } = useContext(ContextApi)

  const [lookPassword, setLookPassword] = useState(false)
  const [user, setUser] = useState<userType>({
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setUser({ ...user, [e.target.name]: e.target.value })

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginRequest(user.email, user.password)
  }

  return (
    <LoginLayout>
      <div className={styles.pageLoginRegistrationForm}>
      <form onSubmit={handleSubmit}>
        <h2>Faça seu login abaixo</h2>
        <div className={styles.pageLoginRegistrationFormInput}>
          <User className={styles.pageLoginRegistrationInputIcon} size={20} color="#AEAEAE" />
          <input type="text" placeholder="Usuário ou Email" onChange={handleChange} value={user.email} name="email" />
        </div>
        <div className={styles.pageLoginRegistrationFormInput}>
          <Lock className={styles.pageLoginRegistrationInputIcon} size={20} color="#AEAEAE" />
          <input type={lookPassword ? 'text' : 'password'} placeholder="Sua senha" onChange={handleChange} value={user.password} name="password" />

          <button type="button"
            onClick={() => setLookPassword(look => !look)}
          >
            {
              lookPassword ? <EyeOff size={20} color="#AEAEAE" /> : <Eye size={20} color="#AEAEAE" />
            }
          </button>
        </div>
        <button type="submit">Fazer Login</button>
        <p>Sou novo por aqui. <span>Encontrar parceiro para me auxiliar!</span></p>
      </form>
      </div>
     
    </LoginLayout>
  );
}

export default Login;
