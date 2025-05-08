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
  const [userAvatar, setAvatar] = useState<string>(avatarImg);
  const [searchValue, setSearchValue] = useState<string>("");

  const { products } = useAppSelector((state) => state.products);
  const { user, logout, cart } = useAppSelector((state) => state.user);

  const { push } = useRouter();
  const dispatch = useAppDispatch();

  function hanleSearch({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void {
    setSearchValue(value);
    let rezult: IProduct[] = [];

    if (value != "") {
      const filters: string[] = value.toLowerCase().split(" ");

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
    if (!user) return;

    setUserValue(user.name);
    setAvatar(user.avatar);
  }, [user]);

  useEffect(() => {
    if (!logout) return;

    setUserValue("Guest");
    setAvatar(avatarImg);
  }, [logout]);

  useEffect(() => {
    window.addEventListener("click", (e: MouseEvent) => {
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
    });
  });

  return (
    <div className={styles.header}>
      <Image
        src={logoImage}
        alt="logo"
        className={styles.logo}
        onClick={() => push("/")}
      />

      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <Image
            src={userAvatar}
            alt="avatar"
            width={50}
            height={50}
            className={styles.avatar}
          />

          <div className={styles.username}>{userValue}</div>
        </div>

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
              onChange={hanleSearch}
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
                <div className={styles.text}>"Nothing searched"</div>
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
            <div className={styles.count}>{cart.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
