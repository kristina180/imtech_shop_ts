import Link from "next/link";

import { notPhoto } from "@/utils/constants";
import { IOfferedProducts, IProduct } from "@/utils/types";
import styles from "./Products.module.css";

const Products: React.FC<IOfferedProducts> = ({
  titlefirst,
  products = [],
  amount,
  buttontext,
}) => {
  const list: IProduct[] = products.filter((_, i) => i < amount);

  function makeTitle(text: string) {
    let arr_title = text.split(" ").slice(0, 4);
    if (arr_title[3] == "-") {
      arr_title.pop();
    }
    return arr_title.join(" ");
  }

  return (
    <div className={styles.products}>
      {titlefirst && <div className={styles.titlefirst}>{titlefirst}</div>}

      <div className={styles.list}>
        {list.map(({ id, images, title, price }) => (
          <Link href={`/product/${id}`} key={id} className={styles.linkproduct}>
            <div className={styles.divimage}>
              <img
                src={images[0]}
                alt=""
                width={170}
                height={170}
                className={styles.image}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = notPhoto;
                }}
              />
            </div>

            <div className={styles.wrapper}>
              <h3 className={styles.title}>{makeTitle(title)}</h3>
              <div className={styles.price}>{`${price}$`}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
