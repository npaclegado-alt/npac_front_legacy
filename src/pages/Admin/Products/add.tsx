import React, { useCallback, useContext, useEffect, useState } from "react";

import styles from "./styleProducts.module.scss";
import { ContextApi } from "../../../contexts";
import { CustomButton } from "../../../components/buttons/customButton";
import {
  ArrowLeft,
  CheckCheck,
  HelpCircleIcon,
  Trash,
  UploadIcon,
} from "lucide-react";
import { InputTextSimple } from "../../../components/inputs/simpleText/inputSimpleText";
import Filters from "../../../libs/Filters";
import { Tooltip, Upload, UploadFile, UploadProps } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { InputSimpleSelect } from "../../../components/inputs/simpleSelect/simpleSelectInput";
import { toast } from "react-toastify";

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
  const [commissionDistributionSpheres, setCommissionDistributionSpheres] =
    useState(["", "", ""]);
  const [commissionDistributionGroup, setCommissionDistributionGroup] =
    useState(["", "", ""]);
  const [commissionDistributionCarrer, setCommissionDistributionCarrer] =
    useState(["", "", ""]);
  const [commissionType, setCommissionType] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [defaultFileList, setDefaultFileList] = useState<any>([]);
  const [createUser, setCreateUser] = useState(false);

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

  const createUserOptions = [
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

  const handleCommisionField = useCallback(
    (stateValue: any, setStateValue: any, position: number, value: string) => {
      const tempArray = [...stateValue];
      tempArray[position] = Number(value) > 100 ? "100" : value;
      setStateValue(tempArray);
    },
    []
  );

  const handleCommisionMask = useCallback(
    (
      stateValue: any,
      setStateValue: any,
      position: number,
      value: string,
      mask: string
    ) => {
      if (value === "" && mask === "%") return;
      const tempArray = [...stateValue];
      tempArray[position] =
        Number(value) > 100 ? `100${mask}` : `${value}${mask}`;
      setStateValue(tempArray);
    },
    []
  );

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

    if (
      commissionDistributionSpheres.findIndex((item) => item.length === 0) !==
      -1
    ) {
      hasError = true;
      messages.push(<li>% Comissao (Esferas)</li>);
    }

    if (
      commissionDistributionGroup.findIndex((item) => item.length === 0) !== -1
    ) {
      hasError = true;
      messages.push(<li>% Comissao (Grupo)</li>);
    }

    if (
      commissionDistributionCarrer.findIndex((item) => item.length === 0) !== -1
    ) {
      hasError = true;
      messages.push(<li>% Comissao (Carreira)</li>);
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
    commissionDistributionSpheres,
    commissionDistributionGroup,
    commissionDistributionCarrer,
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
          createUser,
          commissionDistributionSpheres.map((item) =>
            Number(Filters.clearStringOnlyNumbers(item))
          ),
          commissionDistributionGroup.map((item) =>
            Number(Filters.clearStringOnlyNumbers(item))
          ),
          commissionDistributionCarrer.map((item) =>
            Number(Filters.clearStringOnlyNumbers(item))
          ),
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
    createUser,
    commissionDistributionSpheres,
    commissionDistributionGroup,
    commissionDistributionCarrer,
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
            <div className={styles.row}>
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
                <div className={styles.label}>Possui comissão?</div>
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

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <Tooltip
                  placement="top"
                  title={
                    "Gera Usuário ao realizar a compra deste produto? (Ex: NPAC Box)"
                  }
                >
                  <div className={styles.labelWithIcon}>
                    Gera Usuário? <HelpCircleIcon size={14} />
                  </div>
                </Tooltip>
                <InputSimpleSelect
                  disableOptionZero
                  data={createUserOptions}
                  onChange={(e) => {
                    setCreateUser(e.target.value === "1");
                  }}
                  value={createUser ? "1" : "2"}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <div className={styles.label}>
                  Porcentagem da Comissão (Esferas)
                </div>
                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <div className={styles.label}>1º Nível</div>
                    <InputTextSimple
                      name="commissionDistributionSpheres0"
                      value={commissionDistributionSpheres[0]}
                      placeholder="Insira a porcentagem (%)"
                      onFocus={(e) =>
                        handleCommisionMask(
                          commissionDistributionSpheres,
                          setCommissionDistributionSpheres,
                          0,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          ""
                        )
                      }
                      onBlur={(e) =>
                        handleCommisionMask(
                          commissionDistributionSpheres,
                          setCommissionDistributionSpheres,
                          0,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          "%"
                        )
                      }
                      onChange={(e) =>
                        handleCommisionField(
                          commissionDistributionSpheres,
                          setCommissionDistributionSpheres,
                          0,
                          Filters.clearStringOnlyNumbers(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.label}>2º Nível</div>
                    <InputTextSimple
                      name="commissionDistributionSpheres1"
                      value={commissionDistributionSpheres[1]}
                      placeholder="Insira a porcentagem (%)"
                      onFocus={(e) =>
                        handleCommisionMask(
                          commissionDistributionSpheres,
                          setCommissionDistributionSpheres,
                          1,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          ""
                        )
                      }
                      onBlur={(e) =>
                        handleCommisionMask(
                          commissionDistributionSpheres,
                          setCommissionDistributionSpheres,
                          1,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          "%"
                        )
                      }
                      onChange={(e) =>
                        handleCommisionField(
                          commissionDistributionSpheres,
                          setCommissionDistributionSpheres,
                          1,
                          Filters.clearStringOnlyNumbers(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.label}>3º Nível</div>
                    <InputTextSimple
                      name="commissionDistributionSpheres2"
                      value={commissionDistributionSpheres[2]}
                      placeholder="Insira a porcentagem (%)"
                      onFocus={(e) =>
                        handleCommisionMask(
                          commissionDistributionSpheres,
                          setCommissionDistributionSpheres,
                          2,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          ""
                        )
                      }
                      onBlur={(e) =>
                        handleCommisionMask(
                          commissionDistributionSpheres,
                          setCommissionDistributionSpheres,
                          2,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          "%"
                        )
                      }
                      onChange={(e) =>
                        handleCommisionField(
                          commissionDistributionSpheres,
                          setCommissionDistributionSpheres,
                          2,
                          Filters.clearStringOnlyNumbers(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <div className={styles.label}>
                  Porcentagem da Comissão (Grupo)
                </div>
                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <div className={styles.label}>1º Nível</div>
                    <InputTextSimple
                      name="commissionDistributionGroup0"
                      value={commissionDistributionGroup[0]}
                      placeholder="Insira a porcentagem (%)"
                      onFocus={(e) =>
                        handleCommisionMask(
                          commissionDistributionGroup,
                          setCommissionDistributionGroup,
                          0,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          ""
                        )
                      }
                      onBlur={(e) =>
                        handleCommisionMask(
                          commissionDistributionGroup,
                          setCommissionDistributionGroup,
                          0,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          "%"
                        )
                      }
                      onChange={(e) =>
                        handleCommisionField(
                          commissionDistributionGroup,
                          setCommissionDistributionGroup,
                          0,
                          Filters.clearStringOnlyNumbers(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.label}>2º Nível</div>
                    <InputTextSimple
                      name="commissionDistributionGroup1"
                      value={commissionDistributionGroup[1]}
                      placeholder="Insira a porcentagem (%)"
                      onFocus={(e) =>
                        handleCommisionMask(
                          commissionDistributionGroup,
                          setCommissionDistributionGroup,
                          1,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          ""
                        )
                      }
                      onBlur={(e) =>
                        handleCommisionMask(
                          commissionDistributionGroup,
                          setCommissionDistributionGroup,
                          1,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          "%"
                        )
                      }
                      onChange={(e) =>
                        handleCommisionField(
                          commissionDistributionGroup,
                          setCommissionDistributionGroup,
                          1,
                          Filters.clearStringOnlyNumbers(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.label}>3º Nível</div>
                    <InputTextSimple
                      name="commissionDistributionGroup2"
                      value={commissionDistributionGroup[2]}
                      placeholder="Insira a porcentagem (%)"
                      onFocus={(e) =>
                        handleCommisionMask(
                          commissionDistributionGroup,
                          setCommissionDistributionGroup,
                          2,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          ""
                        )
                      }
                      onBlur={(e) =>
                        handleCommisionMask(
                          commissionDistributionGroup,
                          setCommissionDistributionGroup,
                          2,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          "%"
                        )
                      }
                      onChange={(e) =>
                        handleCommisionField(
                          commissionDistributionGroup,
                          setCommissionDistributionGroup,
                          2,
                          Filters.clearStringOnlyNumbers(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <div className={styles.label}>
                  Porcentagem da Comissão (Carreira)
                </div>
                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <div className={styles.label}>1º Nível</div>
                    <InputTextSimple
                      name="commissionDistributionCarrer0"
                      value={commissionDistributionCarrer[0]}
                      placeholder="Insira a porcentagem (%)"
                      onFocus={(e) =>
                        handleCommisionMask(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          0,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          ""
                        )
                      }
                      onBlur={(e) =>
                        handleCommisionMask(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          0,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          "%"
                        )
                      }
                      onChange={(e) =>
                        handleCommisionField(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          0,
                          Filters.clearStringOnlyNumbers(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.label}>2º Nível</div>
                    <InputTextSimple
                      name="commissionDistributionCarrer1"
                      value={commissionDistributionCarrer[1]}
                      placeholder="Insira a porcentagem (%)"
                      onFocus={(e) =>
                        handleCommisionMask(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          1,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          ""
                        )
                      }
                      onBlur={(e) =>
                        handleCommisionMask(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          1,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          "%"
                        )
                      }
                      onChange={(e) =>
                        handleCommisionField(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          1,
                          Filters.clearStringOnlyNumbers(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.label}>3º Nível</div>
                    <InputTextSimple
                      name="commissionDistributionCarrer2"
                      value={commissionDistributionCarrer[2]}
                      placeholder="Insira a porcentagem (%)"
                      onFocus={(e) =>
                        handleCommisionMask(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          2,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          ""
                        )
                      }
                      onBlur={(e) =>
                        handleCommisionMask(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          2,
                          Filters.clearStringOnlyNumbers(e.target.value),
                          "%"
                        )
                      }
                      onChange={(e) =>
                        handleCommisionField(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          2,
                          Filters.clearStringOnlyNumbers(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>
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
