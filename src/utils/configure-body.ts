import removeAllChildNodes from "./remove-all-child-nodes";

export default function configureBody() {
  removeAllChildNodes(document.body);
  document.body.style.overflow = "auto";
  document.body.classList.add("bg-dark");
  document.querySelector("html")!.style.fontSize = "unset";
}
