export type SkiFormattedTime =
  | `${number}.${number}${number}.${number}${number}`
  | `${number}${number}:${number}${number}`;

export type Discipline = "GS" | "SL" | "SG" | "DH" | "AC";
export type SnowCondition =
  | "ARTIF"
  | "ARTIF DURE"
  | "ARTIF ARROSÉE"
  | "INJECTÉE"
  | "Regel";

export type Weather =
  | "Beau temps"
  | "Couvert"
  | "Jour blanc"
  | "Chute de neige";

export type Mode = "RACE" | "TRAINING";
