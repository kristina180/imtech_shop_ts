"use client";

import Products from "../Products/Products";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";

import {
  addToCart,
  removeFromCart,
  addToFavorites,
  removeFromFavorites,
  checkAuth,
} from "@/store/userSlice";

import { notPhoto } from "@/utils/constants";
import styles from "./ProductCard.module.css";

const ProductCard: React.FC = () => {
  const { products } = useAppSelector((state) => state.products);
  const { cart, user, favorites } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const id: number = +pathname.replace("/product/", "");

  function getQuentity(id: number): number {
    const quan = cart.find((elem) => elem.id == id);
    if (quan !== undefined) {
      return quan.quantity;
    } else {
      return 0;
    }
  }

  return (
    <>
      {products &&
        products.map((elem) => {
          let [image, title, price, description] = [
            elem.images[0],
            elem.title,
            elem.price,
            elem.description,
          ];
          if (elem.id == id) {
            return (
              <div className={styles.productCart} key={`${id}_cart`}>
                <div className={styles.images}>
                  <img
                    src={image}
                    alt=""
                    width={370}
                    height={370}
                    className={styles.mainimage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = notPhoto;
                    }}
                  />
                  <img
                    src={image}
                    alt=""
                    width={85}
                    height={85}
                    className={styles.miniimage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = notPhoto;
                    }}
                  />
                  <img
                    src={image}
                    alt=""
                    width={85}
                    height={85}
                    className={styles.miniimage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = notPhoto;
                    }}
                  />
                  <img
                    src={image}
                    alt=""
                    width={85}
                    height={85}
                    className={styles.miniimage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = notPhoto;
                    }}
                  />
                  <img
                    src={image}
                    alt=""
                    width={85}
                    height={85}
                    className={styles.miniimage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = notPhoto;
                    }}
                  />
                </div>
                <div className={styles.content}>
                  <div className={styles.titledescr}>
                    <div className={styles.titleProduct}>
                      <p>{title}</p>
                    </div>
                    <div className={styles.description}>
                      <p>{description}</p>
                    </div>
                  </div>

                  <div className={styles.priceProduct}>{price + "$"}</div>
                  <div className={styles.buttons}>
                    {!cart.find((elem) => elem.id == id) ? (
                      <button
                        className={styles.buttonCart}
                        onClick={() => {
                          dispatch(addToCart({ id, products }));
                        }}
                      >
                        Add to cart
                      </button>
                    ) : (
                      <div className={styles.quantity}>
                        <button
                          className={styles.minus}
                          onClick={() => dispatch(removeFromCart({ id }))}
                        >
                          –
                        </button>
                        <div className={styles.quantitycount}>
                          {getQuentity(id)}
                        </div>
                        <button
                          className={styles.plus}
                          onClick={() => dispatch(addToCart({ id, products }))}
                        >
                          +
                        </button>
                      </div>
                    )}

                    {favorites.find((elem) => elem.id == id) ? (
                      <button
                        className={styles.buttonFav}
                        onClick={() => dispatch(removeFromFavorites({ id }))}
                      >
                        Added to favorites
                      </button>
                    ) : (
                      <button
                        className={styles.buttonFav}
                        onClick={() =>
                          dispatch(addToFavorites({ id, products }))
                        }
                      >
                        Add to favorites
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
      <Products
        products={products}
        amount={5}
        titlefirst="Popular"
        buttontext="See More"
      />
    </>
  );
};

export default ProductCard;
