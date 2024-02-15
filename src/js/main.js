"use strict";

let numberOfFloors;
let numberOfLifts;

const rootElement = document.getElementById("root");

rootElement.innerHTML = `
<div class=parent-container>
<div class="child-container">
  <h1 class="heading">
    Lift Simulation
  </h1>
  <div class="input-container">
    <div class="number-of-floors-container">
    <label for="number-of-floors">Enter number of floors: </label>
    <input type="number" min="1" value=1 id="number-of-floors">
    </div>
    <div class="number-of-lifts-container">
    <label for="number-of-lifts">Enter number of lifts: </label>
    <input type="number" min="1" value=1 id="number-of-lifts">
    </div>
      <button id="simulate-button" class="simulate-button">Simulate</button>
  </div>
</div>
</div>
`;

function main(floors, lifts) {
  rootElement.innerHTML = "";
}

const submitButton = document.getElementById("simulate-button");
submitButton.addEventListener("click", (event) => {
  numberOfFloors = document.getElementById("number-of-floors").value;
  numberOfLifts = document.getElementById("number-of-lifts").value;
  main(numberOfFloors, numberOfLifts);
});
