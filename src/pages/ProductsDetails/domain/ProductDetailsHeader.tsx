import styles from '../stylesProdDetails.module.scss';

const ProductDetailsHeader = ({ title }: { title: string }) => {
  const titleSplited = title.split(' ');
  return (
    <div className={styles.headerDetails}>
      <h1>
        {titleSplited[0]}
        <p>{titleSplited[1]}</p>
      </h1>
    </div>
  );
};

export default ProductDetailsHeader;
