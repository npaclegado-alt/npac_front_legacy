import React, { useContext, useEffect, useMemo } from "react";

import styles from "./styleDocuments.module.scss";
import { Space, Table, Tooltip } from "antd";
import { ContextApi } from "../../../contexts";
import { ColumnsType } from "antd/es/table";
import { Edit, Plus, Trash } from "lucide-react";
import { CustomButton } from "../../../components/buttons/customButton";
import { useNavigate } from "react-router-dom";

interface DataType {
  name: string;
  description: string;
}

const Documents: React.FC = () => {
  const navigate = useNavigate();
  const {
    getAllDocuments,
    documents: rawDocuments,
    deleteDocument,
    dimensions,
  } = useContext(ContextApi);

  const documents: DataType[] = useMemo(() => {
    return rawDocuments.map((doc) => {
      return {
        name: doc.name,
        description: doc.fieldName,
      };
    });
  }, [rawDocuments]);

  useEffect(() => {
    getAllDocuments();
  }, [getAllDocuments]);

  const columns: ColumnsType<DataType> = [
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
            <Edit
              onClick={() => navigate(`add/${data._id}`)}
              className={styles.icon}
            />
            <Tooltip
              placement="top"
              title={
                <div className={styles.tooltip}>
                  Realmente deseja excluir este documento?
                  <CustomButton
                    onClick={() => deleteDocument(data.originalName)}
                  >
                    Sim
                  </CustomButton>
                </div>
              }
            >
              <Trash className={styles.icon} />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  if (dimensions.width > 768) {
    columns.splice(1, 0, {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Documentos</div>
        <CustomButton onClick={() => navigate("add")}>
          <div className={styles.button}>
            Adicionar <Plus />
          </div>
        </CustomButton>
      </div>
      <Table
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={documents}
      />
    </div>
  );
};

export default Documents;
