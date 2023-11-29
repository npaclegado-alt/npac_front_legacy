import React from "react";

import styles from "./styleSelect.module.scss";

interface InputSelectSimple
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  data: any;
  optionZero?: string;
  disableOptionZero?: boolean;
  optionStyle?: any;
}

export function InputSimpleSelect(props: InputSelectSimple): JSX.Element {
  const { data, optionZero, disableOptionZero = false, optionStyle, ...rest } = props;
  return (
    <>
      <select className={styles.inputSelect} {...rest}>
        {!disableOptionZero && <option value="0">{optionZero}</option>}
        {data?.map((item: any) => (
          <option 
            key={item.id} 
            value={item.id}
            style={optionStyle}
          >
            {item.nome}
          </option>
        ))}
      </select>
    </>
  );
}
