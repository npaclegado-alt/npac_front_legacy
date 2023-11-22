import { Documents } from "../../components/documents/documents";
import styles from "./styleDocumentPage.module.scss";

export function PageDocuments(): JSX.Element {
  const documents: any[] = [
    {
      title: "Documento",
      id: 1,
      description: "Desc Documento",
      url: "https://google.com",
    },
    {
      title: "Documento 2",
      id: 2,
      description: "Desc Documento 2",
      url: "https://google.com",
    },
    {
      title: "Documento 3",
      id: 3,
      description: "Desc Documento 3",
      url: "https://google.com",
    },
    {
      title: "Documento 4",
      id: 4,
      description: "Desc Documento 4",
      url: "https://google.com",
    },
  ];
  return (
    <div className={styles.containerDocuments}>
      {documents &&
        documents?.map((document) => <Documents document={document} />)}
    </div>
  );
}
