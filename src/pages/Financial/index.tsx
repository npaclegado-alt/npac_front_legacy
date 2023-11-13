import { Eye, PenSquare, Plus } from 'lucide-react'
import styles from './financial.module.scss'
import { Modal } from 'antd'
import { ChangeEvent, useState } from 'react'
import { InputSimpleSelect } from '../../components/inputs/simpleSelect/simpleSelectInput'
import { InputTextSimple } from '../../components/inputs/simpleText/inputSimpleText'

export const Financial = () => {

    const [openEditBankDetails, setOpenEditBankDetails] = useState(false)
    const [seeProfits, setSeeProfits] = useState(false) 
    const [seeInvestment, setSeeInvestment] = useState(false)


    return (
        <section className={styles.financialPage}>
            <div className={styles.financialBankData}>
                <h1>Meus Dados Bancários</h1>
                <button className={styles.financialBankDataButton} onClick={() => setOpenEditBankDetails(true)}><PenSquare /> <span> Meus Dados Bancários</span> </button>

                <div className={styles.financialBankDataUser}>
                    <div className={styles.financialBankDataUserItem}>
                        <h3>Nome</h3>
                        <span>Davi Carlos Rodrigues</span>
                    </div>
                    <div className={styles.financialBankDataBorder} />
                    <div className={styles.financialBankDataUserItem}>
                        <h3>CPF</h3>
                        <span>506.702.231-07</span>
                    </div>
                    <div className={styles.financialBankDataBorder} />

                    <div className={styles.financialBankDataUserItem}>
                        <h3>CPF</h3>
                        <span>Banco do Brasil (001)</span>
                    </div>
                </div>

                <div className={styles.financialBankDataAccountUser}>
                    <div className={styles.financialBankDataUserItem}>
                        <h3>Agência</h3>
                        <span>1366</span>
                    </div>
                    <div className={styles.financialBankDataBorder} />

                    <div className={styles.financialBankDataUserItem}>
                        <h3>Conta</h3>
                        <span>8103-5</span>
                    </div>
                    <div className={styles.financialBankDataBorder} />

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
            <div className={styles.financialInvestments} onClick={() => setSeeInvestment(investiment => !investiment)}>
                <h3>Investimentos</h3>
                {
                    seeInvestment ?
                        <ul onClick={() => setSeeInvestment(false)}>
                            <li>
                                <div className={styles.values}>
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.processing}>Processando</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>

                            <li>
                                <div className={styles.values} >
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.concluded}>Concluido</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>

                            <li>
                                <div className={styles.values}>
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.processing}>Processando</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>

                            <li>
                                <div className={styles.values}>
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.processing}>Processando</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>
                            <li>
                                <div className={styles.values}>
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.processing}>Processando</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>
                            <li>
                                <div className={styles.values}>
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.processing}>Processando</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>
                            <li>
                                <div className={styles.values}>
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.processing}>Processando</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>
                        </ul>

                        :
                        <div className={styles.financialSeeInvestment}>
                        <Eye color='#D2D2D2' size={34} />
                        <span>Mostrar Investimentos</span>
                    </div>


                }
            </div>
            <div className={styles.financialProfits} onClick={() => setSeeProfits(profits => !profits)}>
                <h3>Lucros</h3>

                {
                    seeProfits ?
                        <ul onClick={() => setSeeProfits(false)}>
                            <li>
                                <div className={styles.values}>
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.processing}>Processando</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>

                            <li>
                                <div className={styles.values} >
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.concluded}>Concluido</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>

                            <li>
                                <div className={styles.values}>
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.processing}>Processando</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>

                            <li>
                                <div className={styles.values}>
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.processing}>Processando</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>
                            <li>
                                <div className={styles.values}>
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.processing}>Processando</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>
                            <li>
                                <div className={styles.values}>
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.processing}>Processando</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>
                            <li>
                                <div className={styles.values}>
                                    <h6>R$ 1500,00</h6>
                                    <p>NPAC Box</p>
                                </div>

                                <div className={styles.information}>
                                    <span className={styles.processing}>Processando</span>
                                    <p>03/04/2023</p>
                                </div>
                            </li>
                        </ul>

                        :
                        <div className={styles.financialSeeProfits} >
                            <Eye color='#D2D2D2' size={34} />
                            <span>Mostrar Lucros</span>
                        </div>

                }

                <button />
            </div>

            <button hidden />

            <Modal
                open={openEditBankDetails}
                onCancel={() => setOpenEditBankDetails(false)}
                width="30rem"
                centered
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
            >

                <div className={styles.financialModalEdit}>
                    <h3>Alterar Dados Bancários</h3>

                    <form
                        onSubmit={(e: ChangeEvent<HTMLFormElement>) => e.preventDefault()}
                    >
                        <InputTextSimple name='nome' placeholder='Davi Carlos Rodrigues' />
                        <InputTextSimple name='nome' placeholder='506.702.231-07' />

                        <InputSimpleSelect data={[{
                            id: 1,
                            nome: 'Banco do Brasil (001)'
                        }]}

                            optionZero='Banco do Brasil (001)'

                        />

                        <div className={styles.financialModalEditAccount}>
                            <InputTextSimple name='nome' placeholder='1366' />
                            <InputTextSimple name='nome' placeholder='8103-5' />
                        </div>


                        <div className={styles.financialModalEditKey}>
                            <h4>Chaves Pix</h4>
                            <div className={styles.financialModalAddKeys}>
                                <InputTextSimple name='nome' placeholder='1366' />
                                <button type='button'>
                                    <Plus />
                                </button>
                            </div>

                            <button type='submit'>Salvar Alterações</button>

                        </div>

                    </form>
                </div>

            </Modal>
        </section>
    )
}