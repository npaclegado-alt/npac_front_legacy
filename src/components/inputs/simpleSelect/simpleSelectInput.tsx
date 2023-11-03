import React from 'react';

import styles from './styleSelect.module.scss';

interface InputSelectSimple extends React.InputHTMLAttributes<HTMLSelectElement> {
    data: any;
    optionZero?: string;
}

export function InputSimpleSelect(props: InputSelectSimple): JSX.Element {
    const { data, optionZero, ...rest } = props;
    return (
        <>
            <select 
                className={styles.inputSelect}
                {...rest}
            >
                <option value="0">{optionZero}</option>
                {data?.map((item: any) => (
                    <option key={item.id} value={item.id}>{item.nome}</option>
                ))}
            </select>
        </>
    )
}