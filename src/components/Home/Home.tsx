"use client";

import Categories from "../Categories/Categories";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import PosterSecond from "../PosterSecond/PosterSecond";

import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { IProduct } from "@/utils/types";

import { notPhoto } from "@/utils/constants";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const { products } = useAppSelector((state) => state.products);
  const { category } = useAppSelector((state) => state.category);

  const list_products: IProduct[] = products.filter((_, i) => i < 5);
  const list_categories: string[] = category.filter((_, i) => i < 5);
  const list_products_category: (IProduct | undefined)[] = list_categories.map(
    (categ) => {
      const product = products.find((elem) => elem.category.slug == categ);

      return product;
    }
  );

  return (
    <div className={styles.page}>
      <Poster />
      <Products products={list_products} titlefirst="Popular" />

      <Categories titlefirst="Worth Seen" products={list_products_category} />
      <PosterSecond />
      <Products products={list_products} titlefirst="New Lots" />
    </div>
  );
};

export default Home;
