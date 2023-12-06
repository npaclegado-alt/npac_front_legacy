import React, { useContext, useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { ContextApi } from '../../contexts';
import { IFilesResponse } from '../../contexts/interfaces';
import { get } from 'lodash';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IDragUploaderProps {
  avatar: IFilesResponse | null;
}

const DragUploader: React.FC<IDragUploaderProps> = ({ avatar }) => {
  const {
    user,
    editAvatar,
    removeFile,
    getFiles,
  } = useContext(ContextApi);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (avatar) {
      setFileList([{
        uid: avatar?._id,
        name: avatar?.name ?? '',
        status: 'done',
        url: avatar?.path ?? '',
      }]);
    }
  }, [avatar]);
  const handleCancel = () => {
    setPreviewOpen(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const removeAvatar = async (file: UploadFile) => {
    const keyRemove = file?.url?.split('stage/')[1];
    if (user) {
      await removeFile(keyRemove ?? '');
    }
  }

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
      const file = newFileList[0]?.originFileObj;
      setFileList(newFileList);
      setTimeout(() => {
        if (newFileList[0]?.percent === 100) {
            editAvatar(user?._id ?? '', file as RcFile);           
        }
      }, 800);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  
  return (
    <>
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={removeAvatar}
        customRequest={(e) => {
          if (e.onSuccess) e.onSuccess(e);
        }}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default DragUploader;
