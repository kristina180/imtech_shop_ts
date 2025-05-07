"use client";

import Categories from "../Categories/Categories";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import PosterSecond from "../PosterSecond/PosterSecond";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";

import { checkAuth } from "@/store/userSlice";

import styles from "./Home.module.css";

const Home: React.FC = () => {
  const { products } = useAppSelector((state) => state.products);
  const { category } = useAppSelector((state) => state.category);
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const cookies: string | undefined = document.cookie
      .split(";")
      .find((elem) => elem.includes("token"));

    if (!cookies) {
      return;
    } else {
      const token: string = cookies.replace("token=", "");

      if (user == null) {
        dispatch(checkAuth(token));
      }
    }
  }, []);

  return (
    <div className={styles.page}>
      <Poster />
      <Products
        products={products}
        amount={5}
        titlefirst="Popular"
        buttontext="See More"
      />

      <Categories
        titlefirst="Worth Seen"
        products={products}
        amount={5}
        categories={category}
      />
      <PosterSecond />
      <Products
        products={products}
        amount={5}
        titlefirst="New Lots"
        buttontext="See More"
      />
    </div>
  );
};

export default Home;
