import React from "react";
import "./Cursor.css";
export default function Cursor() {
  const cursorAnimation = document.querySelector(".cursor");

  const cursors = document.querySelectorAll(".cursor");

  document.addEventListener("click", (e) => {
    let x = e.clientX;
    let y = e.clientY;

    // console.table(x,y)

    cursorAnimation.style.top = y + "px";
    cursorAnimation.style.left = x + "px";

    cursors.forEach((cursor) => {
      cursor.classList.add("active");

      setTimeout(() => {
        cursor.classList.remove("active");
      }, 2500);
    });

    let cursorClone = cursorAnimation.cloneNode(true);
    document.querySelector("body").appendChild(cursorClone);

    //console.log(cursorClone)

    setTimeout(() => {
      cursorClone.remove();
    }, 1000);
  });
  return (
    <div class="cursor">
      <div class="click-animation">
        <div class="shape circle big"></div>
        <div class="shape circle small"></div>
        <div class="shape triangle yellow"></div>
        <div class="shape triangle green"></div>
        <div class="shape disc"></div>
      </div>
    </div>
  );
}
