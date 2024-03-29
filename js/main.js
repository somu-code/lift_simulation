"use strict";

const doorAnimationDuration = 5000;

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
    <input type="number" min="1" value=15 id="number-of-floors">
    </div>
    <div class="number-of-lifts-container">
    <label for="number-of-lifts">Enter number of lifts: </label>
    <input type="number" min="1" value=5 id="number-of-lifts">
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
        handleFloorButtonClick(upButton, liftsState);
      });
    });
    const downButtons = document.querySelectorAll(".down-button");
    downButtons.forEach((downButton) => {
      downButton.addEventListener("click", (_event) => {
        handleFloorButtonClick(downButton, liftsState);
      });
    });
  });
}

main();

function generateNav(rootElement) {
  rootElement.innerHTML = "";
  const headerElement = document.createElement("header");
  headerElement.innerHTML = `
<nav class="nav">
  <h1>Lift Simulation</h1>
  <button class="configure-button" id="configure-button">Configure</button>
</nav>
`;
  rootElement.append(headerElement);
}

function generateFloorsLifts(rootElement, liftsState, floors, lifts) {
  for (let i = floors; i >= 1; i--) {
    const floorElement = document.createElement("div");
    floorElement.className = `floor-container floor-container-${i}`;
    const floorButtonElement = document.createElement("div");
    floorButtonElement.className = "floor-button-container";

    const upButton = document.createElement("button");
    upButton.className = "up-button";
    upButton.id = `up-button-id-${i}`;
    upButton.innerText = "Up";
    floorButtonElement.append(upButton);

    const downButton = document.createElement("button");
    downButton.className = "down-button";
    downButton.id = `down-button-id-${i}`;
    downButton.innerText = "Down";
    floorButtonElement.append(downButton);

    floorElement.append(floorButtonElement);

    const floorBase = document.createElement("div");
    floorBase.className = "floor-base";
    floorBase.innerHTML = `
<div class="floor-base-line"></div>
<h1 class="floor-heading">Floor ${i}</h1>
`;
    floorElement.append(floorBase);
    if (i === 1) {
      const liftContainerParentElement = document.createElement("div");
      liftContainerParentElement.className = "lift-container-parent";
      for (let j = 1; j <= lifts; j++) {
        const liftElement = document.createElement("div");
        liftElement.className = `lift-element lift-element-${j}`;
        liftElement.id = `lift-id-${j}`;
        liftContainerParentElement.append(liftElement);
        liftsState[j - 1] = {
          liftId: liftElement.id,
          isRunning: false,
          currentFloor: i,
        };

        const leftDoor = document.createElement("div");
        leftDoor.className = "door leftDoor";
        liftElement.append(leftDoor);

        const rightDoor = document.createElement("div");
        rightDoor.className = "door rightDoor";
        liftElement.append(rightDoor);
      }
      floorElement.append(liftContainerParentElement);
    }
    rootElement.append(floorElement);
  }
}

function handleFloorButtonClick(button, liftsState) {
  const floorNumber = parseInt(button.id.split("-")[3]);
  for (let i = 0; i < liftsState.length; i++) {
    if (floorNumber === liftsState[i].currentFloor) {
      console.log(`Already a lift present on floor ${floorNumber}`);
      return;
    }
  }
  for (let i = 0; i < liftsState.length; i++) {
    if (liftsState[i].isRunning === false) {
      liftsState[i].isRunning = true;
      const currentLift = document.getElementById(liftsState[i].liftId);
      const transitionDuration = Math.abs(
        floorNumber - liftsState[i].currentFloor,
      ) * 2;
      liftsState[i].currentFloor = floorNumber;
      currentLift.style.transition = `bottom ${transitionDuration}s linear`;
      currentLift.style.bottom = `${174 * (floorNumber - 1)}px`;
      currentLift.addEventListener("transitionend", (_event) => {
        const upLeftDoor = document.querySelector(
          `#${liftsState[i].liftId} .leftDoor`,
        );
        upLeftDoor.classList.add("leftDoorAnimation");
        const upRightDoor = document.querySelector(
          `#${liftsState[i].liftId} .rightDoor`,
        );
        upRightDoor.classList.add("rightDoorAnimation");
        setTimeout(() => {
          upLeftDoor.classList.remove("leftDoorAnimation");
          upRightDoor.classList.remove("rightDoorAnimation");
          liftsState[i].isRunning = false;
        }, doorAnimationDuration);
      });
      break;
    }
  }

}
