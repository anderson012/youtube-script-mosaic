import generateRandomId from "../utils/generate-id";

type ColumnProps = {
  id?: string;
  classNames?: string[];
  col?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  alignSelf?: "start" | "center" | "end" | "baseline" | "stretch";
  style?: Partial<CSSStyleDeclaration>;
};

export default ({
  id,
  classNames = [],
  col,
  sm,
  md,
  lg,
  xl,
  xxl,
  alignSelf,
  style = {},
}: ColumnProps = {}) => {
  id = id ?? generateRandomId("column");

  const column = document.createElement("div");

  if (col) column.classList.add(`col-${col}`);
  if (sm) column.classList.add(`col-sm-${sm}`);
  if (md) column.classList.add(`col-md-${md}`);
  if (lg) column.classList.add(`col-lg-${lg}`);
  if (xl) column.classList.add(`col-xl-${xl}`);
  if (xxl) column.classList.add(`col-xxl-${xxl}`);
  if (alignSelf) column.classList.add(`align-self-${alignSelf}`);

  column.classList.add("column", ...classNames);

  column.id = id;

  Object.assign(column.style, style);

  return column;
};
