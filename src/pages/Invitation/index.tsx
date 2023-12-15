import { useState, ChangeEvent, useContext, useEffect } from "react";
import { InputSimpleSelect } from "../../components/inputs/simpleSelect/simpleSelectInput";
import { InputTextSimple } from "../../components/inputs/simpleText/inputSimpleText";
import { LoginLayout } from "../../components/loginLayout";
import styles from "./invitation.module.scss";
import Filters from "../../libs/Filters";
import { useParams } from "react-router-dom";
import { ContextApi } from "../../contexts";
import { toast } from "react-toastify";
import { is } from "@babel/types";
import { metadataShipping } from "../ProductsDetails/domain/Formatters";
import TermosPdf from "../../assets/docs/Termos e Condicoes NPAC.pdf";


export const Invitation = () => {
  const {
    getAdressByPostalCode,
    ufs,
    getCitiesByUf,
    cities,
    getAllProducts,
    products,
    startTransaction,
    productsById,
    adress,
    getShippingCost,
    shippingCostResponse
  } = useContext(ContextApi);

  const [invationUser, setInvationUser] = useState({
    nome: "",
    cpf: "",
    tefefone: "",
    email: "",
    senha: "",
    confirmaSenha: "",
    confirmaEmail: "",
    code: "",
    postalCode: "",
    state: "",
    city: "",
    bairro: "",
    numero: "",
    logradouro: "",
    referencia: "",
    complement: "",
    freeShipping: false,
    shippingSelected: 0
  });

  const [termsServices, setTermsService] = useState(false);
  const [verifyFreeShipping, setVerifyFreeShipping] = useState(false);

  const { userId } = useParams<{ userId: string }>();

  const idInvationUser = atob(userId as string);

  const currentScreen = window.innerWidth;

  const changeWidthInput = (value: number, defaultWidth: string) => {
    const widthMap = {
      "49%": value < 1024 && value > 557,
      "99%": value <= 557,
      [defaultWidth]: true,
    };

    const width =
      Object.keys(widthMap).find((key) => widthMap[key]) || defaultWidth;

    return {
      width,
      marginBottom: "10px",
    };
  };

  const setStatesAndCitiesByAdress = () => {
    const state = ufs?.find((item) => item.sigla === adress?.uf);
    const city = cities?.find((item) => item.nome === adress?.localidade);
    setInvationUser((prevData) => ({
      ...prevData,
      state: String(state?.id) || "",
      city: String(city?.id) || "",
      bairro: adress?.bairro || "",
      logradouro: adress?.logradouro || "",
    }));
  };
  useEffect(() => {
    if (adress?.uf) {
      setStatesAndCitiesByAdress();
    }
  }, [adress, cities]);

  const handleChangeInvitation = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInvationUser({ ...invationUser, [e.target.id]: e.target.value });
  };
  
  let metadataShipping: metadataShipping;
  const handleSubmitInvitation = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (invationUser.email !== invationUser.confirmaEmail) {
      toast.error("Os e-mails não coincidem");
      return;
    }

    if (invationUser.senha !== invationUser.confirmaSenha) {
      toast.error("As senhas não coincidem");
      return;
    }

    const salesIdentify = {
      userId: idInvationUser,
      productId: invationUser.code,
    };

    const criptoIdentify = btoa(JSON.stringify(salesIdentify));

    if (invationUser?.shippingSelected !== 0) {
      const shipping: any = shippingCostResponse?.find((item) => item.id === Number(invationUser?.shippingSelected));
      metadataShipping = {
        id: shipping?.id,
        name: shipping?.name,
        price: shipping?.price,
        company: {
          id: shipping?.company?.id,
          name: shipping?.company?.name,
          picture: shipping?.company?.picture,
        },
        shippingValues: {
          width: shipping?.shippingValues?.width,
          height: shipping?.shippingValues?.height,
          length: shipping?.shippingValues?.length,
          weight: shipping?.shippingValues?.weight,
        }
      }
    }

    startTransaction(
      {
        numero: invationUser.numero,
        logradouro: invationUser.logradouro,
        cep: invationUser.postalCode,
        name: invationUser.nome,
        email: invationUser.email,
        phone: invationUser.tefefone,
        cpf: invationUser.cpf,
        password: invationUser.senha,
        metadataShipping,
      },
      criptoIdentify
    );
  };
  
  const isFreeShipping = () => {
    const product = products?.find((item) => item._id === invationUser.code);
    if (product) {
      return setVerifyFreeShipping(product.freeShipping);
    }
    return setVerifyFreeShipping(false);
  }

  const calcShippingCost = (cepString: string) => {
    const product = products?.find((item) => item._id === invationUser.code);
    if (cepString.length >= 8) {
      getShippingCost({
        sCepOrigem: '88338140',
        sCepDestino: cepString,
        products: [
          {
            id: product?._id,
            width: product?.shippingValues?.width,
            height: product?.shippingValues?.height,
            length: product?.shippingValues?.length,
            weight: product?.shippingValues?.weight,
            insurance_value: Number(product?.price),
            quantity: 1
          }
        ]
      });
    }
  }

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isFreeShipping();
  }, [invationUser.code]);

  return (
    <LoginLayout>
      <div className={styles.pageInvitationRegistration}>
        <form onSubmit={handleSubmitInvitation}>
          <h2>Convite Comum</h2>

          <div className={styles.registerUserInvatation}>
            <h3>Dados de identificação</h3>

            <div className={styles.registerUserInvatationGroup}>
              <InputTextSimple
                name="nome"
                placeholder="Nome Completo"
                onChange={handleChangeInvitation}
                value={invationUser.nome.replace(/\d/g, "")}
                style={changeWidthInput(currentScreen, "32.3%")}
              />
              <InputTextSimple
                name="cpf"
                placeholder="CPF"
                onChange={handleChangeInvitation}
                value={Filters.inputMaskCPFCNPJ(invationUser.cpf)}
                style={changeWidthInput(currentScreen, "32.3%")}
              />

              <InputTextSimple
                name="tefefone"
                placeholder="Telefone"
                onChange={handleChangeInvitation}
                value={Filters.inputMaskTELWithDDD(invationUser.tefefone)}
                style={changeWidthInput(currentScreen, "32.3%")}
              />
            </div>

            <div className={styles.registerUserInvatationGroup}>
              <InputTextSimple
                name="email"
                placeholder="Email"
                onChange={handleChangeInvitation}
                value={invationUser.email}
                type="email"
                style={changeWidthInput(currentScreen, "49.2%")}
              />

              <InputTextSimple
                name="confirmaEmail"
                placeholder="Confirmar Email"
                onChange={handleChangeInvitation}
                value={invationUser.confirmaEmail}
                type="email"
                style={changeWidthInput(currentScreen, "49.2%")}
              />
            </div>

            <div className={styles.registerUserInvatationGroup}>
              <InputTextSimple
                name="senha"
                placeholder="Senha"
                onChange={handleChangeInvitation}
                value={invationUser.senha}
                style={changeWidthInput(currentScreen, "49.2%")}
              />
              <InputTextSimple
                name="confirmaSenha"
                placeholder="Confirmar Senha"
                onChange={handleChangeInvitation}
                value={invationUser.confirmaSenha}
                style={changeWidthInput(currentScreen, "49.2%")}
              />
            </div>

            <InputSimpleSelect
              optionZero="Selecione um produto"
              data={products
                ?.filter((item) => item.createUser )
                ?.map((product) => {
                  return {
                    nome: product.name,
                    id: product._id,
                  };
                })}
              id="code"
              onChange={(e) => {
                handleChangeInvitation(e);
                productsById(e.target.value);
              }}
              value={invationUser.code}
              style={changeWidthInput(currentScreen, "100%")}
            />

            <h3>Endereço de Entrega</h3>
            {(!invationUser.code || invationUser.code === "0") && <span>* Selecione o produto antes de preencher o endereço</span>}

            <div className={styles.registerUserInvatationGroup}>
              <InputTextSimple        
                name="postalCode"
                disabled={(!invationUser.code || invationUser.code === "0")}
                placeholder="Insira seu CEP"
                value={Filters.inputMaskCEP(invationUser.postalCode)}
                onChange={(e) => {
                  handleChangeInvitation(e);
                  const cepString = Filters.clearStringOnlyNumbers(
                    e.target.value
                  ).toString();
                  if (cepString.length === 8) {
                    getAdressByPostalCode(cepString);
                    setTimeout(() => {
                      calcShippingCost(cepString);                      
                    }, 500);
                  }
                }}
                style={changeWidthInput(currentScreen, "32.3%")}
              />
              <InputSimpleSelect
                data={ufs}
                disabled={(!invationUser.code || invationUser.code === "0")}
                id="state"
                optionZero="Selecione seu estado"
                value={invationUser.state}
                onChange={(e) => {
                  handleChangeInvitation(e);
                  getCitiesByUf(e.target.value);
                }}
                style={changeWidthInput(currentScreen, "32.3%")}
              />

              <InputSimpleSelect
                optionZero="Selecione sua cidade"
                disabled={(!invationUser.code || invationUser.code === "0")}
                data={cities}
                id="city"
                value={invationUser.city}
                onChange={handleChangeInvitation}
                style={changeWidthInput(currentScreen, "32.3%")}
              />
            </div>

            <div className={styles.registerUserInvatationGroup}>
              <InputTextSimple
                name="logradouro"
                disabled={(!invationUser.code || invationUser.code === "0")}
                value={invationUser.logradouro}
                placeholder="Logradouro"
                onChange={handleChangeInvitation}
                style={changeWidthInput(currentScreen, "46%")}
              />

              <InputTextSimple
                placeholder="Bairro"
                disabled={(!invationUser.code || invationUser.code === "0")}
                name="bairro"
                value={invationUser.bairro?.replace(/\d/g, "")}
                onChange={handleChangeInvitation}
                style={changeWidthInput(currentScreen, "21%")}
              />

              <InputTextSimple
                name="numero"
                disabled={(!invationUser.code || invationUser.code === "0")}
                placeholder="00"
                value={Filters.clearStringOnlyNumbers(invationUser.numero)}
                onChange={handleChangeInvitation}
                style={changeWidthInput(currentScreen, "30%")}
              />
            </div>

            <div className={styles.registerUserInvatationGroup}>
              <InputTextSimple
                name="complement"
                disabled={(!invationUser.code || invationUser.code === "0")}
                placeholder="Complemento"
                value={invationUser.complement?.replace(/\d/g, "")}
                onChange={handleChangeInvitation}
                style={changeWidthInput(currentScreen, "49.2%")}
              />

              <InputTextSimple
                name="referencia"
                disabled={(!invationUser.code || invationUser.code === "0")}
                placeholder="Ponto de referência"
                value={invationUser.referencia?.replace(/\d/g, "")}
                onChange={handleChangeInvitation}
                style={changeWidthInput(currentScreen, "49.2%")}
              />
            </div>

            {!verifyFreeShipping && 
            <InputSimpleSelect
              optionZero="Selecione a forma de envio"
              disabled={(!invationUser.code || invationUser.code === "0")}
              data={shippingCostResponse
                ?.map((shipping) => {
                  return {
                    id: shipping.id,
                    nome: shipping?.name + ' - ' + Filters.convertMoneyTextMask(shipping?.price) + ' - ' + 'Prazo: ' + shipping?.delivery_range?.min + ' a ' + shipping?.custom_delivery_range?.max + ' dias úteis',
                  };
                })}
              id="shippingSelected"
              onChange={(e) => {
                handleChangeInvitation(e);
              }}
              value={invationUser.shippingSelected}
              style={changeWidthInput(currentScreen, "100%")}
            />}

            <div className={styles.termsServices}>
              <InputTextSimple
                type="checkbox"
                name="termos"
                checked={termsServices}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTermsService(e.target.checked)
                }
              />
              <a href={TermosPdf} target="_blank"><span>Li e Concordo com os Termos de Serviço.</span></a>
            </div>

            <button disabled={!termsServices} type="submit">Ir Para o Checkout</button>
          </div>
        </form>
      </div>
    </LoginLayout>
  );
};
