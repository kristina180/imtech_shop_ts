"use client";

import UserSignupForm from "./UserSignupForm";
import UserLoginForm from "./UserLoginForm";

import { useAppDispatch, useAppSelector } from "@/hooks/hook";

import { toggleForm } from "@/store/userSlice";

import styles from "./Authform.module.css";

const AuthForm: React.FC = () => {
  const { showForm, formType } = useAppSelector(({ user }) => user);

  const dispatch = useAppDispatch();

  return showForm ? (
    <>
      <div
        className={styles.overlay}
        onClick={() => dispatch(toggleForm(false))}
      />
      {formType === "signup" ? <UserSignupForm /> : <UserLoginForm />}
    </>
  ) : null;
};

export default AuthForm;
