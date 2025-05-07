"use client";

import { useState } from "react";
import { useAppDispatch } from "@/hooks/hook";

import {
  toggleForm,
  createUser,
  toggleTypeForm,
  getAllUsers,
} from "@/store/userSlice";

import { ISignupUser } from "@/utils/types";
import styles from "./Authform.module.css";

const UserSignupForm: React.FC = () => {
  const [values, setValue] = useState<ISignupUser>({
    email: "",
    password: "",
    name: "",
  });

  const dispatch = useAppDispatch();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value, name },
  }) => {
    setValue({ ...values, [name]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(values).some((elem) => !elem);
    if (isEmpty) return;
    dispatch(createUser(values));
    dispatch(toggleForm(false));
  };

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
            <div
              className={styles.link}
              onClick={() => {
                dispatch(toggleTypeForm("login"));
                dispatch(getAllUsers());
              }}
            >
              I already have an account
            </div>
            <button type="submit" className={styles.submit}>
              Create an account
            </button>
          </div>
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

export default UserSignupForm;
