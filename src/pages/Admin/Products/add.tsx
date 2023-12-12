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
import { Checkbox, Tooltip, Upload, UploadFile, UploadProps } from "antd";
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
    getAllProductImages,
    productImages,
    editProductRequest,
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
  const [createUser, setCreateUser] = useState(false);
  const [directCommissionValue, setDirectCommissionValue] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [digitalProduct, setDigitalProduct] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const [recurrence, setRecurrence] = useState("");
  const [isCademi, setIsCademi] = useState(false);
  const [entregaCademi, setEntregaCademi] = useState("");

  useEffect(() => () => clearProductFiltered(), [clearProductFiltered]);

  useEffect(() => {
    if (productId) {
      productsById(productId);
      getAllProductImages(productId);
    }
  }, [getAllProductImages, productId, productsById]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(Filters.convertMoneyTextMask(initialData.price));
      setAuff(String(initialData.auff));
      setIsCommissionable(initialData.isCommissionable);
      setCommissionType(initialData.commissionType ?? "");
      setCreateUser(initialData.createUser);
      setCommissionDistributionSpheres(
        initialData.commissionDistributionSpheres
          ? initialData.commissionDistributionSpheres.map((item) =>
              String(item)
            )
          : ["", "", ""]
      );
      setCommissionDistributionGroup(
        initialData.commissionDistributionGroup
          ? initialData.commissionDistributionGroup.map((item) => String(item))
          : ["", "", ""]
      );
      setCommissionDistributionCarrer(
        initialData.commissionDistributionCarrer.map((item) => String(item))
      );
      setDirectCommissionValue(
        initialData.directCommissionValue
          ? Filters.convertMoneyTextMask(initialData.directCommissionValue)
          : ""
      );
      setWeight(String(initialData.shippingValues?.weight ?? ""));
      setWidth(String(initialData.shippingValues?.width ?? ""));
      setHeight(String(initialData.shippingValues?.height ?? ""));
      setLength(String(initialData.shippingValues?.length ?? ""));
      setRecurrence(initialData.recurrence);
      setIsCademi(initialData?.isCademi ?? false);
      setEntregaCademi(initialData?.cademiKey ?? "");
      setFreeShipping(initialData.freeShipping);
      setDigitalProduct(initialData.digitalProduct);
    }
    if (productImages) {
      setFileList(
        productImages.map((item) => {
          return {
            ...item,
            url: item.path,
          };
        }) as any
      );
    }
  }, [initialData, productImages]);

  const commissionTypeOptions = [
    { id: "esfera", nome: "Esfera" },
    { id: "grupo", nome: "Grupo" },
    { id: "ambos", nome: "Ambos" },
  ];

  const recurrenceOptions = [
    { id: "nenhuma", nome: "Nenhuma" },
    { id: "mensal", nome: "Mensal" },
    { id: "anual", nome: "Anual" },
  ];

  const digitalProductOptions = [
    { id: 1, nome: "Produto Digital" },
    { id: 2, nome: "Produto físico" },
  ];

  const yesOrNotOptions = [
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
      messages.push(<li>AUFFS</li>);
    }
    if (recurrence?.length === 0 || recurrence === "0") {
      hasError = true;
      messages.push(<li>Tipo de recorrencia</li>);
    }

    if (entregaCademi.length === 0) {
      hasError = true;
      messages.push(<li>Entrega CADEMI</li>);
    }
    if (commissionType.length === 0 || commissionType === "0") {
      hasError = true;
      messages.push(<li>Tipo de comissão</li>);
    }
    if (isCommissionable && directCommissionValue === "") {
      hasError = true;
      messages.push(<li>Valor da comissão direta</li>);
    }

    if (
      (commissionType === "esfera" || commissionType === "ambos") &&
      commissionDistributionSpheres.findIndex((item) => item.length === 0) !==
        -1
    ) {
      hasError = true;
      messages.push(<li>% Comissao (Esferas)</li>);
    }

    if (
      (commissionType === "grupo" || commissionType === "ambos") &&
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

    if (!digitalProduct && width.length === 0) {
      hasError = true;
      messages.push(<li>Largura</li>);
    }

    if (!digitalProduct && height.length === 0) {
      hasError = true;
      messages.push(<li>Altura</li>);
    }

    if (!digitalProduct && length.length === 0) {
      hasError = true;
      messages.push(<li>Comprimento</li>);
    }

    if (!digitalProduct && weight.length === 0) {
      hasError = true;
      messages.push(<li>Peso</li>);
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
    description,
    fileList,
    isCommissionable,
    name,
    price,
    commissionDistributionSpheres,
    commissionDistributionGroup,
    commissionDistributionCarrer,
    directCommissionValue,
    weight,
    height,
    width,
    length,
    commissionType,
    digitalProduct,
    recurrence,
    entregaCademi
  ]);

  const handleSubmit = useCallback(() => {
    console.log("entrou", entregaCademi);
    if (validateFields()) {
      const files: File[] = fileList
        .filter((item) => !!item?.response?.file)
        .map((item) => item.response.file);
      if (productId) {
        const newFiles = [...files];
        const updatedOldFilesIds = fileList
          .filter((item) => !item?.response?.file)
          .map((item: any) => item._id);
        const removedFiles = [...productImages].filter(
          (item) => !updatedOldFilesIds.includes(item._id)
        );
        editProductRequest({
          id: productId,
          name,
          description,
          price: Filters.removeMoneyMask(price),
          auff: Number(auff),
          createUser,
          commissionDistributionSpheres:
            commissionType === "esfera" || commissionType === "ambos"
              ? commissionDistributionSpheres.map((item) =>
                  Number(Filters.clearStringOnlyNumbersWithDots(item))
                )
              : undefined,
          commissionDistributionGroup:
            commissionType === "grupo" || commissionType === "ambos"
              ? commissionDistributionGroup.map((item) =>
                  Number(Filters.clearStringOnlyNumbersWithDots(item))
                )
              : undefined,
          commissionDistributionCarrer: commissionDistributionCarrer.map(
            (item) => Number(Filters.clearStringOnlyNumbersWithDots(item))
          ),
          commissionType,
          shippingValues: digitalProduct
            ? undefined
            : {
                height: Number(height),
                weight: Number(weight),
                width: Number(width),
                length: Number(length),
              },
          newFiles,
          removedFiles,
          isCommissionable,
          directCommissionValue: isCommissionable
            ? Filters.removeMoneyMask(directCommissionValue)
            : undefined,
          digitalProduct,
          freeShipping: digitalProduct ? true : freeShipping,
          recurrence,
          isCademi: isCademi,
          cademiKey: entregaCademi
        });
      } else {
        addProductRequest({
          name,
          description,
          price: Filters.removeMoneyMask(price),
          auff: Number(auff),
          files,
          createUser,
          commissionDistributionSpheres:
            commissionType === "esfera" || commissionType === "ambos"
              ? commissionDistributionSpheres.map((item) =>
                  Number(Filters.clearStringOnlyNumbersWithDots(item))
                )
              : undefined,
          commissionDistributionGroup:
            commissionType === "grupo" || commissionType === "ambos"
              ? commissionDistributionGroup.map((item) =>
                  Number(Filters.clearStringOnlyNumbersWithDots(item))
                )
              : undefined,
          commissionDistributionCarrer: commissionDistributionCarrer.map(
            (item) => Number(Filters.clearStringOnlyNumbersWithDots(item))
          ),
          commissionType,
          shippingValues: {
            height: Number(height),
            weight: Number(weight),
            width: Number(width),
            length: Number(length),
          },
          isCommissionable,
          directCommissionValue: isCommissionable
            ? Filters.removeMoneyMask(directCommissionValue)
            : undefined,
          digitalProduct,
          freeShipping: digitalProduct ? true : freeShipping,
          recurrence,
          isCademi: isCademi,
          cademiKey: entregaCademi
        });
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
    directCommissionValue,
    weight,
    width,
    height,
    length,
    productImages,
    editProductRequest,
    digitalProduct,
    freeShipping,
    recurrence,
  ]);

  const changeCademi = useCallback(() => {
    setIsCademi(!isCademi);
  }, [isCademi]);

  return (
    <div className={styles.container}>
      {productId && !initialData && !productImages ? (
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
                  placeholder="Insira o nome"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <div className={styles.label}>Descrição</div>
                <InputTextSimple
                  name="description"
                  value={description}
                  placeholder="Insira a descrição"
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
                  placeholder="Insira o preço"
                  onChange={(e) =>
                    setPrice(Filters.convertMoneyInputMask(e.target.value))
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <div className={styles.label}>AUFFS</div>
                <InputTextSimple
                  name="auff"
                  value={auff}
                  placeholder="Insira os auffs"
                  onChange={(e) =>
                    setAuff(
                      String(
                        Filters.clearStringOnlyNumbersWithDots(e.target.value)
                      )
                    )
                  }
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.label}>Tipo de recorrencia</div>
              <InputSimpleSelect
                data={recurrenceOptions}
                onChange={(e) => {
                  setRecurrence(e.target.value);
                }}
                value={recurrence}
              />
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
                    Gera usuário? <HelpCircleIcon size={14} />
                  </div>
                </Tooltip>
                <InputSimpleSelect
                  disableOptionZero
                  data={yesOrNotOptions}
                  onChange={(e) => {
                    setCreateUser(e.target.value === "1");
                  }}
                  value={createUser ? "1" : "2"}
                />
              </div>
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
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <div className={styles.label}>Possui comissão direta?</div>
                <InputSimpleSelect
                  disableOptionZero
                  data={yesOrNotOptions}
                  onChange={(e) => {
                    setIsCommissionable(e.target.value === "1");
                  }}
                  value={isCommissionable ? "1" : "2"}
                />
              </div>
              {isCommissionable && (
                <div className={styles.formGroup}>
                  <div className={styles.label}>Valor da comissão direta</div>
                  <InputTextSimple
                    name="directCommissionValue"
                    value={directCommissionValue}
                    placeholder="Insira o valor da comissão direta"
                    onChange={(e) =>
                      setDirectCommissionValue(
                        Filters.convertMoneyInputMask(e.target.value)
                      )
                    }
                  />
                </div>
              )}
            </div>

            {(commissionType === "esfera" || commissionType === "ambos") && (
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
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            ),
                            ""
                          )
                        }
                        onBlur={(e) =>
                          handleCommisionMask(
                            commissionDistributionSpheres,
                            setCommissionDistributionSpheres,
                            0,
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            ),
                            "%"
                          )
                        }
                        onChange={(e) =>
                          handleCommisionField(
                            commissionDistributionSpheres,
                            setCommissionDistributionSpheres,
                            0,
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            )
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
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            ),
                            ""
                          )
                        }
                        onBlur={(e) =>
                          handleCommisionMask(
                            commissionDistributionSpheres,
                            setCommissionDistributionSpheres,
                            1,
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            ),
                            "%"
                          )
                        }
                        onChange={(e) =>
                          handleCommisionField(
                            commissionDistributionSpheres,
                            setCommissionDistributionSpheres,
                            1,
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            )
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
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            ),
                            ""
                          )
                        }
                        onBlur={(e) =>
                          handleCommisionMask(
                            commissionDistributionSpheres,
                            setCommissionDistributionSpheres,
                            2,
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            ),
                            "%"
                          )
                        }
                        onChange={(e) =>
                          handleCommisionField(
                            commissionDistributionSpheres,
                            setCommissionDistributionSpheres,
                            2,
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(commissionType === "grupo" || commissionType === "ambos") && (
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
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            ),
                            ""
                          )
                        }
                        onBlur={(e) =>
                          handleCommisionMask(
                            commissionDistributionGroup,
                            setCommissionDistributionGroup,
                            0,
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            ),
                            "%"
                          )
                        }
                        onChange={(e) =>
                          handleCommisionField(
                            commissionDistributionGroup,
                            setCommissionDistributionGroup,
                            0,
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            )
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
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            ),
                            ""
                          )
                        }
                        onBlur={(e) =>
                          handleCommisionMask(
                            commissionDistributionGroup,
                            setCommissionDistributionGroup,
                            1,
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            ),
                            "%"
                          )
                        }
                        onChange={(e) =>
                          handleCommisionField(
                            commissionDistributionGroup,
                            setCommissionDistributionGroup,
                            1,
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            )
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
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            ),
                            ""
                          )
                        }
                        onBlur={(e) =>
                          handleCommisionMask(
                            commissionDistributionGroup,
                            setCommissionDistributionGroup,
                            2,
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            ),
                            "%"
                          )
                        }
                        onChange={(e) =>
                          handleCommisionField(
                            commissionDistributionGroup,
                            setCommissionDistributionGroup,
                            2,
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                          Filters.clearStringOnlyNumbersWithDots(
                            e.target.value
                          ),
                          ""
                        )
                      }
                      onBlur={(e) =>
                        handleCommisionMask(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          0,
                          Filters.clearStringOnlyNumbersWithDots(
                            e.target.value
                          ),
                          "%"
                        )
                      }
                      onChange={(e) =>
                        handleCommisionField(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          0,
                          Filters.clearStringOnlyNumbersWithDots(e.target.value)
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
                          Filters.clearStringOnlyNumbersWithDots(
                            e.target.value
                          ),
                          ""
                        )
                      }
                      onBlur={(e) =>
                        handleCommisionMask(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          1,
                          Filters.clearStringOnlyNumbersWithDots(
                            e.target.value
                          ),
                          "%"
                        )
                      }
                      onChange={(e) =>
                        handleCommisionField(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          1,
                          Filters.clearStringOnlyNumbersWithDots(e.target.value)
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
                          Filters.clearStringOnlyNumbersWithDots(
                            e.target.value
                          ),
                          ""
                        )
                      }
                      onBlur={(e) =>
                        handleCommisionMask(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          2,
                          Filters.clearStringOnlyNumbersWithDots(
                            e.target.value
                          ),
                          "%"
                        )
                      }
                      onChange={(e) =>
                        handleCommisionField(
                          commissionDistributionCarrer,
                          setCommissionDistributionCarrer,
                          2,
                          Filters.clearStringOnlyNumbersWithDots(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <div className={styles.label}>Tipo de produto</div>
                <InputSimpleSelect
                  disableOptionZero
                  data={digitalProductOptions}
                  onChange={(e) => {
                    setDigitalProduct(e.target.value === "1");
                  }}
                  value={digitalProduct ? "1" : "2"}
                />
              </div>
              {!digitalProduct && (
                <div className={styles.formGroup}>
                  <div className={styles.label}>Possui frete grátis?</div>
                  <InputSimpleSelect
                    disableOptionZero
                    data={yesOrNotOptions}
                    onChange={(e) => {
                      setFreeShipping(e.target.value === "1");
                    }}
                    value={freeShipping ? "1" : "2"}
                  />
                </div>
              )}
            </div>

            {!digitalProduct && (
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <div className={styles.label}>Dimensões</div>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <div className={styles.label}>Largura</div>
                      <InputTextSimple
                        name="width"
                        value={width}
                        placeholder="Insira a largura"
                        onChange={(e) =>
                          setWidth(
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            )
                          )
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.label}>Altura</div>
                      <InputTextSimple
                        name="height"
                        value={height}
                        placeholder="Insira a altura"
                        onChange={(e) =>
                          setHeight(
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            )
                          )
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.label}>Comprimento</div>
                      <InputTextSimple
                        name="length"
                        value={length}
                        placeholder="Insira o comprimento"
                        onChange={(e) =>
                          setLength(
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            )
                          )
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.label}>Peso</div>
                      <InputTextSimple
                        name="weight"
                        value={weight}
                        placeholder="Insira o peso"
                        onChange={(e) =>
                          setWeight(
                            Filters.clearStringOnlyNumbersWithDots(
                              e.target.value
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.boxCademi}>
              <span className={styles.label}>CADEMI</span>
              <Checkbox
                onChange={changeCademi}
                checked={isCademi}
                className={styles.checkbox}
              >Entrega CADEMI</Checkbox>
            </div>
            {isCademi && (
              <InputTextSimple 
                name="cademi"
                onChange={(e) => setEntregaCademi(e.target.value.replace(' ', ''))}
                value={entregaCademi.replace(' ', '')}
                placeholder="Entrega CADEMI"
                style={{
                  width: '30%'
                }}
              />
            )}

            <div className={styles.formGroup}>
              <div className={styles.label}>Imagens</div>
              <Upload
                listType="picture"
                onChange={handleChange}
                maxCount={10}
                showUploadList={{
                  removeIcon: <Trash size={14} className={styles.icon} />,
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
