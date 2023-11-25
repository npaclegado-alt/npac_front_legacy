import React from 'react';

import styles from './styleInputText.module.scss';

interface InputTextSimpleProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

export function InputTextSimple(props: InputTextSimpleProps): JSX.Element {
  const { name, ...rest } = props;

  return (
    <>
      <input 
        className={styles.container}
        type="text" 
        id={name}  
        {...rest} 
      />
    </>
  );
}