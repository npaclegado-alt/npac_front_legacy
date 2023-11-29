import { Divider } from "../divider";

import styles from "./styleDocument.module.scss";
import Filters from "../../libs/Filters";
import { Download, Expand, Maximize } from "lucide-react";
import { useCallback } from "react";

interface DocumentProps {
  document: any;
}
export function Documents({ document }: DocumentProps): JSX.Element {
  const navigateToLink = useCallback((url: string) => {
    window.open(url);
  }, []);
  return (
    <div className={styles.contentDocument}>
      <div className={styles.boxHeaderDocument}>
        <h4>{document.name}</h4>
        <div className={styles.boxValue}>
          <p>{document.description}</p>
        </div>
      </div>
      <Divider />
      <div className={styles.actions}>
        {/* <div
          onClick={() => navigateToLink(document.fileUrl)}
          className={styles.boxValueAction}
        >
          <Maximize />
          <p>Visualizar Documento</p>
        </div> */}
        <div
          onClick={() => navigateToLink(document.fileUrl)}
          className={styles.boxValueAction}
        >
          <Download />
          <p>Baixar Documento</p>
        </div>
      </div>
    </div>
  );
}
