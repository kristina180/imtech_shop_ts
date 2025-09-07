"use client";

import Products from "../Products/Products";
import { useParams, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";

import {
  addToCart,
  removeFromCart,
  addToFavorites,
  removeFromFavorites,
} from "@/store/userSlice";

import { notPhoto } from "@/utils/constants";
import styles from "./ProductCard.module.css";
import { IProduct } from "@/utils/types";
import { useState } from "react";

const ProductCard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { products } = useAppSelector((state) => state.products);
  const { cart, favorites } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const pathname = usePathname();

  const id: number = +pathname.replace("/product/", "");

  const product = products.find((p) => p.id === id);

  const list_products: IProduct[] = products.slice(0, 5);

  const getQuantity = (id: number): number => {
    const item = cart.find((elem) => elem.id === id);
    return item ? item.quantity : 0;
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const { images, title, price, description } = product;

  return (
    <>
      <div className={styles.productCart}>
        <div className={styles.images}>
          <img
            src={images[0]}
            alt={title}
            width={370}
            height={370}
            className={styles.mainimage}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = notPhoto;
            }}
          />
          {[...Array(4)].map((_, idx) => (
            <img
              key={idx}
              src={images[0]}
              alt={`${title} thumbnail ${idx + 1}`}
              width={85}
              height={85}
              className={styles.miniimage}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = notPhoto;
              }}
            />
          ))}
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

          <div className={styles.priceProduct}>{price}$</div>

          <div className={styles.buttons}>
            {!cart.find((elem) => elem.id === id) ? (
              <button
                className={styles.buttonCart}
                onClick={() => dispatch(addToCart({ id, products }))}
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
                <div className={styles.quantitycount}>{getQuantity(id)}</div>
                <button
                  className={styles.plus}
                  onClick={() => dispatch(addToCart({ id, products }))}
                >
                  +
                </button>
              </div>
            )}

            {favorites.find((elem) => elem.id === id) ? (
              <button
                className={styles.buttonFav}
                onClick={() => dispatch(removeFromFavorites({ id }))}
              >
                Added to favorites
              </button>
            ) : (
              <button
                className={styles.buttonFav}
                onClick={() => dispatch(addToFavorites({ id, products }))}
              >
                Add to favorites
              </button>
            )}
          </div>
        </div>
      </div>

      <Products products={list_products} titlefirst="Popular" />
    </>
  );
};

export default ProductCard;
