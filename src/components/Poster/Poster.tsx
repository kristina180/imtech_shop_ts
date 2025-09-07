"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

import headphonePoster from "../../../public/poster_headphones.svg";
import styles from "./Poster.module.css";

const Poster: React.FC = () => {
  const { push } = useRouter();

  return (
    <section className={styles.poster}>
      <div className={styles.product}>
        <div className={styles.title}>NEW!</div>
        <div className={styles.subtitle}>
          WE HAVE A NEW PINK FUR HEADPHONES!
        </div>
        <div className={styles.text}>THE QUEEN OF GLAMOUR</div>
        <button
          className={styles.button}
          onClick={() => push(`/category/electronics`)}
        >
          Shop now
        </button>
      </div>
      <Image
        src={headphonePoster}
        alt="Постер с розовыми меховыми наушниками"
        className={styles.image}
        width={420}
        height={420}
      />
    </section>
  );
};

export default Poster;
