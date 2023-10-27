import React from "react"; 
import  './styles/login.scss'


function Login():  JSX.Element  {
  return (
   <section className={"page-login"}>
       <nav className="page-login-navegation">
          <div className="page-login-navegation-logo">
            <h4>Plano<span>NPAC</span></h4>
          </div> 

          <ul className="page-login-navegation-list-menu">
            <li>O que é</li> 
            <li>Que plano</li>
            <li>Quem somos</li>           
          </ul>
       </nav> 

       <div className="page-login-registration-form">
         <form>
             <h2>Faça seu login abaixo</h2>
            <div className="page-login-registration-form-input">
               <input type="text" placeholder="Usuário ou Email" />
            </div> 
            <div className="page-login-registration-form-input">
               <input type="password" placeholder="Sua senha"/>
            </div> 
            <button type="submit">Fazer Login</button> 

            <p>Sou novo por aqui. <span>Encontrar parceiro para me auxiliar!</span></p>
         </form>
       </div>
   </section>
  );
}

export default Login;
