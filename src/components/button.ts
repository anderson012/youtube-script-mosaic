type createButtonType = {
  name: string;
  variant:
    | "primary"
    | "secondary"
    | "warning"
    | "danger"
    | "info"
    | "success"
    | "light"
    | "dark"
    | "link";
  classNames: string[];
};
export const createButton = ({
  name = "Button name",
  variant = "primary",
  classNames = [],
}: createButtonType) => {
  const button = document.createElement("button");
  button.innerText = name;
  button.classList.add("btn", `btn-${variant}`, ...classNames);

  return button;
};
