"use client";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";

import { toggleForm } from "@/store/userSlice";

import logoImage from "../../../public/logo.svg";
import avatarImg from "../../../public/avatar.svg";
import iconSearch from "../../../public/icon_search.svg";
import iconFavorites from "../../../public/favorites.svg";
import iconCart from "../../../public/cart.svg";
import { notPhoto } from "@/utils/constants";
import { IProduct } from "@/utils/types";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [userValue, setUserValue] = useState<string>("Guest");
  const [filterValue, setFilterValue] = useState<IProduct[]>([]);
  const [userAvatar, setAvatar] = useState<string>(avatarImg.src);
  const [searchValue, setSearchValue] = useState<string>("");

  const { products } = useAppSelector((state) => state.products);
  const { user, cart } = useAppSelector((state) => state.user);

  const { push } = useRouter();
  const dispatch = useAppDispatch();

  function handleSearch({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void {
    setSearchValue(value);
    let rezult: IProduct[] = [];

    if (value != "") {
      const filters: string[] = value
        .toLowerCase()
        .split(" ")
        .map((str) => str.trim())
        .filter(Boolean);

      if (filters.length > 1) {
        rezult = products.filter((item) =>
          filters.every(
            (elem) =>
              item.title.toLowerCase().includes(elem) ||
              item.category.slug.includes(elem) ||
              item.description.toLowerCase().includes(elem)
          )
        );
      } else {
        rezult = products.filter((item) =>
          filters.some(
            (elem) =>
              item.title.toLowerCase().includes(elem) ||
              item.category.slug.includes(elem) ||
              item.description.toLowerCase().includes(elem)
          )
        );
      }
      setFilterValue(rezult);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  function handleClick(): void {
    if (!user) {
      dispatch(toggleForm(true));
    } else {
      push("/profile");
    }
  }

  useEffect(() => {
    console.log(userAvatar)
    if (!user) {
      setAvatar(avatarImg.src);
      setUserValue("Guest");
    } else {
      setUserValue(user.name);
      setAvatar(user.avatar);
    }
  }, [user]);

  useEffect(() => {
    console.log('render',userAvatar)
    const handleClickOutside = (e: MouseEvent) => {
      const searchinput = document.getElementById("searchinput");
      const searchform = document.getElementById("searchform");
      if (searchform && searchinput) {
        if (
          !searchinput.contains(e.target as Node) &&
          !searchform.contains(e.target as Node)
        ) {
          setSearchValue("");
        }
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <Link
        href="/"
        aria-label="Главная страница"
        className={styles.logo_button}
      >
        <Image
          src={logoImage}
          className={styles.logo}
          alt="logo"
          onClick={() => push("/")}
          priority
        />
      </Link>

      <div className={styles.info}>
        <button className={styles.user} onClick={handleClick}>
          <img
            src={userAvatar}
            alt={user ? "avatar user" : "guest"}
            width={50}
            height={50}
            className={styles.avatar}
          />

          <span className={styles.username}>{userValue}</span>
        </button>

        <form className={styles.form} id="form" onSubmit={handleSubmit}>
          <div className={styles.formforsearch} id="searchform">
            <Image
              className={styles.searchicon}
              src={iconSearch}
              width={20}
              alt="icon search"
            />
            <input
              value={searchValue}
              className={styles.input}
              type="text"
              name="search"
              placeholder="Search for anything"
              autoComplete="off"
              onChange={handleSearch}
              id="searchinput"
            ></input>
          </div>
          {searchValue && (
            <>
              {filterValue.length > 0 ? (
                <div className={styles.box} id="box">
                  {filterValue.map((elem) => (
                    <div key={`values_${elem.id}`}>
                      <Link
                        href={`/product/${elem.id}`}
                        className={styles.boxelem}
                      >
                        <img
                          src={elem.images[0]}
                          width={40}
                          height={40}
                          alt=""
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = notPhoto;
                          }}
                        />
                        {elem.title.split(" ").slice(0, 3).join(" ")}
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.text}>Nothing searched</div>
              )}
            </>
          )}
        </form>

        <div className={styles.cartfav}>
          <Image
            src={iconFavorites}
            alt="favorites"
            onClick={() => push("/favorites")}
            className={styles.fav}
          />
          <div className={styles.cart}>
            <Image
              src={iconCart}
              alt="cart"
              onClick={() => push("/cart")}
              className={styles.cartimg}
            />
            <div className={styles.count}>
              <p>{cart.length}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
