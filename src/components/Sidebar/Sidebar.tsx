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
    <aside className={styles.sidebar}>
      <header className={styles.title}>CATEGORIES</header>
      <nav aria-label="catedory navigation">
        <ul className={styles.menu}>
          {category.map((elem) => {
            const isActive = elem == page_category;
            return (
              <li key={elem}>
                <Link
                  href={`/category/${elem}`}
                  className={`${isActive ? styles.selected : ""} ${
                    styles.link
                  }`}
                >
                  {elem[0].toUpperCase() + elem.slice(1)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <footer className={styles.footer}>
        <div>
          <Link href="/help">Help</Link>
        </div>
        <div className={styles.footerterm}>
          <Link href="/terms">Term & Conditions</Link>
        </div>
      </footer>
    </aside>
  );
};

export default Sidebar;
