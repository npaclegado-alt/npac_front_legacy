import { useState, ChangeEvent, useContext, useEffect } from "react";
import { InputSimpleSelect } from "../../components/inputs/simpleSelect/simpleSelectInput";
import { InputTextSimple } from "../../components/inputs/simpleText/inputSimpleText";
import { LoginLayout } from "../../components/loginLayout";
import styles from "./invitation.module.scss";
import Filters from "../../libs/Filters";
import { useParams } from "react-router-dom";
import { ContextApi } from "../../contexts";
import { toast } from "react-toastify";
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
  });

  const [termsServices, setTermsService] = useState(false);

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
      },
      criptoIdentify
    );
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                ?.filter((produto) => produto.createUser)
                ?.map((produtoItem) => {
                  return {
                    nome: produtoItem.name,
                    id: produtoItem._id,
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

            <div className={styles.registerUserInvatationGroup}>
              <InputTextSimple
                name="postalCode"
                placeholder="Insira seu CEP"
                value={Filters.inputMaskCEP(invationUser.postalCode)}
                onChange={(e) => {
                  handleChangeInvitation(e);
                  const cepString = Filters.clearStringOnlyNumbers(
                    e.target.value
                  ).toString();
                  if (cepString.length === 8) {
                    getAdressByPostalCode(cepString);
                  }
                }}
                style={changeWidthInput(currentScreen, "32.3%")}
              />
              <InputSimpleSelect
                data={ufs}
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
                value={invationUser.logradouro}
                placeholder="Logradouro"
                onChange={handleChangeInvitation}
                style={changeWidthInput(currentScreen, "46%")}
              />

              <InputTextSimple
                placeholder="Bairro"
                name="bairro"
                value={invationUser.bairro?.replace(/\d/g, "")}
                onChange={handleChangeInvitation}
                style={changeWidthInput(currentScreen, "21%")}
              />

              <InputTextSimple
                name="numero"
                placeholder="200"
                value={Filters.clearStringOnlyNumbers(invationUser.numero)}
                onChange={handleChangeInvitation}
                style={changeWidthInput(currentScreen, "30%")}
              />
            </div>

            <div className={styles.registerUserInvatationGroup}>
              <InputTextSimple
                name="complement"
                placeholder="Complemento"
                value={invationUser.complement?.replace(/\d/g, "")}
                onChange={handleChangeInvitation}
                style={changeWidthInput(currentScreen, "49.2%")}
              />

              <InputTextSimple
                name="referencia"
                placeholder="Ponto de referência"
                value={invationUser.referencia?.replace(/\d/g, "")}
                onChange={handleChangeInvitation}
                style={changeWidthInput(currentScreen, "49.2%")}
              />
            </div>

            <div className={styles.termsServices}>
              <InputTextSimple
                type="checkbox"
                name="termos"
                checked={termsServices}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTermsService(e.target.checked)
                }
              />
              <span>Li e Concordo com os Termos de Serviço.</span>
            </div>

            <button type="submit">Ir Para o Checkout</button>
          </div>
        </form>
      </div>
    </LoginLayout>
  );
};
