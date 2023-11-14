import styles from './agent-profile.module.scss'

export default function AgentProfile(){
  return (
    <section className={styles.AgentProfilePage}>
         <div className={styles.PersonalData}>
           <h2>Dados Pessoais</h2>  
           <button>
             
             <span>Editar Dados Pessoais</span>
           </button> 
         </div> 
         <div className={styles.StreetData}>1</div> 
         <div className={styles.ProofData}>1</div>
    </section>
  )

}