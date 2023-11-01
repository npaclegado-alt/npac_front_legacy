import React from "react";

import styles from './styleButton.module.scss';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function CustomButton(props: CustomButtonProps): JSX.Element {
  const { children, ...rest } = props;
  return (
    <>
      <button className={styles.button} {...rest}>
        {children}
      </button>
    </>
  );
}