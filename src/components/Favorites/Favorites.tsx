"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";

import {
  addToCart,
  removeFromFavorites,
  removeFromCart,
} from "@/store/userSlice";

import { ICart } from "@/utils/types";
import styles from "./Favorites.module.css";
import { useMemo } from "react";
import { notPhoto } from "@/utils/constants";

const Favorites: React.FC = () => {
  const { products } = useAppSelector((state) => state.products);
  const { cart, favorites } = useAppSelector((state) => state.user);

  const { push } = useRouter();
  const dispatch = useAppDispatch();

  // function getQuentity(id: number): number {
  //   const quan: ICart | undefined = cart.find((elem) => elem.id == id);
  //   if (quan !== undefined) {
  //     return quan.quantity;
  //   } else {
  //     return 0;
  //   }
  // }
  const cartQuantities = useMemo(() => {
    const map = new Map<number, number>();
    cart.forEach(({ id, quantity }) => map.set(id, quantity));
    return map;
  }, [cart]);

  return (
    <section className={styles.section}>
      <div className={styles.firsttitle}>Your favorites</div>
      <div className={styles.products}>
        {favorites.length > 0 ? (
          favorites.map(({ id, images, title, price }) => {
            const quantity = cartQuantities.get(id) || 0;
            const isInCart = quantity > 0;
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
                    onError={(e) => {
                      e.currentTarget.src = notPhoto;
                    }}
                  />
                </div>
                <article className={styles.info}>
                  <div
                    className={styles.title}
                    onClick={() => push(`/product/${id}`)}
                    aria-label={`View product ${title}`}
                  >
                    {title.split(",")[0]}
                  </div>

                  <div className={styles.priceone}>{price}$</div>

                  {isInCart ? (
                    <div className={styles.quantity}>
                      <button
                        className={styles.minus}
                        onClick={() => dispatch(removeFromCart({ id }))}
                      >
                        –
                      </button>
                      <div className={styles.quantitycount}>{quantity}</div>
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
                      aria-label={`Add ${title} to cart`}
                    >
                      Add to cart
                    </button>
                  )}
                  <button
                    className={styles.buttondelete}
                    onClick={() =>
                      dispatch(removeFromFavorites({ id, delete: true }))
                    }
                    aria-label={`Remove ${title} from favorites`}
                  >
                    ✕
                  </button>
                </article>
              </div>
            );
          })
        ) : (
          <div className={styles.empty}>Favorites empty</div>
        )}
      </div>
    </section>
  );
};

export default Favorites;
