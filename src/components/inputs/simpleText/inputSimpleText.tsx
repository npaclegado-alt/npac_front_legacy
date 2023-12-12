import React from 'react';

import styles from './styleInputText.module.scss';

interface InputTextSimpleProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    required?: boolean;
}

export function InputTextSimple(props: InputTextSimpleProps): JSX.Element {
  const { name, required, ...rest } = props;

  return (
    <>
      <input 
        className={styles.container}
        type="text" 
        id={name}  
        required={required}
        {...rest} 
      />
    </>
  );
}