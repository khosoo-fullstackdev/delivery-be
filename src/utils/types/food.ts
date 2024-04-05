export type FoodType = {
  name: string;
  image: string;
  ingredients: string[];
  price: number;
  categoryId: string;
  sale?: number;
  stock: number;
};
