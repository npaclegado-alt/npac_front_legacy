import { useContext, ChangeEvent, useEffect } from 'react'
import styles from './agent-profile.module.scss'
import { Download, Eye, EyeOff, PenSquare, Upload } from 'lucide-react'
import agent from '../../assets/imgs/download.jpg'
import { useState } from 'react'
import { Modal } from 'antd'
import { InputTextSimple } from '../../components/inputs/simpleText/inputSimpleText'
import { InputSimpleSelect } from '../../components/inputs/simpleSelect/simpleSelectInput'
import { ContextApi } from '../../contexts'
import Filters from "../../libs/Filters";
import { User } from '../../types/user'


export default function AgentProfile() {

  const { user, profileEditAgent, editAgentProfile, setEditAgentProfile } = useContext(ContextApi)

  const [userData, setUserData] = useState<User>({
    name: '',
    cpf: '',
    password: '',
    phone: '',
    email: '',
    role: '',
    postalCode: '',
    rua: '',
    complemento: '',
    numero: '',
    referencia: '',
    estado: '',
    cidade: '',
    bairro: '',
    dataNascimento: '',
  })

  const [seePasswordAgent, setSeePasswordAgent] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserData({ ...userData, [e.target.id]: e.target.value })
  }


  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()      
    await profileEditAgent(userData._id as string,  userData)
  }
  

  
  
  useEffect(() => setUserData(user as User), [user])
  





  return (
    <section className={styles.AgentProfilePage}>
      <div className={styles.PersonalData}>
        <h2>Dados Pessoais</h2>
        <button onClick={() => setEditAgentProfile(true)}>
          <PenSquare size={20} />
          <span>Editar Dados Pessoais</span>
        </button>

        <div className={styles.PersonalDataImg}>
          <img src={userData?.avatar} alt={agent} />
        </div>

        <div className={styles.PersonalDataNameData}>
          <div className={styles.PersonalDataNameDataItem}>
            <h3>Nome Completo</h3>
            <span>{userData?.name}</span>
          </div>

          <div className={styles.PersonalDataBorder} />

          <div className={styles.PersonalDataNameDataItem}>
            <h3>Data de Nascimento</h3>
            <span>20/02/1990</span>
          </div>
        </div>

        <div className={styles.PersonalDataPhoneEmail}>
          <div className={styles.PersonalDataPhoneEmailItem}>
            <h3>Telefone</h3>
            <span>{user?.phone}</span>
          </div>

          <div className={styles.PersonalDataBorder} />

          <div className={styles.PersonalDataPhoneEmailItem}>
            <h3>Email</h3>
            <span>{user?.email}</span>
          </div>
        </div>



      </div>
      <div className={styles.StreetData}>
        <div className={styles.StreetDataZipState}>
          <div className={styles.StreetDataZipStateItem}>
            <h3>CEP</h3>
            <span>89221-170</span>
          </div>

          <div className={styles.PersonalDataBorder} />

          <div className={styles.StreetDataZipStateItem}>
            <h3>Estado</h3>
            <span>Santa Catarina</span>
          </div>
        </div>

        <div className={styles.StreetDataCityAddress}>
          <div className={styles.StreetDataCityAddressItem}>
            <h3>Cidade</h3>
            <span>Joinville</span>
          </div>

          <div className={styles.PersonalDataBorder} />

          <div className={styles.StreetDataCityAddressItem}>
            <h3>Endereço</h3>
            <span>Saguaçu, Rua Guaramirim, 200</span>
          </div>
        </div>
      </div>
      <div className={styles.ProofData}>
        <div className={styles.ProofDataItem}>
          <h3>Comprovante de Identidade</h3>
          <button>
            <span>Baixar Comprovante de Identidade</span>
            <Download />
          </button>
        </div>
        <div className={styles.ProofDataItem}>
          <h3>Comprovante de Endereço</h3>
          <button>
            <span>Baixar Comprovante de Endereço</span>
            <Download />
          </button>
        </div>

        <button className={styles.buttonChat} />

      </div>

      <Modal
        centered
        open={editAgentProfile}
        width={'75rem'}
        cancelButtonProps={{
          style: {
            display: 'none'
          }
        }}

        okButtonProps={{
          style: {
            display: 'none'
          }
        }}
        closeIcon={false}
        onCancel={() => setEditAgentProfile(false)}
      >

        <form className={styles.modalFormEditAgent} onSubmit={handleSubmit}>
          <h2>Alterar Dados Pessoais</h2>

          <div className={styles.modalFormEditData}>
            <div className={styles.modalFormEditIdentification}>
              <h3>Dados de Identificação</h3>
              <InputTextSimple name="name" placeholder='Davi Carlos Rodrigues' value={userData.name} onChange={handleChange} />
              <InputTextSimple name="dataNascimento" placeholder='20/02/1990' value={userData.dataNascimento} onChange={handleChange} />
              <InputTextSimple name="phone" placeholder='(00) 9999-9999' value={Filters.inputMaskTELWithDDD(userData.phone)} onChange={handleChange} />
              <InputTextSimple name="email" placeholder='Email@email.com.br' value={userData.email} onChange={handleChange} />

              <div className={styles.modalFormEditSeePassword}>
                <InputTextSimple type={seePasswordAgent ? 'text' : 'password'} name="password" value={userData.password} onChange={handleChange} />
                <button onClick={() => setSeePasswordAgent(look => !look)} type='button'>
                  {
                    seePasswordAgent ? <EyeOff size={25} color="#AEAEAE" /> : <Eye size={25} color="#AEAEAE" />
                  }
                </button>
              </div>

              <button type='button'>
                <span>Adicionar Comprovante de Identidade</span>
                <Upload />
              </button>
            </div>


            <div className={styles.modalFormEditBorder} />




            <div className={styles.modalFormEditAddress}>
              <h3>Dados de Endereço</h3>
              <div className={styles.modalFormEditGroupAddress}>
                <InputTextSimple name="postalCode" placeholder='89221-170' value={Filters.inputMaskCEP(userData.postalCode)} onChange={handleChange} />
                <InputSimpleSelect data={[{
                  id: 1,
                  nome: 'Santa Catarina'
                }]}
                  optionZero='Santa Catarina'
                  id='estado'
                  value={userData.estado}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.modalFormEditGroupAddress}>
                <InputSimpleSelect data={[{
                  id: 1,
                  nome: 'Joinville'
                }]}
                  optionZero='Joinville'
                  id='cidade'
                  value={userData.cidade}
                  onChange={handleChange}
                />
                <InputTextSimple placeholder='Saguaçu'
                  name='bairro'
                  value={userData.bairro?.replace(/\d/g, '')}
                  onChange={handleChange} />
              </div>

              <InputTextSimple name="rua"
                placeholder='Rua Guaramirim'
                value={Filters.clearStringOnlyNumbers(userData.rua)}
                onChange={handleChange}
              />

              <div className={styles.modalFormEditGroupOneAddress}>
                <InputTextSimple
                  name="numero"
                  placeholder='200'
                  value={Filters.clearStringOnlyNumbers(userData.numero)}
                  onChange={handleChange}


                />
                <InputTextSimple
                  name="complemento"
                  placeholder='Complemento'
                  value={userData.complemento?.replace(/\d/g, '')}
                  onChange={handleChange}
                />
              </div>

              <InputTextSimple name="referencia"
                placeholder='Ponto de referência'
                value={userData.referencia?.replace(/\d/g, '')}
                onChange={handleChange} />

              <button type='button'>
                <span>Adicionar Comprovante de Endereço</span>
                <Upload />
              </button>
            </div>
          </div>
          <button type='submit'>Salvar Alterações de Dados Pessoais</button>

        </form>
      </Modal>
    </section>
  )

}