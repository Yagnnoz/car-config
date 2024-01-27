export type CarOptions = {
  configs: CarConfig[];
  towHitch: boolean;
  yoke: boolean;
}

export type CarConfig = {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}


export type ConfigurationSelection = {
  config: CarConfig;
  towHitchActive: boolean;
  yokeActive: boolean;
}
