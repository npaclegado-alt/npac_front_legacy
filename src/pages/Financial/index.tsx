import { Eye, PenSquare, Plus, Trash } from "lucide-react";
import styles from "./financial.module.scss";
import { InputNumber, Modal } from "antd";
import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { InputSimpleSelect } from "../../components/inputs/simpleSelect/simpleSelectInput";
import { InputTextSimple } from "../../components/inputs/simpleText/inputSimpleText";
import { ContextApi } from "../../contexts";
import Filters from "../../libs/Filters";
import moment from "moment";
import "moment/locale/pt-br";
import { IBankAccount } from "../../contexts/interfaces";
import { SelectSearch } from "../../components/inputs/searchSelectInput/selectSearch";
import { withdrawal } from "../../services/requests/withdrawal";
import { toast } from "react-toastify";
import { getWithdrawal } from "../../services/requests/withdrawal";
type ReverseTypesKey = {
  [key: string]: number;
};

export const Financial = () => {
  const typesKey = {
    "1": "CPF",
    "2": "EMAIL",
    "3": "CELULAR",
    "4": "ALEATORIA",
    "5": "CNPJ",
  };

  const reverseTypesKey: ReverseTypesKey = {
    CPF: 1,
    EMAIL: 2,
    CELULAR: 3,
    ALEATORIA: 4,
    CNPJ: 5,
  };
  moment.locale("pt-br");
  const {
    user,
    transactions,
    getAllTransactionsByUserId,
    products,
    getAllProducts,
    commissions,
    getAllCommissionsByUserId,
    getBanks,
    banks,
    profileEditAgent,
  } = useContext(ContextApi);

  useEffect(() => {
    getAllProducts();
    getBanks();
  }, []);

  const [openEditBankDetails, setOpenEditBankDetails] = useState(false);
  const [seeProfits, setSeeProfits] = useState(false);
  const [amount, setAmount] = useState(0);

  const [seeInvestment, setSeeInvestment] = useState(false);
  const [bankAccount, setBankAccount] = useState<IBankAccount>({
    name: "",
    bank: "",
    number: 0,
    ispb: "",
    cpf: "",
    ag: 0,
    cc: 0,
    dv: "",
    pix: [
      {
        key: "",
        type: "",
      },
    ],
  });
  const [showTooltipBank, setShowTooltipBank] = useState(false);
  const [numberKeys, setNumberKeys] = useState(1);
  const [withdrawals, setWithdrawals] = useState({
    msg: "Transferir",
    disabled: true,
  });

  const changeBankAccount = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.id === "cpf") {
      setBankAccount({
        ...bankAccount,
        [e.target.id]: Filters.clearStringOnlyNumbers(e.target.value),
      });
      return;
    }
    setBankAccount({
      ...bankAccount,
      [e.target.id]: e.target.value,
    });
  };

  const _fetch = () => {
    if (user) {
      getAllTransactionsByUserId(user._id);
      getAllCommissionsByUserId(user._id);
    }
    if (user?.bankAccount) {
      setBankAccount(user.bankAccount);
    }

    getWithdrawal()
      .then((response: any) => {
        if (!response.data) {
          setWithdrawals({
            msg: "Transferir",
            disabled: false,
          });
          return;
        }
        console.log(response.data.length > 0);
        setWithdrawals(
          response.data.length > 0
            ? {
                msg: "Voce possui solicitacoes em andamento",
                disabled: true,
              }
            : {
                msg: "Transferir",
                disabled: false,
              }
        );
      })
      .catch(() => toast.error("Nao foi possivel obter as retiradas"));
  };

  useEffect(() => {
    _fetch();
  }, []);

  const changeBanckSelect = (value: string) => {
    const bank = banks?.find((bank) => bank.ispb === value);
    if (bank) {
      setBankAccount({
        ...bankAccount,
        bank: bank.name,
        ispb: bank.ispb,
        number: bank.code,
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bankAccount.bank) {
      return setShowTooltipBank(true);
    }

    if (user) {
      let { password, ...rest } = user;
      await profileEditAgent(user._id as string, {
        ...rest,
        bankAccount: bankAccount,
      });
    }

    setOpenEditBankDetails(false);
  };

  const getStatus = (status: string) => {
    if (status === "pending") {
      return { label: "Processando", style: styles.processing };
    }
    if (status === "canceled") {
      return { label: "Cancelado", style: styles.canceled };
    }
    if (status === "paid") {
      return { label: "Concluído", style: styles.concluded };
    }
    return { label: "", style: styles.processing };
  };

  const countKeys = useMemo(() => {
    return bankAccount?.pix?.length || 0;
  }, [bankAccount]);

  const addKey = () => {
    if (countKeys < 5) {
      setNumberKeys((numberKeys) => numberKeys + 1);
      setBankAccount({
        ...bankAccount,
        pix: [...(bankAccount?.pix || []), { key: "", type: "" }],
      });
    }
  };

  const changeKey = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const key = e.target.id.split("-")[1];
    const keyType = e.target.id.split("-")[0];
    let value = e.target.value;

    const newPix = bankAccount?.pix?.map((pix, index) => {
      if (index === Number(key)) {
        return {
          ...pix,
          [keyType]: value,
        };
      }
      return pix;
    });

    const removeMask = newPix?.map((pix, index) => {
      let withoutMask = pix;
      if (pix.type === "1" || pix.type === "5" || pix.type === "3") {
        withoutMask = {
          type: typesKey[pix.type],
          key: pix.key.replace(/\D/g, ""),
        };
      }
      return withoutMask;
    });

    setBankAccount({
      ...bankAccount,
      pix: removeMask,
    });
  };

  const maskPix = (type: string, pix: string) => {
    switch (type) {
      case "CPF":
      case "CNPJ":
        return Filters.inputMaskCPFCNPJ(pix);
      case "CELULAR":
        return Filters.inputMaskTELWithDDD(pix);
      default:
        return pix;
    }
  };

  const requestWithdrawal = async () => {
    const payload = {
      method: "pix",
      amount,
    };
    await withdrawal(payload)
      .then(() => {
        toast.success("Retirada solicidata com sucesso");
        _fetch();
      })
      .catch(({ data }) => {
        toast.error("Nao foi possivel solicitar sua retirada");
      });
  };

  return (
    <section className={styles.financialPage}>
      <div className={styles.financialBankData}>
        <h1>Meus Dados Bancários</h1>
        <button
          className={styles.financialBankDataButton}
          onClick={() => setOpenEditBankDetails(true)}
        >
          <PenSquare /> <span> Meus Dados Bancários</span>{" "}
        </button>

        <div className={styles.financialBankDataUser}>
          <div className={styles.financialBankDataUserItem}>
            <h3>Nome</h3>
            <span>{user?.name}</span>
          </div>
          <div className={styles.financialBankDataBorder} />
          <div className={styles.financialBankDataUserItem}>
            <h3>CPF</h3>
            <span>{user?.cpf}</span>
          </div>
          <div className={styles.financialBankDataBorder} />

          <div className={styles.financialBankDataUserItem}>
            <h3>Banco</h3>
            <span>{user?.bankAccount?.bank}</span>
          </div>
        </div>

        <div className={styles.financialBankDataAccountUser}>
          <div className={styles.financialBankDataUserItem}>
            <h3>Agência</h3>
            <span>{user?.bankAccount?.ag}</span>
          </div>
          <div className={styles.financialBankDataBorder} />

          <div className={styles.financialBankDataUserItem}>
            <h3>Conta</h3>
            <span>{user?.bankAccount?.cc}</span>
          </div>
          <div className={styles.financialBankDataBorder} />

          <div className={styles.financialBankDataUserItem}>
            <h3>Chaves Pix</h3>
            {user?.bankAccount?.pix?.map((pix, index) => {
              return (
                <span key={index}>
                  {pix.key} <br />
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.financialAccountAvailable}>
        <div className={styles.financialAccountAvailableItem}>
          <h2>Disponível para transferência</h2>
          <span>
            {Filters.convertMoneyTextMask(commissions?.balance?.money)}
          </span>
        </div>

        <p>Insira o valor que deseja transferir:</p>
        <div className={styles.withdrawal}>
          {/*<small>R$: </small>*/}
          <InputNumber
            placeholder="R$: 20"
            onChange={(e) => {
              if (e) setAmount(e);
            }}
            required
            min={0}
            disabled={withdrawals.disabled}
          />
        </div>
        <div className={styles.textDateTransfer}>
          <button disabled={withdrawals.disabled} onClick={requestWithdrawal}>
            {withdrawals.msg}
          </button>
          <p>
            Você pode solicitar a transferência a qualquer momento, porém o
            pagamento sempre é efetivado entre os dias 17 e 22 de cada mês.
          </p>
        </div>
      </div>
      <div
        className={styles.financialInvestments}
        onClick={() => setSeeInvestment((investiment) => !investiment)}
      >
        <h3>Investimentos</h3>
        {seeInvestment ? (
          <ul onClick={() => setSeeInvestment(false)}>
            {transactions?.map((transaction) => {
              const status = getStatus(transaction?.status);
              const date = moment(transaction?.updatedAt).format("LLL");
              const amount = transaction?.amount / 100;
              const name = transaction?.items
                .map(
                  (item: any) =>
                    products.find((product) => product._id === item.code)?.name
                )
                .join(",");
              return (
                <li>
                  <div className={styles.values}>
                    <h6>{Filters.convertMoneyTextMask(amount)}</h6>
                    <p>{name}</p>
                  </div>

                  <div className={styles.information}>
                    <span className={status.style}>{status.label}</span>
                    <p>{date}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={styles.financialSeeInvestment}>
            <Eye color="#D2D2D2" size={34} />
            <span>Mostrar Investimentos</span>
          </div>
        )}
      </div>
      <div
        className={styles.financialProfits}
        onClick={() => setSeeProfits((profits) => !profits)}
      >
        <h3>Lucros</h3>

        {seeProfits ? (
          <ul onClick={() => setSeeProfits(false)}>
            {commissions?.commissions.map((commission: any) => {
              const status = getStatus(commission?.status);
              const date = moment(
                commission?.updatedAt ?? commission?.createdAt
              ).format("LLL");

              const totalAmount =
                commission.amount > 0 ? commission.amount : commission.auff;
              const simbol = commission.amount > 0 ? "R$ " : "Auff";
              const amount = Filters.convertMoneyTextMask(totalAmount);

              const name = commission?.description;

              return (
                <li>
                  <div className={styles.values}>
                    <h6>{` ${
                      commission.amount > 0 ? amount : amount.split(",")[0]
                    }`}</h6>
                    <p>{name}</p>
                  </div>

                  <div className={styles.information}>
                    <span className={status.style}>{status.label}</span>
                    <p>{date}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={styles.financialSeeProfits}>
            <Eye color="#D2D2D2" size={34} />
            <span>Mostrar Lucros</span>
          </div>
        )}
      </div>

      <button hidden />

      <Modal
        open={openEditBankDetails}
        onCancel={() => {
          setOpenEditBankDetails(false);
          setShowTooltipBank(false);
        }}
        width="30rem"
        centered
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
        afterClose={() => setShowTooltipBank(false)}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
      >
        <div className={styles.financialModalEdit}>
          <h3>Alterar Dados Bancários</h3>

          <form onSubmit={handleFormSubmit}>
            <InputTextSimple
              name="name"
              placeholder="Nome completo"
              onChange={changeBankAccount}
              required
              value={bankAccount?.name || ""}
            />
            <InputTextSimple
              name="cpf"
              placeholder="CPF"
              onChange={changeBankAccount}
              required
              value={Filters.inputMaskCPFCNPJ(bankAccount?.cpf || "")}
            />
            <SelectSearch
              options={banks
                ?.filter((valid) => valid.code && valid.name !== undefined)
                ?.map((bank) => ({
                  label: bank.code + " - " + bank.name,
                  value: bank.ispb,
                }))}
              onChangeSelect={changeBanckSelect}
              value={bankAccount?.ispb}
            />

            <div className={styles.financialModalEditAccount}>
              <InputTextSimple
                name="ag"
                placeholder="Agência"
                onChange={changeBankAccount}
                required
                value={bankAccount?.ag || ""}
                maxLength={4}
              />
              <InputTextSimple
                name="cc"
                placeholder="Conta corrente"
                onChange={changeBankAccount}
                required
                value={bankAccount?.cc || ""}
              />
              <InputTextSimple
                name="dv"
                placeholder="Digito verificador"
                onChange={changeBankAccount}
                required
                value={bankAccount?.dv || ""}
                maxLength={2}
              />
            </div>

            <div className={styles.financialModalEditKey}>
              <h4>Chaves Pix</h4>
              {bankAccount?.pix?.map((pix, index) => {
                return (
                  <>
                    <InputSimpleSelect
                      name="KeyType"
                      id={`type-${index}`}
                      data={[
                        {
                          id: 1,
                          nome: "CPF",
                        },
                        {
                          id: 2,
                          nome: "EMAIL",
                        },
                        {
                          id: 3,
                          nome: "CELULAR",
                        },
                        {
                          id: 4,
                          nome: "ALEATORIA",
                        },
                        {
                          id: 5,
                          nome: "CNPJ",
                        },
                      ]}
                      onChange={changeKey}
                      optionZero="Selecionar o tipo da chave"
                      value={reverseTypesKey[pix?.type]}
                    />
                    <div className={styles.financialModalAddKeys}>
                      <InputTextSimple
                        name={`key-${index}`}
                        placeholder="Chave Pix"
                        onChange={changeKey}
                        value={maskPix(pix.type, pix.key)}
                      />
                      <button type="button" onClick={addKey}>
                        <Plus />
                      </button>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newPix = bankAccount?.pix?.filter(
                              (pix, i) => i !== index
                            );
                            setBankAccount({
                              ...bankAccount,
                              pix: newPix,
                            });
                            setNumberKeys((numberKeys) => numberKeys - 1);
                          }}
                        >
                          <Trash />
                        </button>
                      )}
                    </div>
                  </>
                );
              })}

              <button type="submit">Salvar Alterações</button>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
};
