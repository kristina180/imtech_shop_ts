"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store";
import { getCategories } from "@/store/categorySlice";
import { getProducts } from "@/store/productsSlice";
import { TChildren } from "./types/type";

export default function StoreProvider({ children }: TChildren) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(getCategories());
    storeRef.current.dispatch(getProducts());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
