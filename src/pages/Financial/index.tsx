import { Eye, PenSquare, Plus } from "lucide-react";
import styles from "./financial.module.scss";
import { Modal } from "antd";
import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { InputSimpleSelect } from "../../components/inputs/simpleSelect/simpleSelectInput";
import { InputTextSimple } from "../../components/inputs/simpleText/inputSimpleText";
import { ContextApi } from "../../contexts";
import Filters from "../../libs/Filters";
import moment from "moment";

export const Financial = () => {
  const {
    user,
    transactions,
    getAllTransactionsByUserId,
    products,
    getAllProducts,
    commissions,
    getAllCommissionsByUserId,
  } = useContext(ContextApi);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (user) {
      getAllTransactionsByUserId(user._id);
      getAllCommissionsByUserId(user._id);
    }
  }, [user, getAllTransactionsByUserId, getAllCommissionsByUserId]);

  const [openEditBankDetails, setOpenEditBankDetails] = useState(false);
  const [seeProfits, setSeeProfits] = useState(false);
  const [seeInvestment, setSeeInvestment] = useState(false);

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

  console.log(commissions);
  console.log(transactions);

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
            <span>{user?.banckAccount?.name}</span>
          </div>
        </div>

        <div className={styles.financialBankDataAccountUser}>
          <div className={styles.financialBankDataUserItem}>
            <h3>Agência</h3>
            <span>{user?.banckAccount?.ag}</span>
          </div>
          <div className={styles.financialBankDataBorder} />

          <div className={styles.financialBankDataUserItem}>
            <h3>Conta</h3>
            <span>{user?.banckAccount?.cc}</span>
          </div>
          <div className={styles.financialBankDataBorder} />

          <div className={styles.financialBankDataUserItem}>
            <h3>Chaves Pix</h3>
            <span>{user?.banckAccount?.pix}</span>
          </div>
        </div>
      </div>
      <div className={styles.financialAccountAvailable}>
        <div className={styles.financialAccountAvailableItem}>
          <h2>Disponível em Minha Conta</h2>
          <span>
            {Filters.convertMoneyTextMask(commissions?.balance?.money)}
          </span>
        </div>

        <div className={styles.financialAccountAvailableTransfer}>
          <h3>Transferência</h3>
          <p>Transfira o valor disponível para sua conta do banco.</p>
        </div>

        <button>Transferir</button>
      </div>
      <div
        className={styles.financialInvestments}
        onClick={() => setSeeInvestment((investiment) => !investiment)}
      >
        <h3>Investimentos</h3>
        {seeInvestment ? (
          <ul onClick={() => setSeeInvestment(false)}>
            {transactions.map((transaction) => {
              const status = getStatus(transaction?.status);
              const date = moment(transaction?.updatedAt);
              const amount = Filters.convertMoneyTextMask(transaction?.amount);
              const name = transaction?.items
                .map(
                  (item: any) =>
                    products.find((product) => product._id === item.code)?.name
                )
                .join(",");
              return (
                <li>
                  <div className={styles.values}>
                    <h6>{amount}</h6>
                    <p>{name}</p>
                  </div>

                  <div className={styles.information}>
                    <span className={status.style}>{status.label}</span>
                    <p>{`${String(date.day()).padStart(2, "0")}/${String(
                      date.month()
                    ).padStart(2, "0")}/${date.year()}`}</p>
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
              );
              const amount = Filters.convertMoneyTextMask(commission?.amount);
              const name = commission?.productName;

              return (
                <li>
                  <div className={styles.values}>
                    <h6>{amount}</h6>
                    <p>{name}</p>
                  </div>

                  <div className={styles.information}>
                    <span className={status.style}>{status.label}</span>
                    <p>{`${String(date.day()).padStart(2, "0")}/${String(
                      date.month()
                    ).padStart(2, "0")}/${date.year()}`}</p>
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
        onCancel={() => setOpenEditBankDetails(false)}
        width="30rem"
        centered
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
      >
        <div className={styles.financialModalEdit}>
          <h3>Alterar Dados Bancários</h3>

          <form
            onSubmit={(e: ChangeEvent<HTMLFormElement>) => e.preventDefault()}
          >
            <InputTextSimple name="nome" placeholder="Davi Carlos Rodrigues" />
            <InputTextSimple name="nome" placeholder="506.702.231-07" />

            <InputSimpleSelect
              data={[
                {
                  id: 1,
                  nome: "Banco do Brasil (001)",
                },
              ]}
              optionZero="Banco do Brasil (001)"
            />

            <div className={styles.financialModalEditAccount}>
              <InputTextSimple name="nome" placeholder="1366" />
              <InputTextSimple name="nome" placeholder="8103-5" />
            </div>

            <div className={styles.financialModalEditKey}>
              <h4>Chaves Pix</h4>
              <div className={styles.financialModalAddKeys}>
                <InputTextSimple name="nome" placeholder="1366" />
                <button type="button">
                  <Plus />
                </button>
              </div>

              <button type="submit">Salvar Alterações</button>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
};
