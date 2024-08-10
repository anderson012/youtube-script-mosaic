import removeAllChildNodes from "./remove-all-child-nodes";

export default function configureBody() {
  removeAllChildNodes(document.body);
  document.body.style.overflow = "auto";
  document.body.classList.add("bg-dark");
  const html = document.querySelector("html")!;
  html.style.fontSize = "unset";
  html.dataset.bsTheme = "dark";
  document.body.dataset.bsTheme = "dark";
}
