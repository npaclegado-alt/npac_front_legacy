import React, { 
    useContext, 
    useState,
    useEffect 
} from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Space, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

import styles from './styles.module.scss';
import { ContextApi, IFile } from '../../contexts';
import { IDocsResponse } from '../../contexts/interfaces';

type IType = 'PERSONAL' | 'GENERAL';
type IName = 'comprovanteIdentidade' | 'comprovanteEndereco';

interface IUploadButtonWithPreviewProps {
    titleButton: string;
    name: IName;
    type: IType;
    documents: IDocsResponse[] | null;
}


const UploadButtonWithPreview: React.FC<IUploadButtonWithPreviewProps> = ({
    titleButton, 
    name, 
    type,
    documents
}) => {
    const {
        sendDocumentsRequest,
        user,
        removeFile,
    } = useContext(ContextApi);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const changeFile: UploadProps['onChange'] = async ({fileList: file}) => {
        setFileList(file);       
        file.map((docs) => {
            if (docs.percent === 100) {
                return sendDocumentsRequest(type, docs.name, name, docs.originFileObj as RcFile, user?._id ?? '');
            }
        });
    }

    useEffect(() => {
        if (documents) {
            let findDocumentCategory = documents.filter((doc) => doc.description === name);
            if (findDocumentCategory.length > 0) {
                setFileList(findDocumentCategory.map((doc) => {
                    return {
                        uid: doc._id,
                        name: doc.name,
                        status: 'done',
                        url: doc.fileUrl,
                    }
                }));
            }
        }
    }, [documents]);

    const removeDocument = (file: UploadFile) => {
        const keyRemove = file?.url?.split('stage/')[1];
        if (user) {
            removeFile(keyRemove ?? '');
        }
    }
    
    return (
        <Space 
          direction="vertical" 
          style={{ 
              width: '90%', 
              alignItems: 'center', 
              justifyContent: 'center' 
          }} 
          size="middle"
          >
          <Upload
              name={name}
              listType="picture"
              maxCount={2}
              onChange={changeFile}
              onRemove={removeDocument}
              customRequest={(e) => {
                if (e.onSuccess) e.onSuccess(e);
              }}
              multiple
              fileList={[...fileList]}
          >
              <button 
                  type="button"
                  className={styles.buttonWithPreview}
              >
                <span>{titleButton}</span>
                <UploadOutlined />
              </button>
          </Upload>
        </Space>
    );
}

export default UploadButtonWithPreview;