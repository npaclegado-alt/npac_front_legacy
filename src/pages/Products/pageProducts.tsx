import { useContext, useEffect } from "react";
import { Products } from "../../components/products/products";

import styles from "./styleProductPage.module.scss";
import { ContextApi } from "../../contexts";

export function PageProducts(): JSX.Element {
  const {
    getAllProducts,
    products,
    user
  } = useContext(ContextApi);

  useEffect(() => {
    getAllProducts();
  }, []);

    return (
        <div className={styles.containerProducts}>
            {
               products && products?.map((product) => (
                    <Products
                      key={product?._id}
                      name={product?.name}
                      value={product?.price}
                      auffs={product?.auff ?? 0}
                      image={product?.imageUrls[0]}
                      link={product?._id}
                    />
                  ))
            }
        </div>
    );
}
