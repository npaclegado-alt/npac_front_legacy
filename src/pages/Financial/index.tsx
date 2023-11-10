import { Eye, PenSquare } from 'lucide-react'
import styles from './financial.module.scss'

export const Financial = () => {
    return (
        <section className={styles.financialPage}>
            <div className={styles.financialBankData}>
                <h1>Meus Dados Bancários</h1>   
                <button className={styles.financialBankDataButton}><PenSquare /> <span> Meus Dados Bancários</span> </button>   

                <div  className={styles.financialBankDataUser}>
                   <div className={styles.financialBankDataUserItem}>
                     <h3>Nome</h3> 
                     <span>Davi Carlos Rodrigues</span>
                    </div>     
                    <div className={styles.financialBankDataBorder}/>
                    <div className={styles.financialBankDataUserItem}>
                     <h3>CPF</h3> 
                     <span>506.702.231-07</span>
                    </div>   
                    <div className={styles.financialBankDataBorder}/>

                    <div className={styles.financialBankDataUserItem}>
                     <h3>CPF</h3> 
                     <span>Banco do Brasil (001)</span>
                    </div>    
                </div>  

                <div  className={styles.financialBankDataAccountUser}>
                   <div className={styles.financialBankDataUserItem}>
                     <h3>Agência</h3> 
                     <span>1366</span>
                    </div>    
                    <div className={styles.financialBankDataBorder}/>

                    <div className={styles.financialBankDataUserItem}>
                     <h3>Conta</h3> 
                     <span>8103-5</span>
                    </div>   
                    <div className={styles.financialBankDataBorder}/>

                    <div className={styles.financialBankDataUserItem}>
                     <h3>Chaves Pix</h3> 
                     <span>Email@email.com</span>
                    </div>    
                </div> 

                
            </div> 
            <div className={styles.financialAccountAvailable}>
                  <div className={styles.financialAccountAvailableItem}>
                   <h2>Disponível em Minha Conta</h2> 
                   <span>R$ 100.000,00</span>
                  </div> 

                  <div className={styles.financialAccountAvailableTransfer}>
                   <h3>Transferência</h3> 
                   <p>Transfira o valor disponível para sua conta do banco.</p>
                  </div> 

                  <button>Transferir</button>

            </div>
            <div className={styles.financialInvestments}>
               <h3>Investimentos</h3> 
               <div className={styles.financialSeeInvestment}>
               <Eye color='#D2D2D2' size={34}/>
                  <span>Mostrar Investimentos</span>
                </div>    
            </div> 
            <div className={styles.financialProfits}>
            <h3>Lucros</h3> 
               <div className={styles.financialSeeProfits}>
               <Eye color='#D2D2D2' size={34}/>
                  <span>Mostrar Lucros</span>
                </div>
                <button />   
            </div>
        </section>
    )
}