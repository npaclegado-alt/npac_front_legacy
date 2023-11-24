import { useState, ChangeEvent, useContext } from "react"
import { InputSimpleSelect } from "../../components/inputs/simpleSelect/simpleSelectInput"
import { InputTextSimple } from "../../components/inputs/simpleText/inputSimpleText"
import { LoginLayout } from "../../components/loginLayout"
import styles from "./invitation.module.scss"
import Filters from "../../libs/Filters"
import { useParams } from "react-router-dom"
import { ContextApi } from "../../contexts"
export const Invitation = () => {

  const { getAdressByPostalCode, ufs, getCitiesByUf, cities } = useContext(ContextApi)

  const [invationUser, setInvationUser] = useState({
    nome: '',
    cpf: '',
    tefefone: '',
    email: '',
    senha: '',
    confirmaSenha: '',
    confirmaEmail: '',
    npac: '',
    postalCode: '',
    state: '',
    city: '',
  })

  const [termsServices, setTermsService] = useState(false)

  const { userId } = useParams<{ userId: string }>()

  const idInvationUser = atob(userId as string)

  console.log(idInvationUser)



  const handleChangeInvitation = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInvationUser({ ...invationUser, [e.target.id]: e.target.value })
  }

  const handleSubmitInvitation = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <LoginLayout>
      <div className={styles.pageInvitationRegistration}>
        <form onSubmit={handleSubmitInvitation}>
          <h2>Convite Comum</h2>

          <div className={styles.registerUserInvatation}>
            <div>
              <InputTextSimple name="nome" placeholder="Nome Completo" onChange={handleChangeInvitation} value={invationUser.nome.replace(/\d/g, '')} />
              <InputTextSimple name="cpf" placeholder="CPF" onChange={handleChangeInvitation} value={Filters.inputMaskCPFCNPJ(invationUser.cpf)} />
              <InputTextSimple name="tefefone" placeholder="Telefone" onChange={handleChangeInvitation} value={Filters.inputMaskTELWithDDD(invationUser.tefefone)} />
              <InputTextSimple name='email' placeholder="Confirmar Email" onChange={handleChangeInvitation} value={invationUser.email} type="email" />
              <InputTextSimple name='confirmaEmail' placeholder="Confirmar Email" onChange={handleChangeInvitation} value={invationUser.confirmaEmail} type="email" />
              <InputTextSimple name='senha' placeholder="Senha" onChange={handleChangeInvitation} value={invationUser.senha} />
              <InputTextSimple name='confirmaSenha' placeholder="Confirmar Senha" onChange={handleChangeInvitation} value={invationUser.confirmaSenha} />
              <InputSimpleSelect optionZero="Escola NPAC + Box" data={[]} id="npac" onChange={handleChangeInvitation} value={invationUser.npac} />

            </div>

            <div>
              <InputTextSimple name="postalCode" placeholder='89221-170' value={Filters.inputMaskCEP(invationUser.postalCode)} onChange={(e) => {
                handleChangeInvitation(e)
                const cepString = Filters.clearStringOnlyNumbers(e.target.value).toString();
                if (cepString.length === 8) {
                  getAdressByPostalCode(cepString)
                }
              }} />
              <InputSimpleSelect data={ufs}
                id='state'
                optionZero="Selecione seu estado"
                value={invationUser.state}
                onChange={(e) => {
                  handleChangeInvitation(e)
                  getCitiesByUf(e.target.value)
                }}
              />

              <InputSimpleSelect
                optionZero="Selecione sua cidade"
                data={cities}
                id='city'
                value={invationUser.city}
                onChange={handleChangeInvitation}
              />
            </div>

          </div>

          <div className={styles.termsServices}>
            <InputTextSimple type="checkbox" name="termos"
              checked={termsServices} onChange={(e: ChangeEvent<HTMLInputElement>) => setTermsService(e.target.checked)} />
            <span>Li e Concordo com os Termos de Serviço.</span>
          </div>
          <button type="submit">Ir Para o Checkout</button>
        </form>
      </div>
    </LoginLayout>
  )

}