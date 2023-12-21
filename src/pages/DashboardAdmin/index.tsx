import React, { useContext, useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import {
  IWithdrawal,
  getWithdrawal,
  processWithdrawal,
} from "../../services/requests/withdrawal";
import { toast } from "react-toastify";
import moment from "moment";

const DashboardAdmin: React.FC = () => {
  const [Withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _fetch();
  }, []);

  const _fetch = () => {
    getWithdrawal()
      .then((response: any) => {
        if (!response.data) {
          setWithdrawals([]);
          return;
        }
        console.log(response.data);
        setWithdrawals(response.data);
      })
      .catch(() => toast.error("Nao foi possivel obter as retiradas"))
      .finally(() => setLoading(false));
  };

  const _process = async (id: string, payload: IWithdrawal) => {
    setLoading(true);
    payload.status = "completed";
    await processWithdrawal(id!, payload)
      .then(() => {
        _fetch();
      })
      .catch(({ response }) => {
        console.log(response?.data?.message);
        toast.error(
          response?.data?.message
            ? response?.data?.message
            : "Nao foi possivel regitrar a retirada"
        );
      });
  };

  return (
    <section className={styles.dashBoardPage}>
      <table>
        <thead>
          <tr>
            <th>Ordem</th>
            <th>Usuario</th>
            <th>Celular</th>
            <th>Email</th>
            <th>Valor</th>
            <th>Pix</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            Withdrawals.map((item: IWithdrawal, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.userId.name}</td>
                <td>{item.userId.phone}</td>
                <td>{item.userId.email}</td>
                <td>R$: {item.amount}</td>
                <td>{item.pixKey}</td>
                <td>{moment(item.createdAt).format("LLL")}</td>
                <td>
                  <button
                    className={styles.processButton}
                    onClick={() => _process(item._id!, item)}
                  >
                    Processar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default DashboardAdmin;
