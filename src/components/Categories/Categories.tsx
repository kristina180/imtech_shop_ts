"use client";

import Link from "next/link";

import { notPhoto } from "@/utils/constants";
import { IPropsForCategories } from "@/utils/types";
import styles from "./Categories.module.css";

const Categories: React.FC<IPropsForCategories> = ({
  titlefirst,
  products = [],
}) => {
  return (
    <section className={styles.section}>
      {titlefirst && <div className={styles.titlefirst}>{titlefirst}</div>}
      {products.length > 0 && (
        <div className={styles.list}>
          {products.map((product) => {
            const image = product?.images?.[0] || notPhoto;

            const category_name = product
              ? product.category.name
              : "error_category";

            return (
              <Link
                key={product?.id}
                href={`/category/${category_name.toLocaleLowerCase()}`}
                className={styles.linkcategories}
              >
                <div className={styles.divimage}>
                  <img
                    src={image}
                    alt={`Category ${category_name}`}
                    width={170}
                    height={170}
                    className={styles.image}
                  />
                </div>

                <div className={styles.title}>{category_name}</div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Categories;
