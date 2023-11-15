


import React from 'react';
import styles from '../stylesProdDetails.module.scss';
import { Divider } from 'antd';
import { CustomButton } from '../../../components/buttons/customButton';
import { InputSimpleSelect } from '../../../components/inputs/simpleSelect/simpleSelectInput';
import { InputTextSimple } from '../../../components/inputs/simpleText/inputSimpleText';
import Filters from '../../../libs/Filters';
import { FormDataTransaction } from './Formatters';

interface Uf {
    id: number;
    sigla: string;
    nome: string;
}

interface City {
    id: number;
    nome: string;
    // Add other properties as needed
}

interface ProductDetailsContentProps {
    cities: City[];
    ufs: Uf[];
    product: {
        _id: string;
        name: string;
        description: string;
        price: number;
        auffs: number;
        imageUrls: string[];
    };
    formData: {
        name: string;
        cpf: string;
        phone: string;
        email: string;
        cep: string;
        logradouro: string;
        numero: string;
        bairro: string;
        complemento: string;
        referencia: string;
        stateSelected: number;
        citiesSelected: string | number;
    };
    getAdressByPostalCode: (cep: string) => void;
    getCitiesByUf: (ufId: string) => void;
    changeWidthInput: (value: number, defaultWidth: string) => React.CSSProperties;
    currentScreen: number;
    onOptionsUpdate: (data?: Partial<ProductDetailsContentProps['formData']>) => void;
    onProceed: (formData: FormDataTransaction) => void;
}


const ProductDetailsContent: React.FC<ProductDetailsContentProps> = ({
    ufs,
    cities,
    product,
    formData,
    changeWidthInput,
    currentScreen,
    onOptionsUpdate,
    getAdressByPostalCode,
    getCitiesByUf,
    onProceed,
}) => {


    return (
        <div className={styles.contentDetails}>
            <div className={styles.titleProduct}>
                <h1>{product?.name}</h1>
                <div>
                    <span>Preço:</span>
                    <p>{Filters.convertMoneyTextMask(product?.price)}</p>
                </div>
            </div>
            <div className={styles.contentDescription}>
                <h1>Descrição do produto</h1>
                <p>{product?.description}</p>
            </div>
            <Divider />
            <div className={styles.contentForm}>
                <h1>Formulário de Compra</h1>
                <div className={styles.boxInputs}>
                    <h3>Dados de identificação</h3>
                    <div className={styles.formLine1}>
                        <InputTextSimple
                            name="name"
                            value={formData.name}
                            placeholder="Nome completo"
                            onChange={(e) => onOptionsUpdate({ ...formData, name: e.target.value })}
                            style={changeWidthInput(currentScreen, '49%')}
                        />
                        <InputTextSimple
                            name="cpf"
                            value={Filters.inputMaskCPFCNPJ(formData.cpf)}
                            placeholder="Insira seu CPF"
                            onChange={(e) => onOptionsUpdate({ ...formData, cpf: e.target.value })}
                            style={changeWidthInput(currentScreen, '49%')}
                        />
                    </div>
                    <div className={styles.formLine2}>
                        <InputTextSimple
                            name="phoneNumber"
                            value={Filters.inputMaskTELWithDDD(formData.phone)}
                            placeholder="Insira seu telefone"
                            onChange={(e) => onOptionsUpdate({ ...formData, phone: e.target.value })}
                            style={changeWidthInput(currentScreen, '49%')}
                        />
                        <InputTextSimple
                            name="email"
                            value={formData.email}
                            placeholder="Insira seu email"
                            onChange={(e) => onOptionsUpdate({ ...formData, email: e.target.value })}
                            style={changeWidthInput(currentScreen, '49%')}
                        />
                    </div>
                </div>
                <div className={styles.boxInputs}>
                    <h3>Endereço de Entrega</h3>
                    <div className={styles.formLine1}>
                        <InputTextSimple
                            name="cep"
                            value={Filters.inputMaskCEP(formData.cep)}
                            placeholder="Insira seu CEP"
                            onChange={(e) => {
                                onOptionsUpdate({ ...formData, cep: e.target.value });
                                if (e.target.value.length === 8) {
                                    const cepString = Filters.clearStringOnlyNumbers(e.target.value).toString();
                                    getAdressByPostalCode(cepString);
                                }
                            }}
                            style={changeWidthInput(currentScreen, '32%')}
                        />
                        <InputSimpleSelect
                            optionZero="Selecione seu estado"
                            data={ufs}
                            style={changeWidthInput(currentScreen, '32%')}
                            onChange={(e) => {
                                onOptionsUpdate({ ...formData, stateSelected: Number(e.target.value) });
                                getCitiesByUf(e.target.value);
                            }}
                            value={formData.stateSelected}
                        />
                        <InputSimpleSelect
                            optionZero="Selecione sua cidade"
                            data={cities}
                            style={changeWidthInput(currentScreen, '32%')}
                            onChange={(e) => {
                                onOptionsUpdate({ ...formData, citiesSelected: e.target.value });
                            }}
                            value={formData.citiesSelected}
                        />
                    </div>
                    <div className={styles.formLine2}>
                        <InputTextSimple
                            name="logradouro"
                            value={formData.logradouro}
                            placeholder="Logradouro"
                            onChange={(e) => onOptionsUpdate({ ...formData, logradouro: e.target.value })}
                            style={changeWidthInput(currentScreen, '49%')}
                        />
                        <InputTextSimple
                            name="number"
                            value={formData.numero}
                            placeholder="Número"
                            onChange={(e) => onOptionsUpdate({ ...formData, numero: e.target.value })}
                            style={changeWidthInput(currentScreen, '14%')}
                        />
                        <InputTextSimple
                            name="bairro"
                            value={formData.bairro}
                            placeholder="Bairro"
                            onChange={(e) => onOptionsUpdate({ ...formData, bairro: e.target.value })}
                            style={changeWidthInput(currentScreen, '35%')}
                        />
                    </div>
                    <div className={styles.formLine2}>
                        <InputTextSimple
                            name="complemento"
                            value={formData.complemento}
                            placeholder="Complemento"
                            onChange={(e) => onOptionsUpdate({ ...formData, complemento: e.target.value })}
                            style={changeWidthInput(currentScreen, '49%')}
                        />
                        <InputTextSimple
                            name="referencia"
                            value={formData.referencia}
                            placeholder="Ponto de referência"
                            onChange={(e) => onOptionsUpdate({ ...formData, referencia: e.target.value })}
                            style={changeWidthInput(currentScreen, '49%')}
                        />
                    </div>
                </div>
                <div className={styles.boxInputs}>
                    <h3>Preço Final e Forma de Pagamento</h3>
                    <div className={styles.boxFinalPrice}>
                        <p>Preço Final:</p>
                        <span>R$ 138,00</span>
                        <span>Preço do produto {Filters.convertMoneyTextMask(product?.price)} + Preço da entrega: R$ 48,00</span>
                    </div>
                    <div className={styles.formLine2}>
                        <InputSimpleSelect
                            optionZero="Selecione a forma de pagamento"
                            data={[{
                                id: 1,
                                nome: 'Checkout externo (Pagarme)'
                            }]}
                            value={1}
                            disabled={true}
                            style={changeWidthInput(currentScreen, '49%')}
                        />
                        <CustomButton
                            onClick={() => onProceed(formData)}
                            style={changeWidthInput(currentScreen, '49%')}>Prosseguir para o pagamento</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsContent 