import React from 'react';
import styles from '../stylesProdDetails.module.scss';

interface ProductImageGalleryProps {
    imgProduct: string[];
    nextIndex: number;
    setNextIndex: (index: number) => void;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ imgProduct, nextIndex, setNextIndex }) => {
    return (
        <div className={styles.contentImages}>
            <img className={styles.imgProduct} src={imgProduct[nextIndex]} alt="Product" />
            {imgProduct.map((img, index) => (
                <img
                    key={index}
                    className={styles.imgProductMini}
                    style={index === nextIndex ? { padding: '2px' } : {}}
                    onClick={() => setNextIndex(index)}
                    src={img}
                    alt="Product"
                />
            ))}
        </div>
    );
};

export default ProductImageGallery;
