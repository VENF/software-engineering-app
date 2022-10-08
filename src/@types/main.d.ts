//declaration all types
type TUser = {
  name: string;
  email: string;
  password: string;
  mangas: Array<any>;
  avatar: string;
  _id: string;
};

type TManga = {
  title: string;
  img: string;
  rating: number;
  votes: string;
  sinopsis: string;
  price: number;
  categories: Array<string>;
  _id: string;
};

type TShoppingCar = {
  userId: string;
  products: Array<TManga | []>;
};

type TRecharges = {
  amount: number;
  date: Date;
}

type TExpenses = {
  amount: number;
  date: Date;
}

type TCard = {
  userId: string;
  amount: number;
  rechargesList: TRecharges[]
  expensesList: TExpenses[]
}