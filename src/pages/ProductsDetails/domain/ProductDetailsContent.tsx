


import React, { useEffect } from 'react';
import styles from '../stylesProdDetails.module.scss';
import { Divider } from 'antd';
import { CustomButton } from '../../../components/buttons/customButton';
import { InputSimpleSelect } from '../../../components/inputs/simpleSelect/simpleSelectInput';
import { InputTextSimple } from '../../../components/inputs/simpleText/inputSimpleText';
import Filters from '../../../libs/Filters';
import { FormDataTransaction } from './Formatters';
import { JsTyping } from 'typescript';
import { shippingCostResponseProps } from '../../../contexts/interfaces';
import { Color } from '@rc-component/color-picker';

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

export interface ProductDetailsContentProps {
    cities: City[];
    ufs: Uf[];
    product: {
        [x: string]: any;
        _id: string;
        name: string;
        description: string;
        price: number;
        auff: number;
        imageUrls: string[];
        shippingValues?: {
            width: number;
            height: number;
            length: number;
            weight: number;
        }
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
        shippingSelected: number;
        metadataShipping?: any;
        stateSelected: number;
        citiesSelected: string | number;
    };
    saleIdentification: string | any;
    getAdressByPostalCode: (cep: string) => void;
    getCitiesByUf: (ufId: string) => void;
    changeWidthInput: (value: number, defaultWidth: string) => React.CSSProperties;
    currentScreen: number;
    onOptionsUpdate: (data?: Partial<ProductDetailsContentProps['formData']>) => void;
    onProceed: (formData: FormDataTransaction, startTransaction: ProductDetailsContentProps['saleIdentification']) => void;
    calcShipping: (cepString: string) => void;
    shipingCost: shippingCostResponseProps[];
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
    calcShipping,
    getCitiesByUf,
    shipingCost,
    onProceed,
    saleIdentification
}) => {

    const filterShipping = () => {
        let frete;
        frete = shipingCost.find(active => active.id === formData.shippingSelected)
        return frete;
    };

    const calculateTotalPrice = () => {
        const shippingPrice: any = filterShipping();
        if (!shippingPrice) {
            return product?.price;
        } else {
            return (Number(product?.price) + Number(shippingPrice?.price));
        }
    }

    const shippingPrice: any = filterShipping();
    useEffect(() => {
        onOptionsUpdate({ ...formData, metadataShipping: {
            id: shippingPrice?.id,
            name: shippingPrice?.name,
            price: shippingPrice?.price,
            company: shippingPrice?.company,
            shippingValues: product?.shippingValues
        } });
    }, [shippingPrice]);

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
                    <h3>Endereço de entrega</h3>
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
                                    if (!product?.freeShipping) {
                                        calcShipping(cepString);
                                    }
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
                   {!product?.freeShipping && <div className={styles.formLine2}>
                        <InputSimpleSelect
                            optionZero="Selecione a forma de entrega"
                            data={shipingCost.filter(active => !active.error).map((item) => {
                                return {
                                    id: item.id,
                                    nome: item.name + ' - ' + Filters.convertMoneyTextMask(item.price) + ' - ' + 'Prazo: ' + item.delivery_range.min + ' a ' + item.custom_delivery_range.max + ' dias úteis',
                                }
                            })}
                            optionStyle={{
                                color: '#000',
                                fontWeight: 'bold',
                            }}
                            value={formData.shippingSelected}
                            onChange={(e) => {
                                onOptionsUpdate({ 
                                    ...formData, 
                                    shippingSelected: Number(e.target.value)
                                });
                                }
                            }
                            disabled={false}
                            style={changeWidthInput(currentScreen, '100%')}
                        />
                    </div>}
                </div>
                <div className={styles.boxInputs}>
                    <div className={styles.boxFinalPrice}>
                        <p>Preço Final:</p>
                        <span>{Filters.convertMoneyTextMask(calculateTotalPrice())}</span>
                        <span>Preço do produto {Filters.convertMoneyTextMask(product?.price)} + Preço da entrega: {Filters.convertMoneyTextMask(shippingPrice?.price ?? 0)} </span>
                    </div>
                    <div className={styles.formLine2}>
                        {/*<InputSimpleSelect
                            optionZero="Selecione a forma de pagamento"
                            data={[{
                                id: 1,
                                nome: 'Checkout externo (Pagarme)'
                            }]}
                            value={1}
                            disabled={true}
                            style={changeWidthInput(currentScreen, '49%')}
                        />*/}
                        <CustomButton
                            onClick={() => onProceed(formData, saleIdentification)}
                            style={changeWidthInput(currentScreen, '49%')}>Prosseguir para o pagamento</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsContent 