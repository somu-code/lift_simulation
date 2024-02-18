"use strict";

function main() {
  let numberOfFloors;
  let numberOfLifts;

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

  function generateNav() {
    rootElement.innerHTML = "";
    const headerElement = document.createElement("header");
    headerElement.innerHTML = `
<nav class="nav">
  <h1>Lift Simulation</h1>
  <button class="configure-button">Configure</button>
</nav>
`;
    rootElement.append(headerElement);
  }

  function generateFloorsLifts(floors, lifts) {
    for (let i = floors; i >= 1; i--) {
      const floorElement = document.createElement("div");
      floorElement.className = `floor-container floor-container-${i}`;
      const floorButtonElement = document.createElement("div");
      floorButtonElement.className = "floor-button-container";
      floorButtonElement.innerHTML = `
<button class="up-button">Up</button>
<button class="down-button">Down</button>
`;
      floorElement.append(floorButtonElement);
      const floorBase = document.createElement("div");
      floorBase.className = "floor-base";
      floorBase.innerHTML = `
<div class="floor-base-line"></div>
<h1 class="floor-heading">Floor ${i}</h1>
`;
      floorElement.append(floorBase);
      if (i === 1) {
        const liftContainerElement = document.createElement("div");
        liftContainerElement.className = "lift-container";
        for (let j = 1; j <= lifts; j++) {
          const liftElement = document.createElement("div");
          liftElement.className = `lift-element lift-element-${j}`;
          liftElement.id = `lift-id-${j}`;
          liftContainerElement.append(liftElement);
        }
        floorElement.append(liftContainerElement);
      }
      rootElement.append(floorElement);
    }
  }

  const submitButton = document.getElementById("simulate-button");
  submitButton.addEventListener("click", (event) => {
    numberOfFloors = parseInt(document.getElementById("number-of-floors").value);
    numberOfLifts = parseInt(document.getElementById("number-of-lifts").value);
    generateNav();
    generateFloorsLifts(numberOfFloors, numberOfLifts);
  });
}

main();