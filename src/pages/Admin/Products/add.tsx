import React, { useCallback, useContext, useEffect, useState } from "react";

import styles from "./styleProducts.module.scss";
import { ContextApi } from "../../../contexts";
import { CustomButton } from "../../../components/buttons/customButton";
import { ArrowLeft, CheckCheck, Trash, UploadIcon } from "lucide-react";
import { InputTextSimple } from "../../../components/inputs/simpleText/inputSimpleText";
import Filters from "../../../libs/Filters";
import { Upload, UploadFile, UploadProps } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { InputSimpleSelect } from "../../../components/inputs/simpleSelect/simpleSelectInput";
import { toast } from "react-toastify";
import api from "../../../services/api";

const AddProducts: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    addProductRequest,
    productsById,
    productFiltered: initialData,
    clearProductFiltered,
  } = useContext(ContextApi);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [auff, setAuff] = useState("");
  const [isCommissionable, setIsCommissionable] = useState(false);
  const [commissionType, setCommissionType] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [defaultFileList, setDefaultFileList] = useState<any>([]);

  useEffect(() => () => clearProductFiltered(), [clearProductFiltered]);

  useEffect(() => {
    if (productId) {
      productsById(productId);
    }
  }, [productId, productsById]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(Filters.convertMoneyInputMask(initialData.price));
      setAuff(String(initialData.auff));
      setIsCommissionable(initialData.isCommissionable);
      setCommissionType(initialData.commissionType ?? "");
      console.log(initialData);
    }
  }, [initialData]);

  const commissionTypeOptions = [
    { id: "esfera", nome: "Esfera" },
    { id: "grupo", nome: "Grupo" },
    { id: "ambos", nome: "Ambos" },
  ];

  const commissionableOptions = [
    { id: 1, nome: "Sim" },
    { id: 2, nome: "Não" },
  ];

  const handleChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = URL.createObjectURL(file.response.file);
      }
      return file;
    });

    setFileList(newFileList);
  };

  const validateFields = useCallback(() => {
    let hasError = false;
    let messages = [];
    if (name.length === 0) {
      hasError = true;
      messages.push(<li>Nome</li>);
    }
    if (description.length === 0) {
      hasError = true;
      messages.push(<li>Descrição</li>);
    }
    if (price.length === 0) {
      hasError = true;
      messages.push(<li>Preço</li>);
    }
    if (auff.length === 0) {
      hasError = true;
      messages.push(<li>Auffs</li>);
    }
    if (isCommissionable && commissionType === "") {
      hasError = true;
      messages.push(<li>Tipo de comissão</li>);
    }
    if (fileList.length === 0) {
      hasError = true;
      messages.push(<li>Imagem</li>);
    }

    if (hasError) {
      toast.error(
        <div>
          Campos obrigatorios:
          <br />
          {messages.map((message) => {
            return <div>{message}</div>;
          })}
        </div>
      );
      return false;
    }
    return true;
  }, [
    auff,
    commissionType,
    description,
    fileList,
    isCommissionable,
    name,
    price,
  ]);

  const handleSubmit = useCallback(() => {
    if (validateFields()) {
      const files: File[] = fileList.map((item) => item.response.file);
      if (productId) {
      } else {
        addProductRequest(
          name,
          description,
          Filters.removeMoneyMask(price),
          Number(auff),
          files,
          isCommissionable,
          isCommissionable ? commissionType : undefined
        );
      }
    }
  }, [
    auff,
    commissionType,
    description,
    fileList,
    isCommissionable,
    name,
    price,
    validateFields,
    addProductRequest,
    productId,
  ]);

  return (
    <div className={styles.container}>
      {productId && !initialData ? (
        <></>
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.row}>
              <ArrowLeft onClick={() => navigate(-1)} className={styles.icon} />
              <div className={styles.title}>Adicionar Produto</div>
            </div>
            <CustomButton onClick={handleSubmit}>
              <div className={styles.button}>
                Salvar <CheckCheck />
              </div>
            </CustomButton>
          </div>
          <div className={styles.body}>
            <div className={styles.formGroup}>
              <div className={styles.label}>Nome</div>
              <InputTextSimple
                name="name"
                value={name}
                placeholder="Insira o nome do produto"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.label}>Descrição</div>
              <InputTextSimple
                name="description"
                value={description}
                placeholder="Insira a descrição do produto"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <div className={styles.label}>Preço</div>
                <InputTextSimple
                  name="price"
                  value={price}
                  placeholder="Insira o preço do produto"
                  onChange={(e) =>
                    setPrice(Filters.convertMoneyInputMask(e.target.value))
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <div className={styles.label}>Auffs</div>
                <InputTextSimple
                  name="auff"
                  value={auff}
                  placeholder="Insira os auffs do produto"
                  onChange={(e) =>
                    setAuff(Filters.clearStringOnlyNumbers(e.target.value))
                  }
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <div className={styles.label}>Possui comissão</div>
                <InputSimpleSelect
                  disableOptionZero
                  data={commissionableOptions}
                  onChange={(e) => {
                    setIsCommissionable(e.target.value === "1");
                  }}
                  value={isCommissionable ? "1" : "2"}
                />
              </div>
              {isCommissionable && (
                <div className={styles.formGroup}>
                  <div className={styles.label}>Tipo de comissão</div>
                  <InputSimpleSelect
                    data={commissionTypeOptions}
                    onChange={(e) => {
                      setCommissionType(e.target.value);
                    }}
                    value={commissionType}
                  />
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.label}>Imagens</div>
              <Upload
                defaultFileList={defaultFileList}
                listType="picture"
                onChange={handleChange}
                maxCount={10}
                showUploadList={{
                  removeIcon: <Trash className={styles.icon} />,
                }}
                multiple
                fileList={fileList}
                customRequest={(e) => {
                  if (e.onSuccess) e.onSuccess(e);
                }}
              >
                {fileList.length < 10 && (
                  <CustomButton>
                    <div className={styles.button}>
                      Upload <UploadIcon />
                    </div>
                  </CustomButton>
                )}
              </Upload>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddProducts;
