import generateRandomId from "../utils/generate-id";

type RowProps = {
  id?: string;
  classNames?: string[];
  style?: Partial<CSSStyleDeclaration>;
};

export default ({ id, classNames = [], style = {} }: RowProps = {}) => {
  id = !id ? generateRandomId("row") : id;
  const row = document.createElement("div");
  row.classList.add("row", ...classNames);
  row.id = id;

  Object.assign(row.style, style);

  return row;
};
