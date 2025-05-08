"use client";

import Image from "next/image";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/hook";

import {
  removeFromCart,
  cleanCart,
  addToCart,
  checkAuth,
} from "@/store/userSlice";

import styles from "./Cart.module.css";

const Cart: React.FC = () => {
  const { cart, user } = useAppSelector((state) => state.user);
  const { products } = useAppSelector((state) => state.products);

  const { push } = useRouter();
  const dispatch = useAppDispatch();

  let sum: number =
    cart.length > 0
      ? cart.reduce((sum, elem) => sum + elem.quantity * elem.price, 0)
      : 0;

  return (
    <>
      <div className={styles.section}>
        <div className={styles.firsttitle}>Your cart</div>
        <div className={styles.products}>
          {cart.length != 0 ? (
            cart.map(({ id, images, title, price, quantity }) => {
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

                    <div className={styles.pricewhole}>{price * quantity}$</div>
                  </div>
                  <button
                    className={styles.buttondelete}
                    onClick={() =>
                      dispatch(removeFromCart({ id, delete: true }))
                    }
                  >
                    ✕
                  </button>
                </div>
              );
            })
          ) : (
            <div className={styles.empty}>Cart empty</div>
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.totalprice}>TOTAL PRICE: {sum}$</div>
          <button
            onClick={() => {
              dispatch(cleanCart());
              alert("Заказ офомрлен");
            }}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
