"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";

import { toggleForm, toggleTypeForm, loginUser } from "@/store/userSlice";

import { TLoginUser } from "@/utils/types";
import styles from "./Authform.module.css";

const UserLoginForm: React.FC = () => {
  const [values, setValue] = useState<TLoginUser>({
    email: "",
    password: "",
  });

  let allusers = useAppSelector((state) => state.user.allusers);

  const dispatch = useAppDispatch();

  function handleChange({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) {
    setValue((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (Object.values(values).some((elem) => !elem)) return;

    const found = allusers
      ? allusers.find((elem) => elem.email == values.email)
      : undefined;

    if (!found) {
      return alert("Пользователь не зарегистрирован");
    }

    if (found.password !== values.password) return alert("Неверный пароль");

    dispatch(loginUser(values));
    dispatch(toggleForm(false));
  }

  return (
    <section className={styles.section} aria-label="Login form section">
      <div className={styles.formsection}>
        <header className={styles.title}>Login</header>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          aria-label="Login form"
        >
          <div className={styles.group}>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              required
            />
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
            />
          </div>
          <div
            className={styles.link}
            onClick={() => {
              dispatch(toggleTypeForm("signup"));
            }}
          >
            Sign up
          </div>
          <button type="submit" className={styles.submit}>
            Login
          </button>
        </form>
      </div>
      <button
        className={styles.closeform}
        onClick={() => dispatch(toggleForm(false))}
      >
        ✕
      </button>
    </section>
  );
};

export default UserLoginForm;
