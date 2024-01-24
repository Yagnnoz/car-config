export type CarModel = {
  code: string;
  description: string;
  colors: ModelColor[];
};

export type ModelColor = {
  code: string;
  description: string;
  price: number;
};
