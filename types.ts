export type SkiFormattedTime =
  | `${number}.${number}${number}.${number}${number}`
  | `${number}${number}:${number}${number}`;

export type Discipline = "GS" | "SL" | "SG" | "DH" | "AC";
export type SnowCondition =
  | "ARTIF"
  | "ARTIF DURE"
  | "ARTIF ARROSÉE"
  | "INJECTÉE";
export type Weather =
  | "Beau temps"
  | "Couvert"
  | "Jour blanc"
  | "Chute de neige";
