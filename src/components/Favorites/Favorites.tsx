"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";

import {
  addToCart,
  removeFromFavorites,
  removeFromCart,
  checkAuth,
} from "@/store/userSlice";

import { ICart } from "@/utils/types";
import styles from "./Favorites.module.css";

const Favorites: React.FC = () => {
  const { products } = useAppSelector((state) => state.products);
  const { cart, favorites, user } = useAppSelector((state) => state.user);

  const { push } = useRouter();
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

  function getQuentity(id: number): number {
    const quan: ICart | undefined = cart.find((elem) => elem.id == id);
    if (quan !== undefined) {
      return quan.quantity;
    } else {
      return 0;
    }
  }

  return (
    <>
      <div className={styles.section}>
        <div className={styles.firsttitle}>Your favorites</div>
        <div className={styles.products}>
          {favorites.length > 0 ? (
            favorites.map(({ id, images, title, price }) => {
              return (
                <div className={styles.productitem} key={id}>
                  <div className={styles.divimage}>
                    <Image
                      src={images[0]}
                      alt=""
                      width={100}
                      height={100}
                      className={styles.image}
                      onClick={() => push(`/product/${id}`)}
                    />
                  </div>
                  <div className={styles.info}>
                    <div
                      className={styles.title}
                      onClick={() => push(`/product/${id}`)}
                    >
                      {title.split(",")[0]}
                    </div>
                    <div className={styles.priceone}>{price}$</div>
                    {cart.find((elem) => elem.id == id) ? (
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
                    ) : (
                      <button
                        className={styles.buttonCart}
                        onClick={() => {
                          dispatch(addToCart({ id, products }));
                        }}
                      >
                        Add to cart
                      </button>
                    )}
                    <button
                      className={styles.buttondelete}
                      onClick={() =>
                        dispatch(removeFromFavorites({ id, delete: true }))
                      }
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.empty}>Favorites empty</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
