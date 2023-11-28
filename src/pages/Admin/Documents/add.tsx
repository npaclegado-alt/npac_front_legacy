import React, { useCallback, useContext, useEffect, useState } from "react";

import styles from "./styleDocuments.module.scss";
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
import { Upload, UploadFile, UploadProps } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddDocuments: React.FC = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const {
    documentById,
    documentFiltered: initialData,
    clearDocumentFiltered,
  } = useContext(ContextApi);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => () => clearDocumentFiltered(), [clearDocumentFiltered]);

  useEffect(() => {
    if (documentId) {
      documentById(documentId);
    }
  }, [documentId, documentById]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.name);
      setFileList([
        {
          ...initialData,
          uid: initialData._id,
          url: initialData.path,
        },
      ]);
    }
  }, [initialData]);

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
  }, [description, fileList, name]);

  const handleSubmit = useCallback(() => {
    if (validateFields()) {
      const files: File[] = fileList.map((item) => item.response.file);
      if (documentId) {
        console.log(name, description, files, documentId);
      } else {
        console.log(name, description, files);
      }
    }
  }, [description, fileList, name, documentId, validateFields]);

  return (
    <div className={styles.container}>
      {documentId && !initialData ? (
        <></>
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.row}>
              <ArrowLeft onClick={() => navigate(-1)} className={styles.icon} />
              <div className={styles.title}>Adicionar Documento</div>
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

export default AddDocuments;
