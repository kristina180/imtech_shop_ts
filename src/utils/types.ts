// For UserSlice

export interface IUser {
  id?: number;
  email: string;
  password: string;
  name: string;
  avatar: string;
}

export interface ISignupUser {
  id?: number;
  email: string;
  password: string;
  name: string;
}

export interface IGettingUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  avatar: string;
  creationAt?: string;
  updateAt?: string;
}

export interface IInitialStateUserSlice {
  allusers: null | IGettingUser[];
  user: null | IUser;
  token: null | string;
  logout: boolean;
  cart: ICart[];
  favorites: IFav[];
  formType: string;
  showForm: boolean;
}

export type TLoginUser = {
  email: string;
  password: string;
};

export type TCheckAuth = {
  data: IGettingUser;
  token: string;
};

// For Products

// export interface IProduct {
//   id: number;
//   title: string;
//   image: string;
//   price: string;
//   description: string;
//   brand: string;
//   model: string;
//   color: string;
//   category: string;
//   discount: number;
//   onSale: boolean;
// }

export interface IProduct {
  id: number;
  title: string;
  images: string[];
  price: number;
  description: string;
  slug: string;
  category: ICategories;
  creationAt: string;
  upDateAt: string;
}

export type TGetProduct = {
  products: IProduct[];
};

export type TInitialStateProducts = {
  products: IProduct[];
  isLoading: boolean;
};

export type TPayloadType = {
  id: number;
  products: IProduct[];
};

export interface IOfferedProducts {
  titlefirst: string;
  products: IProduct[];
  amount: number;
  buttontext?: string;
}

// For Categories

export interface IInitialStateCategory {
  category: string[];
  isLoading: boolean;
}

export interface ICategories {
  creationAt?: string;
  id: number;
  image: string;
  name: string;
  slug: string;
  updatedAt?: string;
}

export type TGetCategories = ICategories[];

export interface IPropsForCategories {
  titlefirst: string;
  products: IProduct[];
  amount: number;
  categories: string[];
}

// For Cart and Favorites

export interface IRemoveFromCartFav {
  id: number;
  delete?: boolean;
}

export interface IFav {
  id: number;
  images: string[];
  title: string;
  price: number;
}
export interface ICart extends IFav {
  quantity: number;
}
