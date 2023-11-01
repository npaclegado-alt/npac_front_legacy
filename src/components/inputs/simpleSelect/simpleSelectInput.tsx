import React from 'react';

import styles from './styleSelect.module.scss';

interface InputSelectSimple extends React.InputHTMLAttributes<HTMLSelectElement> {
    data: string[];
}

export function InputSimpleSelect(props: InputSelectSimple): JSX.Element {
    const { data, ...rest } = props;
    return (
        <>
            <select 
                className={styles.inputSelect}
                {...rest}
            >
                <option value="1">Selecione seu estado</option>
                <option value="2">2</option>
            </select>
        </>
    )
}