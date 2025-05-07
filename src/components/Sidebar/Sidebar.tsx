"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useAppSelector } from "@/hooks/hook";

import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  const { category } = useAppSelector((state) => state.category);

  const pathname = usePathname();
  let page_category = pathname.replace("/category/", "");

  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        <ul className={styles.menu}>
          {category.map((elem, index) => (
            <li key={index}>
              {elem == page_category ? (
                <Link
                  href={`/category/${elem}`}
                  className={`${styles.selected} ${styles.link}`}
                >
                  {elem[0].toUpperCase() + elem.slice(1)}
                </Link>
              ) : (
                <Link href={`/category/${elem}`} className={styles.link}>
                  {elem[0].toUpperCase() + elem.slice(1)}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.footer}>
        <div>
          <Link href="/help">Help</Link>
        </div>
        <div className={styles.footerterm}>
          <Link href="/terms">Term & Conditions</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
