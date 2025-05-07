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
    setValue({ ...values, [name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isEmpty = Object.values(values).some((elem) => !elem);
    if (isEmpty) return;

    const found = allusers
      ? allusers.find((elem) => elem.email == values.email)
      : undefined;

    if (found) {
      if (found.password == values.password) {
        dispatch(loginUser(values));
        dispatch(toggleForm(false));
      } else {
        alert("Неверный пароль");
      }
    } else {
      alert("Пользователь не зарегистрирован");
    }
  }

  return (
    <div className={styles.section}>
      <div className={styles.formsection}>
        <div className={styles.title}>Register</div>
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
    </div>
  );
};

export default UserLoginForm;
