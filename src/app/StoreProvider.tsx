"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store";
import { getCategories } from "@/store/categorySlice";
import { getProducts } from "@/store/productsSlice";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { TChildren } from "./types/type";

export default function StoreProvider({ children }: TChildren) {
  const storeRef = useRef<AppStore | null>(null);
  let story = makeStore();
  if (!storeRef.current) {
    storeRef.current = story;
    storeRef.current.dispatch(getCategories());
    storeRef.current.dispatch(getProducts());
  }
  let persistor = persistStore(story);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
