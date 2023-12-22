import React, { useContext, useEffect, useMemo, useState } from "react";

import styles from "./styleUsers.module.scss";
import { Modal, Space, Table } from "antd";
import { ContextApi, IUserReport } from "../../../contexts";
import { ColumnsType } from "antd/es/table";
import { Eye } from "lucide-react";
import { InputSimpleSelect } from "../../../components/inputs/simpleSelect/simpleSelectInput";
import { InputTextSimple } from "../../../components/inputs/simpleText/inputSimpleText";
import { useExtractChildren } from "../../../hooks/useExtractChildren";
import { mainScreemDetails } from "../../../services/requests/main";
import Filters from "../../../libs/Filters";

interface DataType {
  avatar: string;
  name: string;
}

const Users: React.FC = () => {
  const {
    getAllUsers,
    users,
    dimensions,
    getAllTransactionsByUserId,
    transactions,
    spheresResp,
    getSpheresByUser,
  } = useContext(ContextApi);
  const [modal, setModal] = useState(false);
  const [filterBy, setFilterBy] = useState<"name" | "active" | "graduation">(
    "name"
  );
  const [filter, setFilter] = useState("");
  const [currentUser, setCurrentUser] = useState<IUserReport>();
  const children = useExtractChildren(spheresResp?.rootNode);
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (currentUser) {
      getAllTransactionsByUserId(currentUser._id);
      getSpheresByUser(currentUser._id);
      mainScreemDetails(currentUser._id)
        .then((response: any) => {
          setApiData(response.data as any);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados", error);
        });
    }
  }, [currentUser, getAllTransactionsByUserId, getSpheresByUser]);

  const filterOptions = [
    { id: "name", nome: "Nome" },
    { id: "active", nome: "Status" },
    { id: "graduation", nome: "Graduação" },
  ];

  const activeOptions = [
    { id: true, nome: "Ativo" },
    { id: false, nome: "Inativo" },
  ];

  const filteredUsers = useMemo(() => {
    if (filter === "") return users;
    if (filterBy === "active") {
      return users.filter((u) => u.active === (filter === "true"));
    } else {
      return users.filter((u) =>
        u[filterBy]?.toLowerCase().includes(filter.toLowerCase())
      );
    }
  }, [filterBy, filter, users]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (data) => {
        return (
          <div>
            <div className={styles.avatarContainer}>
              <div className={styles.avatarContainerBg}>
                <img
                  alt="perfil"
                  className={styles.avatar}
                  src="https://picsum.photos/200"
                ></img>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ações",
      key: "action",
      render: (data) => {
        return (
          <Space size="middle">
            <Eye
              onClick={() => {
                setCurrentUser(data);
                setModal(!modal);
              }}
              className={styles.icon}
            />
          </Space>
        );
      },
    },
  ];

  if (dimensions.width > 768) {
    columns.splice(2, 0, {
      title: "Graduação",
      dataIndex: "graduation",
      key: "graduation",
      render: (data) => {
        return (
          <div style={{ textTransform: "capitalize" }}>
            {data?.toLowerCase()}
          </div>
        );
      },
    });
    columns.splice(3, 0, {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (data) => {
        return (
          <div style={{ textTransform: "capitalize" }}>
            {data ? "ativo" : "inativo"}
          </div>
        );
      },
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Usuários</div>
      </div>
      <div className={styles.filtersRow}>
        <div>
          <div style={{ marginBottom: 5 }}>Filtrar por:</div>
          <div className={styles.row}>
            <InputSimpleSelect
              disableOptionZero
              data={filterOptions}
              onChange={(e) => {
                setFilter("");
                setFilterBy(e.target.value as any);
              }}
              value={filterBy}
            />
            {filterBy === "active" ? (
              <InputSimpleSelect
                disableOptionZero
                data={activeOptions}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
                value={filter}
              />
            ) : (
              <InputTextSimple
                name="filter"
                value={filter}
                placeholder="Pesquisar..."
                onChange={(e) => setFilter(e.target.value)}
              />
            )}
          </div>
        </div>
        {dimensions.width > 768 && (
          <div className={styles.row}>
            <div className={styles.badge}>
              Usuários ativos: {users.filter((u) => u.active).length}
            </div>
            <div className={styles.badge}>Qtd usuários: {users.length}</div>
          </div>
        )}
      </div>
      <Table
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={filteredUsers as any}
      />
      <Modal
        centered
        className={styles.scroll}
        open={modal}
        width={dimensions.width > 768 ? "50vw" : "95vw"}
        styles={{ body: { height: "85vh", overflow: "scroll" } }}
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
        onCancel={() => {
          setModal(!modal);
          setCurrentUser(undefined);
        }}
      >
        <div className={styles.modalContainer}>
          <div className={styles.modalTitle}>Detalhes</div>
          <div className={styles.profileContainer}>
            <div className={styles.profileContainerBg}>
              <img
                alt="perfil"
                className={styles.profile}
                src="https://picsum.photos/200"
              ></img>
            </div>
          </div>
          <div
            style={{ width: dimensions.width > 768 ? "75%" : "100%" }}
            className={styles.data}
          >
            <div>
              <div className={styles.dataTitle}>Nome</div>
              <div className={styles.dataValue}>{currentUser?.name}</div>
            </div>
            <div className={styles.rowModal}>
              <div>
                <div className={styles.dataTitle}>Telefone</div>
                <div className={styles.dataValue}>
                  {Filters.inputMaskTELWithDDD(currentUser?.phone)}
                </div>
              </div>
              <div>
                <div className={styles.dataTitle}>E-mail</div>
                <div className={styles.dataValue}>{currentUser?.email}</div>
              </div>
            </div>
            <div>
              <div className={styles.dataTitle}>Endereço</div>
              <div className={styles.row}>
                <div className={styles.dataValue}>
                  {`${currentUser?.address?.street} ${
                    currentUser?.address?.number
                  } ${currentUser?.address?.city} ${
                    currentUser?.address?.state
                  } ${Filters.inputMaskCEP(currentUser?.address?.postalCode)}`}
                </div>
              </div>
            </div>
            <div className={styles.rowModal}>
              <div>
                <div className={styles.dataTitle}>Graduação</div>
                <div className={styles.dataValue}>
                  <div style={{ textTransform: "capitalize" }}>
                    {currentUser?.graduation?.toLowerCase()}
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.dataTitle}>Total de vendas</div>
                <div className={styles.dataValue}>{transactions.length}</div>
              </div>
              <div>
                <div className={styles.dataTitle}>Grupo</div>
                <div className={styles.dataValue}>
                  {children?.length} Pessoas
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className={styles.dataTitle}>Saldo disponível</div>
                <div className={styles.dataValue}>
                  {Filters.convertMoneyTextMask(apiData?.userBalance?.money)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
