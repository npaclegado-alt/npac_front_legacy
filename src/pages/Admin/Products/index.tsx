import React, { useContext, useEffect } from "react";

import styles from "./styleProducts.module.scss";
import { Space, Table } from "antd";
import { ContextApi } from "../../../contexts";
import { ColumnsType } from "antd/es/table";
import Filters from "../../../libs/Filters";
import { Edit, Plus, Trash } from "lucide-react";
import { CustomButton } from "../../../components/buttons/customButton";
import { useNavigate } from "react-router-dom";

interface DataType {
  name: string;
  description: string;
  price: number;
}

const Products: React.FC = () => {
  const navigate = useNavigate();
  const { getAllProducts, products, deleteProductRequest } =
    useContext(ContextApi);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      render: (price) => <div>{Filters.convertMoneyInputMask(price)}</div>,
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
            <Trash
              onClick={() => deleteProductRequest(data._id)}
              className={styles.icon}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Produtos</div>
        <CustomButton onClick={() => navigate("add")}>
          <div className={styles.button}>
            Adicionar <Plus />
          </div>
        </CustomButton>
      </div>
      <Table
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={products}
      />
    </div>
  );
};

export default Products;
