"use strict";

import { generateNav, generateFloorsLifts } from "./controller.js";

function main() {
  let numberOfFloors;
  let numberOfLifts;
  const liftsState = [];

  const rootElement = document.getElementById("root");
  const divElement = document.createElement("div");

  divElement.className = "parent-container";

  divElement.innerHTML = `
<div class="child-container">
  <h1 class="heading">
    Lift Simulation
  </h1>
  <div class="input-container">
    <div class="number-of-floors-container">
    <label for="number-of-floors">Enter number of floors: </label>
    <input type="number" min="1" value=6 id="number-of-floors">
    </div>
    <div class="number-of-lifts-container">
    <label for="number-of-lifts">Enter number of lifts: </label>
    <input type="number" min="1" value=2 id="number-of-lifts">
    </div>
      <button id="simulate-button" class="simulate-button">Simulate</button>
  </div>
</div>
`;

  rootElement.append(divElement);

  const submitButton = document.getElementById("simulate-button");
  submitButton.addEventListener("click", (_event) => {
    numberOfFloors = parseInt(
      document.getElementById("number-of-floors").value,
    );
    numberOfLifts = parseInt(document.getElementById("number-of-lifts").value);
    generateNav(rootElement);
    const configureButton = document.getElementById("configure-button");
    configureButton.addEventListener("click", (_event) => {
      location.reload();
    });
    generateFloorsLifts(rootElement, liftsState, numberOfFloors, numberOfLifts);
    const upButtons = document.querySelectorAll(".up-button");
    upButtons.forEach((upButton) => {
      upButton.addEventListener("click", (_event) => {
        const upButtonId = upButton.id;
        const floorNumber = parseInt(upButtonId.split("-")[3]);
        for (let i = 0; i < liftsState.length; i++) {
          if (liftsState[i].isRunning === false) {
            liftsState[i].isRunning = true;
            const currentLift = document.getElementById(liftsState[i].liftId);
            const transitionDuration = Math.abs(
              floorNumber - liftsState[i].currentFloor,
            );
            currentLift.style.transition = `bottom ${2 * transitionDuration
              }s linear`;
            currentLift.style.bottom = `${174 * (floorNumber - 1)}px`;
            currentLift.addEventListener("transitionend", (_event) => {
              const upLeftDoor = document.querySelector(
                `#${liftsState[i].liftId} .leftDoor`,
              );
              upLeftDoor.style.transform = "translateX(0)";
              upLeftDoor.style.transform = "translateX(-100%)";
              upLeftDoor.addEventListener("transitionend", (_event) => {
                upLeftDoor.style.transform = "translateX(0)";
              });
              const upRightDoor = document.querySelector(
                `#${liftsState[i].liftId} .rightDoor`,
              );
              upRightDoor.style.transform = "translateX(100%)";
              liftsState[i].currentFloor = floorNumber;
              liftsState[i].isRunning = false;
            });
            break;
          }
        }
      });
    });
    const downButtons = document.querySelectorAll(".down-button");
    downButtons.forEach((downButton) => {
      downButton.addEventListener("click", (_event) => {
        const downButtonId = downButton.id;
        const floorNumber = parseInt(downButtonId.split("-")[3]);
        for (let i = 0; i < liftsState.length; i++) {
          if (liftsState[i].isRunning === false) {
            liftsState[i].isRunning = true;
            const currentLift = document.getElementById(liftsState[i].liftId);
            const transitionDuration = Math.abs(
              floorNumber - liftsState[i].currentFloor,
            );
            currentLift.style.transition = `bottom ${2 * transitionDuration
              }s linear`;
            currentLift.style.bottom = `${174 * (floorNumber - 1)}px`;
            currentLift.addEventListener("transitionend", (_event) => {
              const downLeftDoor = document.querySelector(
                `#${liftsState[i].liftId} .leftDoor`,
              );
              downLeftDoor.style.transform = "translateX(-100%)";
              const downRightDoor = document.querySelector(
                `#${liftsState[i].liftId} .rightDoor`,
              );
              downRightDoor.style.transform = "translate(100%)";
              liftsState[i].currentFloor = floorNumber;
              liftsState[i].isRunning = false;
            });
            break;
          }
        }
      });
    });
  });
}

main();
