"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";

import { notPhoto } from "@/utils/constants";
import { IProduct } from "@/utils/types";
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
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const category: string = pathname.replace("/category/", "");

  const category_products: IProduct[] = getCategoryProducts();

  const [valueProducts, setValueProducts] = useState<IProduct[]>([
    ...category_products,
  ]);
  const [valueView, setValueView] = useState<IProduct[]>(
    valueProducts.slice(0, 10)
  );

  let count_button: number[] =
    valueProducts.length != 0
      ? Array.from(
          { length: Math.ceil(valueProducts.length / 10) },
          (_, i) => i + 1
        )
      : [];

  useEffect(() => {
    localStorage.setItem("startItem", JSON.stringify(valueProducts));
  }, [valueProducts]);

  function getCategoryProducts(): IProduct[] {
    const data_localStorage = localStorage.getItem("startItem");
    const localStorageProducts: IProduct[] =
      data_localStorage != null ? JSON.parse(data_localStorage) : [];
    const productslist: IProduct[] =
      products.length > 0
        ? products.filter((elem) => elem.category.slug == category)
        : localStorageProducts;
    return productslist;
  }

  function handleChange({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setInputValue({ ...inputValue, [name]: String(value) });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      (inputValue.name == "" && inputValue.price == "") ||
      (inputValue.name == " " && inputValue.price == " ")
    ) {
      setValueProducts(category_products);
      setValueView(category_products.slice(0, 10));
      return;
    }

    const name: string = inputValue.name.toLowerCase();
    const price: string = inputValue.price;
    let new_items: IProduct[] = [...category_products];

    if ((name != "" && price == "") || (name == "" && price != "")) {
      new_items =
        inputValue.price != ""
          ? category_products.filter((elem) => {
              return +elem.price <= Number(inputValue.price);
            })
          : category_products.filter(
              (elem) =>
                elem.title.toLowerCase().includes(name) ||
                elem.category.slug.includes(name) ||
                elem.description.includes(name)
            );
    }
    if (name != "" && price != "") {
      new_items = category_products.filter(
        (elem) =>
          elem.price <= +inputValue.price &&
          (elem.title.toLowerCase().includes(name) ||
            elem.category.slug.includes(name) ||
            elem.description.includes(name))
      );
    }

    setValueProducts(new_items);
    setValueView(new_items.slice(0, 10));
  }

  function handleChangePage(num: number) {
    setPage(num);
    setValueView(category_products.slice(num * 10 - 10, num * 10));
  }

  return (
    <div className={styles.section}>
      <div className={styles.titlefirst}>
        {category[0].toUpperCase() + category.slice(1)}
      </div>

      <form className={styles.formsearch} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={inputValue.name}
          placeholder="Product name"
          autoComplete="off"
          onChange={handleChange}
        ></input>

        <input
          className={styles.input}
          type="text"
          name="price"
          value={inputValue.price}
          placeholder="Before price"
          autoComplete="off"
          onChange={handleChange}
        ></input>

        <button type="submit" className={styles.buttonsubmit}>
          Search
        </button>
      </form>

      {valueView.length > 0 ? (
        <div className={styles.list}>
          {valueView.map(({ id, images, title, price }) => (
            <Link
              href={`/product/${id}`}
              key={id}
              className={styles.linkproduct}
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

      <div className={styles.buttons}>
        {count_button.map((elem) => (
          <button
            key={elem}
            onClick={() => handleChangePage(elem)}
            className={elem == page ? styles.selectedPage : styles.buttonPage}
          >
            {elem}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
