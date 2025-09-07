"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/hook";

import { removeFromCart, cleanCart, addToCart } from "@/store/userSlice";

import styles from "./Cart.module.css";

const Cart: React.FC = () => {
  const { cart, user } = useAppSelector((state) => state.user);
  const { products } = useAppSelector((state) => state.products);

  const { push } = useRouter();
  const dispatch = useAppDispatch();

  let totalPrice: number = cart.reduce(
    (sum, elem) => sum + elem.quantity * elem.price,
    0
  );

  return (
    <section className={styles.section}>
      <header className={styles.firsttitle}>Your cart</header>
      <div className={styles.products}>
        {cart.length > 0 ? (
          cart.map(({ id, images, title, price, quantity }) => {
            return (
              <article className={styles.productitem} key={id}>
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
                  onClick={() => dispatch(removeFromCart({ id, delete: true }))}
                >
                  ✕
                </button>
              </article>
            );
          })
        ) : (
          <div className={styles.empty} role="status">
            Cart is empty
          </div>
        )}
      </div>
      <footer className={styles.footer}>
        <div className={styles.totalprice}>TOTAL PRICE: {totalPrice}$</div>
        <button
          onClick={() => {
            dispatch(cleanCart());
            alert("Заказ офомрлен");
          }}
          disabled={cart.length === 0}
        >
          Proceed to checkout
        </button>
      </footer>
    </section>
  );
};

export default Cart;
