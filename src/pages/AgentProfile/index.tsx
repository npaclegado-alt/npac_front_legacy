import { useContext, ChangeEvent, useEffect } from "react";
import styles from "./agent-profile.module.scss";
import { Download, Eye, EyeOff, PenSquare, Upload } from "lucide-react";
import agent from "../../assets/imgs/download.jpg";
import { useState } from "react";
import { Modal } from "antd";
import { InputTextSimple } from "../../components/inputs/simpleText/inputSimpleText";
import { InputSimpleSelect } from "../../components/inputs/simpleSelect/simpleSelectInput";
import { ContextApi } from "../../contexts";
import Filters from "../../libs/Filters";

type UserType = {
  name: string;
  cpf: string;
  password: string;
  phone: string;
  email: string;
  role: string;
  referencia: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  postalCode: string;
  bairro: string;
  dataNascimento: string;
};

export default function AgentProfile() {
  const {
    user,
    profileEditAgent,
    editAgentProfile,
    setEditAgentProfile,
    ufs,
    getAllStates,
    cities,
    getCitiesByUf,
    getAdressByPostalCode,
  } = useContext(ContextApi);

  const [userData, setUserData] = useState<UserType>({
    name: "",
    cpf: "",
    password: "",
    phone: "",
    email: "",
    role: "",
    referencia: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
    postalCode: "",
    bairro: "",
    dataNascimento: "",
  });

  const [seePasswordAgent, setSeePasswordAgent] = useState(false);

  const ufStorage = ufs.find((uf) => uf.nome === user?.address?.state)
    ?.id as number;
  const cityStorage = cities.find((uf) => uf.nome === user?.address?.city)
    ?.id as number;

  useEffect(() => {
    setUserData({
      ...user,
      ...user?.address,
      state: ufStorage?.toString(),
      city: cityStorage?.toString(),
    } as UserType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, ufStorage, cityStorage]);

  useEffect(() => {
    getAllStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ufStorage) {
      getCitiesByUf(ufStorage.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ufStorage]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ufById = ufs.find((uf) => uf.id === +userData.state)?.nome as string;
    const citieById = cities.find((citie) => citie.id === +userData.city)
      ?.nome as string;

    const addressData = {
      street: userData.street,
      number: userData.number,
      complement: userData.complement,
      city: citieById,
      state: ufById,
      postalCode: Filters.clearStringOnlyNumbers(userData.postalCode),
    };

    const identificationData = {
      name: userData.name,
      cpf: userData.cpf,
      password: userData.password,
      phone: Filters.clearStringOnlyNumbers(userData.phone),
      email: userData.email,
      role: userData.role,
    };
    if (user)
      await profileEditAgent(user._id as string, {
        ...user,
        ...identificationData,
        address: addressData,
      });
  };

  console.log(user);

  return (
    <section className={styles.AgentProfilePage}>
      <div className={styles.PersonalData}>
        <h2>Dados Pessoais</h2>
        <button onClick={() => setEditAgentProfile(true)}>
          <PenSquare size={20} />
          <span>Editar Dados Pessoais</span>
        </button>

        <div className={styles.PersonalDataImg}>
          {user?.avatar && <img src={user.avatar} alt={agent} />}
        </div>

        <div className={styles.PersonalDataNameData}>
          <div className={styles.PersonalDataNameDataItem}>
            <h3>Nome Completo</h3>
            <span>{user?.name}</span>
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
            <span>{Filters.inputMaskTELWithDDD(user?.phone)}</span>
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
            <span>{user?.address?.postalCode}</span>
          </div>

          <div className={styles.PersonalDataBorder} />

          <div className={styles.StreetDataZipStateItem}>
            <h3>Estado</h3>
            <span>{user?.address?.state}</span>
          </div>
        </div>

        <div className={styles.StreetDataCityAddress}>
          <div className={styles.StreetDataCityAddressItem}>
            <h3>Cidade</h3>
            <span>{user?.address?.city}</span>
          </div>

          <div className={styles.PersonalDataBorder} />

          <div className={styles.StreetDataCityAddressItem}>
            <h3>Endereço</h3>
            <span>{user?.address?.street}</span>
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
        width={"75rem"}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        closeIcon={false}
        onCancel={() => {
          setSeePasswordAgent(false);
          setEditAgentProfile(false);
        }}
      >
        <form className={styles.modalFormEditAgent} onSubmit={handleSubmit}>
          <h2>Alterar Dados Pessoais</h2>

          <div className={styles.modalFormEditData}>
            <div className={styles.modalFormEditIdentification}>
              <h3>Dados de Identificação</h3>
              <InputTextSimple
                name="name"
                placeholder="Davi Carlos Rodrigues"
                value={userData.name}
                onChange={handleChange}
              />
              <InputTextSimple
                name="dataNascimento"
                placeholder="20/02/1990"
                type="date"
                value={userData.dataNascimento}
                onChange={handleChange}
              />
              <InputTextSimple
                name="phone"
                placeholder="(00) 9999-9999"
                value={Filters.inputMaskTELWithDDD(userData.phone)}
                onChange={handleChange}
              />
              <InputTextSimple
                name="email"
                placeholder="Email@email.com.br"
                value={userData.email}
                onChange={handleChange}
              />

              <div className={styles.modalFormEditSeePassword}>
                <InputTextSimple
                  type={seePasswordAgent ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
                <button
                  onClick={() => setSeePasswordAgent((look) => !look)}
                  type="button"
                >
                  {seePasswordAgent ? (
                    <EyeOff size={25} color="#AEAEAE" />
                  ) : (
                    <Eye size={25} color="#AEAEAE" />
                  )}
                </button>
              </div>

              <button type="button">
                <span>Adicionar Comprovante de Identidade</span>
                <Upload />
              </button>
            </div>

            <div className={styles.modalFormEditBorder} />

            <div className={styles.modalFormEditAddress}>
              <h3>Dados de Endereço</h3>
              <div className={styles.modalFormEditGroupAddress}>
                <InputTextSimple
                  name="postalCode"
                  placeholder="89221-170"
                  value={Filters.inputMaskCEP(userData.postalCode)}
                  onChange={(e) => {
                    handleChange(e);
                    const cepString = Filters.clearStringOnlyNumbers(
                      e.target.value
                    ).toString();
                    if (cepString.length === 8) {
                      getAdressByPostalCode(cepString);
                    }
                  }}
                />
                <InputSimpleSelect
                  data={ufs}
                  id="state"
                  optionZero="Selecione seu estado"
                  value={userData.state}
                  onChange={(e) => {
                    handleChange(e);
                    getCitiesByUf(e.target.value);
                  }}
                />
              </div>
              <div className={styles.modalFormEditGroupAddress}>
                <InputSimpleSelect
                  optionZero="Selecione sua cidade"
                  data={cities}
                  id="city"
                  value={userData.city}
                  onChange={handleChange}
                />
                <InputTextSimple
                  placeholder="Saguaçu"
                  name="bairro"
                  value={userData.bairro?.replace(/\d/g, "")}
                  onChange={handleChange}
                />
              </div>

              <InputTextSimple
                name="street"
                placeholder="street Guaramirim"
                value={userData.street}
                onChange={handleChange}
              />

              <div className={styles.modalFormEditGroupOneAddress}>
                <InputTextSimple
                  name="number"
                  placeholder="200"
                  value={Filters.clearStringOnlyNumbers(userData.number)}
                  onChange={handleChange}
                />
                <InputTextSimple
                  name="complement"
                  placeholder="complement"
                  value={userData.complement?.replace(/\d/g, "")}
                  onChange={handleChange}
                />
              </div>

              <InputTextSimple
                name="referencia"
                placeholder="Ponto de referência"
                value={userData.referencia?.replace(/\d/g, "")}
                onChange={handleChange}
              />

              <button type="button">
                <span>Adicionar Comprovante de Endereço</span>
                <Upload />
              </button>
            </div>
          </div>
          <button type="submit">Salvar Alterações de Dados Pessoais</button>
        </form>
      </Modal>
    </section>
  );
}
