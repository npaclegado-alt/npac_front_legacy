import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContextApi } from '../../contexts';
import ProductDetailsHeader from './domain/ProductDetailsHeader';
import ProductImageGallery from './domain/ProductImageGallery';
import ProductDetailsContent from './domain/ProductDetailsContent';
import styles from './stylesProdDetails.module.scss';
import _debounce from 'lodash/debounce';


const initialState = {
  name: '',
  cpf: '',
  email: '',
  phone: '',
  cep: '',
  logradouro: '',
  numero: '',
  bairro: '',
  complemento: '',
  referencia: '',
  stateSelected: 0,
  citiesSelected: 0,
};

const PageProductsDetails = () => {
  const {
    productsById,
    productFiltered,
    getAdressByPostalCode,
    adress,
    getAllStates,
    ufs,
    getCitiesByUf,
    cities,
    startTransaction
  } = useContext(ContextApi);

  const { productId } = useParams();
  const [nextIndex, setNextIndex] = useState(0);
  const [formData, setFormData] = useState(initialState);
  
  const decoderProductId = atob(productId as string);
  const imgProduct = productFiltered?.imageUrls ?? [];
  const currentScreen = window.innerWidth;

  const fetchDataDebounced = _debounce((cepString) => {
    if (cepString.length > 8) {
      getAdressByPostalCode(cepString);
    }
  }, 1000);

  const changeWidthInput = (value: number, defaultWidth: string) => {
    const widthMap = {
      '49%': value < 1024 && value > 557,
      '99%': value <= 557,
      [defaultWidth]: true,
    };

    const width = Object.keys(widthMap).find((key) => widthMap[key]) || defaultWidth;

    return {
      width,
      marginBottom: '10px',
    };
  };


  const setStatesAndCitiesByAdress = () => {
    const state = ufs?.find((item) => item.sigla === adress?.uf);
    const city = cities?.find((item) => item.nome === adress?.localidade);
    setFormData(prevData => ({
      ...prevData,
      stateSelected: state?.id || 0,
      citiesSelected: city?.id || 0,
      bairro: adress?.bairro || '',
      logradouro: adress?.logradouro || '',
    }));
  };

  useEffect(() => {
    productsById(JSON.parse(decoderProductId)?.productId as string);
    getAllStates();
  }, [productId, getAllStates, productsById]);

  useEffect(() => {
    if (adress?.uf) {
      setStatesAndCitiesByAdress();
    }
  }, [adress, cities]);

  useEffect(() => {
    if (formData.cep.length < 8) {
      const cepString = formData.cep.replace(/\D/g, '');
      fetchDataDebounced(cepString);
    }
  }, [fetchDataDebounced]);



  return (
    <div className={styles.container}>
      <ProductDetailsHeader title="Plano NPAC" />
      <div className={styles.containerDetails}>
        <ProductImageGallery
          imgProduct={imgProduct}
          nextIndex={nextIndex}
          setNextIndex={setNextIndex}
        />
        <ProductDetailsContent
          product={productFiltered}
          formData={formData}
          currentScreen={currentScreen}
          changeWidthInput={changeWidthInput}
          onOptionsUpdate={(data) => setFormData((prevData) => ({ ...prevData, ...data, citiesSelected: Number(data?.citiesSelected) }))}
          getAdressByPostalCode={getAdressByPostalCode}
          ufs={ufs}
          getCitiesByUf={getCitiesByUf}
          cities={cities}
          onProceed={startTransaction}
          saleIdentification={productId ?? ''}
        />
      </div>
    </div>
  );
};

export { PageProductsDetails };


