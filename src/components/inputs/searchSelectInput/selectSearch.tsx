import React from 'react';
import { Select } from 'antd';

import styles from './styleSelectSearch.module.scss';

interface SelectSearchProps {
    options: Array<{ label: string; value: string }>;
    onChangeSelect: (value: string) => void;
}

export function SelectSearch({ options, onChangeSelect }: SelectSearchProps): JSX.Element { 
    const onChange = (value: string) => {
        onChangeSelect(value)
    };
    
    const onSearch = (value: string) => {
      console.log('search:', value);
    };
    
    const filterOption = (input: string, option?: { label: string; value: string }) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Select
            className={styles.inputSelectSearch}
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={options}
        />
    );
}
