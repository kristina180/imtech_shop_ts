import Link from "next/link";
import Image from "next/image";

import { notPhoto } from "@/utils/constants";
import { IPropsForCategories } from "@/utils/types";
import styles from "./Categories.module.css";

const Categories: React.FC<IPropsForCategories> = ({
  titlefirst,
  products = [],
  amount,
  categories = [],
}) => {
  const list: string[] = categories.filter((_, i) => i < amount);

  return (
    <div className={styles.section}>
      {titlefirst && <div className={styles.titlefirst}>{titlefirst}</div>}
      {products.length != 0 && (
        <div className={styles.list}>
          {list.map((categ, index) => {
            const obj = products.find((elem) => elem.category.slug == categ);
            const image = obj ? obj.images[0] : notPhoto;
            return (
              <Link
                key={index}
                href={`/category/${categ}`}
                className={styles.linkcategories}
              >
                <div className={styles.divimage}>
                  <Image
                    src={image}
                    alt=""
                    width={170}
                    height={170}
                    className={styles.image}
                  />
                </div>

                <div className={styles.title}>
                  {categ[0].toUpperCase() + categ.slice(1)}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Categories;
