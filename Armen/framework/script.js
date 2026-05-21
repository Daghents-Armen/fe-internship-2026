import { App } from "./app.js";
import { createElement, render } from "./framework.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");

  const rerender = () => {
    console.log("RERENDER START");

    root.innerHTML = "";

    const tree = createElement(App, null);

    console.log("Creating root component (App)");

    const dom = render(tree, rerender);

    root.appendChild(dom);

    console.log("RERENDER COMPLETE");
  };

  rerender();
});