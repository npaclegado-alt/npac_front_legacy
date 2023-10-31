import { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { useParams } from "react-router-dom";

import { Divider } from "../../components/divider";
import { InputTextSimple } from "../../components/inputs/simpleText/inputSimpleText";
import { InputSimpleSelect } from "../../components/inputs/simpleSelect/simpleSelectInput";
import { CustomButton } from "../../components/buttons/customButton";
import { ContextApi } from "../../contexts";

import styles from './stylesProdDetails.module.scss';
import Filters from "../../libs/Filters";

export function PageProductsDetails(): JSX.Element {
    const {
        productsById,
        productFiltered
    } = useContext(ContextApi);
    const { productId }: any = useParams();
    const [nextIndex, setNextIndex] = useState(0);
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [referencia, setReferencia] = useState('');

    const imgProduct = productFiltered?.imageUrls ?? [];


    useEffect(() => {
        productsById(productId);
    }, []);
    
  return (
    <div className={styles.container}>
      <div className={styles.headerDetails}>
        <h1>
            Plano<p>NPAC</p>
        </h1>
      </div>
      <div className={styles.containerDetails}>
        <div className={styles.contentImages}>
            <img 
                className={styles.imgProduct}
                src={imgProduct[nextIndex]} 
                alt="Product" 
            />
                {imgProduct.map((img, index) => {
                    return (
                        <img
                            className={styles.imgProductMini}
                            style={index === nextIndex ? { padding: '2px' } : {}}
                            onClick={() => setNextIndex(index)}
                            src={img}
                            alt="Product"
                        />
                    )
                })}
        </div>
        <div className={styles.contentDetails}>
            <div className={styles.titleProduct}>
                <h1>{productFiltered?.name}</h1>
                <div>
                    <span>
                        Preço:
                    </span>
                    <p>{Filters.convertMoneyTextMask(productFiltered?.price)}</p>
                </div>
            </div>
            <div className={styles.contentDescription}>
                <h1>
                    Descrição do produto
                </h1>
                <p>
                    {productFiltered?.description}
                </p>
            </div>
            <Divider />
            <div className={styles.contentForm}>
                <h1>Formulário de Compra</h1>
                <div className={styles.boxInputs}>
                    <h3>Dados de identificação</h3>
                    <div className={styles.formLine1}>
                        <InputTextSimple 
                            name="name"
                            value={name}
                            placeholder="Nome completo"
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '49%' }}
                        />
                        <InputTextSimple 
                            name="cpf"
                            value={Filters.inputMaskCPFCNPJ(cpf)}
                            placeholder="insira seu CPF"
                            onChange={(e) => setCpf(e.target.value)}
                            style={{ width: '49%' }}
                        />
                    </div>
                    <div className={styles.formLine2}>
                        <InputTextSimple 
                            name="phoneNumber"
                            value={Filters.inputMaskTELWithDDD(phone)}
                            placeholder="insira seu telefone"
                            onChange={(e) => setPhone(e.target.value)}
                            style={{ width: '49%' }}
                        />
                        <InputTextSimple 
                            name="email"
                            value={email}
                            placeholder="insira seu email"
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '49%' }}
                        />
                    </div>
                </div>
                <div className={styles.boxInputs}>
                    <h3>Endereço de Entrega</h3>
                    <div className={styles.formLine1}>
                        <InputTextSimple 
                            name="cep"
                            value={Filters.inputMaskCEP(cep)}
                            placeholder="Insira seu CEP"
                            onChange={(e) => setCep(e.target.value)}
                            style={{ width: '32%' }}
                        />
                        <InputSimpleSelect 
                            data={['1', '2', '3']}
                            style={{ width: '32%' }}
                        />
                        <InputSimpleSelect 
                            data={['1', '2', '3']}
                            style={{ width: '32%' }}
                        />
                    </div>
                    <div className={styles.formLine2}>
                        <InputTextSimple 
                            name="logradouro"
                            value={logradouro}
                            placeholder="Logradouro"
                            onChange={(e) => setLogradouro(e.target.value)}
                            style={{ width: '49%' }}
                        />
                        <InputTextSimple 
                            name="number"
                            value={numero}
                            placeholder="Número"	
                            onChange={(e) => setNumero(e.target.value)}
                            style={{ width: '14%' }}
                        />
                        <InputTextSimple 
                            name="bairro"
                            value={bairro}
                            placeholder="Bairro"
                            onChange={(e) => setBairro(e.target.value)}
                            style={{ width: '35%' }}
                        />
                    </div>
                    <div className={styles.formLine2}>
                        <InputTextSimple 
                            name="complemento"
                            value={complemento}
                            placeholder="Complemento"	
                            onChange={(e) => setComplemento(e.target.value)}
                            style={{ width: '49%' }}
                        />
                        <InputTextSimple 
                            name="referencia"
                            value={referencia}
                            placeholder="Ponto de referência"	
                            onChange={(e) => setReferencia(e.target.value)}
                            style={{ width: '49%' }}
                        />
                    </div>
                </div>
                <div className={styles.boxInputs}>
                    <h3>Preço Final e Forma de Pagamento</h3>
                    <div className={styles.boxFinalPrice}>
                        <p>Preço Final:</p>
                        <span>R$ 138,00</span>
                        <span>Preço do produto {Filters.convertMoneyTextMask(productFiltered?.price)} + Preço da entrega: R$ 48,00</span>
                    </div>
                    <div className={styles.formLine2}>
                        <InputSimpleSelect 
                            data={['1', '2', '3']}
                            style={{ width: '49%' }}
                        />
                        <CustomButton
                            style={{ width: '49%' }}
                        >
                            Prosseguir Para o Pagamento
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}