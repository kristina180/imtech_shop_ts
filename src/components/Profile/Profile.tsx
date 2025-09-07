"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/hook";

import { updateUser, toggleForm, logoutChange } from "@/store/userSlice";

import { IUser } from "@/utils/types";
import styles from "./Profile.module.css";

const Profile: React.FC = () => {
  const [values, setValue] = useState<IUser>({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const { user } = useAppSelector(({ user }) => user);

  const dispatch = useAppDispatch();

  function handleChange({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) {
    setValue((prev) => ({ ...prev, [name]: value }));
  }

  function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    document.cookie = "token=; Max-Age=-1;";
    dispatch(logoutChange());
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const isEmpty = Object.values(values).some((elem) => !elem.trim());
    if (isEmpty) return;
    dispatch(updateUser(values));
    dispatch(toggleForm(false));
  }

  useEffect(() => {
    if (!user) return;
    setValue(user);
  }, [user]);

  return (
    <div className={styles.profile}>
      {!user ? (
        <div className={styles.nologin}>You need to log in</div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.group}>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className={styles.group}>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              value={values.password}
              autoComplete="off"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className={styles.group}>
            <input
              type="name"
              placeholder="Your username"
              name="name"
              value={values.name}
              autoComplete="off"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className={styles.group}>
            <input
              type="avatar"
              placeholder="Your avatar"
              name="avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
            ></input>
          </div>

          <button type="submit" className={styles.submit}>
            Update
          </button>
          {user && (
            <button
              type="submit"
              className={`${styles.submit} ${styles.logout}`}
              onClick={handleLogout}
            >
              Log out
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default Profile;
