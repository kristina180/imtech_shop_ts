"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";

import logoImage from "../../../public/logo.svg";
import youtubeIcon from "../../../public/youtubicon.svg";
import instaIcon from "../../../public/instaicon.svg";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const { push } = useRouter();

  return (
    <footer className={styles.footer}>
      <Image
        src={logoImage}
        alt="logo"
        className={styles.logo}
        onClick={() => push("/")}
      />

      <div className={styles.writers}>Developed by Kristina Gusyasyan</div>
      <nav className={styles.smicons}>
        <a
          href="https://www.youtube.com"
          target="_blank"
          aria-label="YouTube"
          rel="noopener noreferrer"
        >
          <Image
            src={youtubeIcon}
            alt="YouTube icon"
            className={styles.youtube}
          />
        </a>

        <a
          href="https://instagram.com/"
          target="_blank"
          aria-label="Instagram"
          rel="noopener noreferrer"
        >
          <Image src={instaIcon} alt="Insta icon" className={styles.insta} />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
