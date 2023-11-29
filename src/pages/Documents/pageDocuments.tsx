import { useContext, useEffect } from "react";
import { Documents } from "../../components/documents/documents";
import styles from "./styleDocumentPage.module.scss";
import { ContextApi } from "../../contexts";

export function PageDocuments(): JSX.Element {
  const { getAllDocuments, documents } = useContext(ContextApi);
  console.log(documents);
  useEffect(() => {
    getAllDocuments();
  }, [getAllDocuments]);
  return (
    <div className={styles.containerDocuments}>
      {documents &&
        documents?.map((document) => <Documents document={document} />)}
    </div>
  );
}
