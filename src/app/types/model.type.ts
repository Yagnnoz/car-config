export type CarModel = {
  code: string;
  description: string;
  colors: Color[];
};

export type Color = {
  code: string;
  description: string;
  price: number;
}
