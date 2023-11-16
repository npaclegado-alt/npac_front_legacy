import styles from './agent-profile.module.scss'
import { Download, PenSquare } from 'lucide-react' 
import agent from '../../assets/imgs/download.jpg'
import { useState } from 'react'
import { Modal } from 'antd'

export default function AgentProfile() { 
   
  const [modalAgentEdit, setModalAgentEdit] = useState(true)


  return (
    <section className={styles.AgentProfilePage}>
      <div className={styles.PersonalData}>
        <h2>Dados Pessoais</h2>
        <button onClick={() => setModalAgentEdit(true)}>
          <PenSquare size={20}/>
          <span>Editar Dados Pessoais</span>
        </button>

        <div className={styles.PersonalDataImg}>
          <img src={agent} alt={agent}/>
        </div>
       
        <div className={styles.PersonalDataNameData}>
            <div className={styles.PersonalDataNameDataItem}>
              <h3>Nome Completo</h3>
              <span>Davi Carlos Rodrigues</span>
            </div>  

            <div className={styles.PersonalDataBorder}/>
             
            <div className={styles.PersonalDataNameDataItem}>
              <h3>Data de Nascimento</h3>
              <span>20/02/1990</span>
            </div>
          </div> 

          <div className={styles.PersonalDataPhoneEmail}>
            <div className={styles.PersonalDataPhoneEmailItem}>
              <h3>Telefone</h3>
              <span>(00) 9999-9999</span>
            </div>  

            <div className={styles.PersonalDataBorder}/>
             
            <div className={styles.PersonalDataPhoneEmailItem}>
              <h3>Email</h3>
              <span>Email@email.com.br</span>
            </div>
          </div>
 
          

      </div>
      <div className={styles.StreetData}>
      <div className={styles.StreetDataZipState}>
            <div className={styles.StreetDataZipStateItem}>
              <h3>CEP</h3>
              <span>89221-170</span>
            </div>  

            <div className={styles.PersonalDataBorder}/>
             
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

            <div className={styles.PersonalDataBorder}/>
             
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

        <button className={styles.buttonChat}/>

      </div>

      <Modal 
       centered
       open={modalAgentEdit} 
       width={'50rem'} 
       style={{top: -100}}
      >



      </Modal>
    </section>
  )

}