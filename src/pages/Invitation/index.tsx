import { useState, ChangeEvent } from "react"
import { InputSimpleSelect } from "../../components/inputs/simpleSelect/simpleSelectInput"
import { InputTextSimple } from "../../components/inputs/simpleText/inputSimpleText"
import { LoginLayout } from "../../components/loginLayout"
import styles from "./invitation.module.scss"
import Filters from "../../libs/Filters"
export const Invitation = () => {

  const [invationUser, setInvationUser] = useState({
    nome: '',
    cpf: '',
    tefefone: '',
    email: '',
    senha: '',
    confirmaSenha: '',
    confirmaEmail: '',
    npac: '',
  })

  const [termsServices, setTermsService] = useState(false)

  const handleChangeInvitation = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInvationUser({ ...invationUser, [e.target.id]: e.target.value })
  }

  const handleSubmitInvitation = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <LoginLayout>
      <div className={styles.pageInvitationRegistration}>
        <div className={styles.pageInvitationContainerRegistration}>
          <form onSubmit={handleSubmitInvitation}>
            <h2>Convite Comum</h2>
            <InputTextSimple name="nome" placeholder="Nome Completo" onChange={handleChangeInvitation} value={invationUser.nome.replace(/\d/g, '')} />
            <InputTextSimple name="cpf" placeholder="CPF" onChange={handleChangeInvitation} value={Filters.inputMaskCPFCNPJ(invationUser.cpf)} />
            <InputTextSimple name="tefefone" placeholder="Telefone" onChange={handleChangeInvitation} value={Filters.inputMaskTELWithDDD(invationUser.tefefone)} />
            <InputTextSimple name='email' placeholder="Confirmar Email" onChange={handleChangeInvitation} value={invationUser.email} type="email" />
            <InputTextSimple name='confirmaEmail' placeholder="Confirmar Email" onChange={handleChangeInvitation} value={invationUser.confirmaEmail} type="email" />
            <InputTextSimple name='senha' placeholder="Senha" onChange={handleChangeInvitation} value={invationUser.senha} />
            <InputTextSimple name='confirmaSenha' placeholder="Confirmar Senha" onChange={handleChangeInvitation} value={invationUser.confirmaSenha} />
            <InputSimpleSelect optionZero="Escola NPAC + Box" data={[]} id="npac" onChange={handleChangeInvitation} value={invationUser.npac} />

            <div className={styles.termsServices}>
              <InputTextSimple type="checkbox" name="termos"
                checked={termsServices} onChange={(e: ChangeEvent<HTMLInputElement>) => setTermsService(e.target.checked)} />
              <span>Li e Concordo com os Termos de Serviço.</span>
            </div>
            <button type="submit">Ir Para o Checkout</button>
          </form>
        </div>
      </div>
    </LoginLayout>
  )

}