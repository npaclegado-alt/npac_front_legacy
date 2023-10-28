/**
 * 
 * @param value 
 * @returns 
 */

const clearStringOnlyNumbers = (value: any) => String(value).replace(/\D/g, '');

const convertMoneyTextMask = (value: any ) => {
    if (value) {
      const stringOnlyNumbers = `${Number(value).toFixed(2)}`.replace(/\D/g, '');
      if (!stringOnlyNumbers) {
        return 'R$ 0,00';
      }
  
      const { length } = stringOnlyNumbers;
  
      if (length === 1) {
        return value >= 0
          ? `R$ 0,0${stringOnlyNumbers}`
          : `R$ -0,0${stringOnlyNumbers}`;
      }
      if (length === 2) {
        return value >= 0
          ? `R$ 0,${stringOnlyNumbers}`
          : `R$ -0,${stringOnlyNumbers}`;
      }
      let moneyMask = '';
  
      for (let i = length - 1; i >= 0; i -= 1) {
        if (i === length - 2) {
          moneyMask = `,${stringOnlyNumbers[i]}${moneyMask}`;
        } else if (i < length - 5 && (i - length - 3) % 3 === 0) {
          moneyMask = `${stringOnlyNumbers[i]}.${moneyMask}`;
        } else {
          moneyMask = `${stringOnlyNumbers[i]}${moneyMask}`;
        }
      }
  
      return value >= 0 ? `R$ ${moneyMask}` : `R$ -${moneyMask}`;
    }
    return 'R$ 0,00';
  };

  const convertMoneyInputMask = (value: any) => {
    if (value) {
      let mask = `${value}`.replace(/\D/g, '');
  
      if (!mask || Number(mask) <= 0) {
        return '';
      }
  
      const contador = (value.length - 5) / 3;
  
      mask = mask.replace(/^([.\d]+)(\d{2})$/, '$1,$2');
      for (let i = 0; i < contador; i += 1) {
        mask = mask.replace(/(\d+)(\d{3})([.,\d]+)$/, '$1.$2$3');
      }
  
      mask = `R$ ${mask}`;
      return mask;
    }
  
    return value;
  };

  const removeMoneyMask = (value: any) => {
    const stringValue = `${value}`.replace(/\D/g, '');
    if (stringValue.length === 1) {
      return parseFloat((value < 0 ? '-' : '') + `0.0${stringValue}`);
    }
    if (stringValue.length === 2) {
      return parseFloat((value < 0 ? '-' : '') + `0.${stringValue}`);
    }
  
    return parseFloat(stringValue.replace(/(\d+)(\d{2})$/, '$1.$2'));
  };


  export default {
    convertMoneyTextMask,
    convertMoneyInputMask,
    removeMoneyMask,
    clearStringOnlyNumbers
  }