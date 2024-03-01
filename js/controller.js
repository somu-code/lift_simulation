export function generateNav(rootElement) {
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

export function generateFloorsLifts(rootElement, liftsState, floors, lifts) {
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

export function simulate(buttonId, liftsState) {
  console.log(buttonId);
  console.log(liftsState);
  const floorNumber = parseInt(buttonId.split("-")[3]);
  for (let i = 0; i < liftsState.length; i++) {
    if (liftsState[i].isRunning === false) {
      liftsState[i].isRunning = true;
      const currentLift = document.getElementById(liftsState[i].liftId);
      const transitionDuration = Math.abs(floorNumber - liftsState[i].currentFloor);
      currentLift.style.transition = `bottom ${2 * transitionDuration}s linear`;
      currentLift.style.bottom = `${174 * (floorNumber - 1)}px`;
      liftsState[i].currentFloor = floorNumber;
      liftsState[i].isRunning = false;
      break;
    }
  }
}
