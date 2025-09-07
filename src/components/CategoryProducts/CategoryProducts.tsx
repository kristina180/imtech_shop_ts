"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { useAppSelector } from "@/hooks/hook";

import { notPhoto } from "@/utils/constants";

import styles from "./CategoryProducts.module.css";

type TInputValue = {
  name: string;
  price: string;
};

const CategoryProducts: React.FC = () => {
  const [inputValue, setInputValue] = useState<TInputValue>({
    name: "",
    price: "",
  });
  const [page, setPage] = useState<number>(1);

  const { products } = useAppSelector((state) => state.products);

  const pathname = usePathname();
  const category: string = pathname.replace("/category/", "");

  const category_products = useMemo(() => {
    return products.filter((p) => p.category.slug === category);
  }, [products, category]);

  const filteredProducts = useMemo(() => {
    const name = inputValue.name.trim().toLowerCase();
    const price = parseFloat(inputValue.price);

    return category_products.filter((product) => {
      const matchesName =
        name === "" ||
        product.title.toLowerCase().includes(name) ||
        product.category.slug.includes(name) ||
        product.description.toLowerCase().includes(name);

      const matchesPrice = isNaN(price) || product.price <= price;

      return matchesName && matchesPrice;
    });
  }, [inputValue, category_products]);

  const currentProducts = useMemo(() => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, page]);

  const totalPages = Math.ceil(filteredProducts.length / 10);

  function handleChange({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setInputValue((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  function handleChangePage(num: number) {
    setPage(num);
  }

  return (
    <section className={styles.section}>
      <div className={styles.titlefirst}>
        {category[0].toUpperCase() + category.slice(1)}
      </div>

      <form
        className={styles.formsearch}
        onSubmit={handleSubmit}
        role="search"
        aria-label="Filter products"
      >
        <input
          className={styles.input}
          type="text"
          name="name"
          value={inputValue.name}
          placeholder="Product name"
          autoComplete="off"
          onChange={handleChange}
          aria-label="Search by name"
        ></input>

        <input
          className={styles.input}
          type="text"
          name="price"
          value={inputValue.price}
          placeholder="Before price"
          autoComplete="off"
          onChange={handleChange}
          aria-label="Search by price"
        ></input>

        <button type="submit" className={styles.buttonsubmit}>
          Search
        </button>
      </form>

      {currentProducts.length > 0 ? (
        <div className={styles.list}>
          {currentProducts.map(({ id, images, title, price }) => (
            <Link
              href={`/product/${id}`}
              key={id}
              className={styles.linkproduct}
              aria-label={`Open product ${title}`}
            >
              <div className={styles.divimage}>
                <img
                  src={images[0]}
                  alt=""
                  width={170}
                  height={170}
                  className={styles.image}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = notPhoto;
                  }}
                />
              </div>

              <div className={styles.wrapper}>
                <h3 className={styles.title}>
                  {title.split(" ").slice(0, 3).join(" ")}
                </h3>
                <div className={styles.price}>{`${price}$`}</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.nofound}>Products not found</div>
      )}

      {totalPages > 1 && (
        <nav className={styles.buttons} aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handleChangePage(num)}
              className={num === page ? styles.selectedPage : styles.buttonPage}
              aria-current={num === page ? "page" : undefined}
            >
              {num}
            </button>
          ))}
        </nav>
      )}
    </section>
  );
};

export default CategoryProducts;
