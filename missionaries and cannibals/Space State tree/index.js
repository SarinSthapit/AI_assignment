// Here, 0 means boat is at left, and 1 means that the boat is at right.
let initialState = [3, 3, 0];
let goalState = [0, 0, 1];
let state = [];
let killedState = [];
let iterator = true;


// To create object for individual states
class CreateState {
  constructor() {
    this.value;
    this.parent;
    this.visited;
    this.x;
    this.y;
  }
}

// Root node
var rootNode = new CreateState();
rootNode.value = initialState;
rootNode.parent = initialState;
rootNode.visited = false;


// To set the screen.
function setup() {
  frameRate(1);
  createCanvas(1500, 760);

  // Index
  strokeWeight(2);
  stroke(0);
  noFill();
  rect(1250, 540, 210, 126);
  fill(0);
  noStroke();
  textSize(18);
  text("Index", 1280, 570);
  fill(5, 232, 5);
  noStroke();
  rect(1290, 599, 12, 12);
  fill(0);
  textSize(11);
  text("Visited State", 1325, 608);
  fill(252, 34, 5);
  noStroke();
  rect(1290, 620, 12, 12);
  fill(0);
  textSize(11);
  text("Killed State", 1325, 629);
  fill(252, 192, 13);
  noStroke();
  rect(1290, 640, 12, 12);
  fill(0);
  textSize(11);
  text("Unvisited State", 1325, 650);
  
  //Title
  fill(7, 100, 240);
  
  textSize(26);
  text(
    "MISSIONARIES",
    20,
    40
  );
  textSize(16);
  text(
    "and",
    212,
    40
  );
  textSize(26);
  text(
    "CANNIBALS",
    244,
    40
  );
  fill(0)
  textSize(16);
  text(
    "Space State Tree",
    20,
    70
  );
  

  //Display for the root node
  textSize(24);
  fill(252, 192, 13);
  noStroke();
  text("[ 3, 3, 0 ]", 50, windowHeight - 85);
  stroke(7, 100, 240)
  line(150, windowHeight - 88, 172, windowHeight - 88)
  rootNode.x = windowWidth / 2;
  rootNode.y = 70;
  state.push(rootNode);
  while (iterator) {
    applyOperation(state[state.length - 1]);
  }
  console.log("State:");
  console.log(state);
  console.log("Killed State:");
  console.log(killedState);
}


var i = 0;
// To display the states
function draw() {  
  textSize(16);
  displayState();
  i++;
  if (i >= state.length) {
    noLoop();
  }
}



// To explore all the possible states and adding child states
// Also, to check if the state has already been visited
function applyOperation(tempState) {
  if (tempState.visited === true) {
    killedState.push(state[state.length - 1]);
    state.splice(state.length - 1, 1);
  } else {
    tempState.visited = true;
    boatPosition = tempState.value[2];
    
    // When boat sails from left to right.
    if (boatPosition === 0) {
      // For 2 Missionaries
      if (tempState.value[0] >= 2) {
        addState(tempState, [
          tempState.value[0] - 2,
          tempState.value[1] - 0, 
          1,
        ]);
      }
      // For 1 Missionary
      if (tempState.value[0] >= 1) {
        addState(tempState, [
          tempState.value[0] - 1,
          tempState.value[1] - 0,
          1,
        ]);
      }
      // For 2 Cannibals
      if (tempState.value[1] >= 2) {
        addState(tempState, [
          tempState.value[0] - 0,
          tempState.value[1] - 2,
          1,
        ]);
      }
      // For 1 Missionary and 1 Cannibal
      if (tempState.value[0] >= 1 && tempState.value[1] >= 1) {
        addState(tempState, [
          tempState.value[0] - 1,
          tempState.value[1] - 1,
          1,
        ]);
      }
      // For 1 Cannibal
      if (tempState.value[1] >= 1) {
        addState(tempState, [
          tempState.value[0] - 0,
          tempState.value[1] - 1,
          1,
        ]);
      }
    } else if (boatPosition === 1) {
      // When boat sails from right to left.

      // For 1 Missionary
      if (initialState[0] - tempState.value[0] > 0) {
        addState(tempState, [
          tempState.value[0] + 1,
          tempState.value[1] + 0,
          0,
        ]);
      }
      // For 1 Cannibal
      if (initialState[1] - tempState.value[1] > 0) {
        addState(tempState, [
          tempState.value[0] + 0,
          tempState.value[1] + 1,
          0,
        ]);
      }
      // For 2 Missionaries
      if (initialState[0] - tempState.value[0] > 2) {
        addState(tempState, [
          tempState.value[0] + 2,
          tempState.value[1] + 0,
          0,
        ]);
      }
      // For 2 Cannibals
      if (initialState[1] - tempState.value[1] > 2) {
        addState(tempState, [
          tempState.value[0] + 0,
          tempState.value[1] + 2,
          0,
        ]);
      }
      // For 1 Missionary and 1 Cannibal
      if (
        initialState[0] - tempState.value[0] > 0 &&
        initialState[1] - tempState.value[1] > 0
      ) {
        addState(tempState, [
          tempState.value[0] + 1,
          tempState.value[1] + 1, 
          0,
        ]);
      }
    }
  }
}


// To add new states.
function addState(parent, value) {
  var temp = new CreateState();
  temp.value = value;
  temp.parent = parent.value;
  temp.visited = false;
  if (goalState[0] === value[0] && goalState[1] === value[1]) {
    state.push(temp);
    iterator = false;
  } else if (temp.value[0] === 0 || temp.value[0] >= temp.value[1]) {
    if (3 - temp.value[0] === 0 || 3 - temp.value[0] >= 3 - temp.value[1]) {
      if (repetitionChecker(value)) {
        killedState.push(temp);
      } else {
        state.push(temp);
      }
    } else {
      killedState.push(temp);
    }
  } else if (temp.value[0] < temp.value[1]) {
    killedState.push(temp);
  }
}


// Function to check whether a state already exists or not in the array
function repetitionChecker(value) {
  for (let i = 0; i < state.length; i++) {
    if (
      state[i].value[0] === value[0] &&
      state[i].value[1] === value[1] &&
      state[i].value[2] === value[2]
    ) {
      return true;
    }
  }
  return false;
}



//function used to show the state space tree.
function displayState() {
  let tempArray = [];
  textStyle(BOLD);
  strokeWeight(1);
  for (j = i + 1; j < state.length; j++) {
    if (
      state[j].parent[0] === state[i].value[0] &&
      state[j].parent[1] === state[i].value[1] &&
      state[j].parent[2] === state[i].value[2]
    ) {
      if (!tempChecker(state[j].value, tempArray)) {
        var tempValue = {
          value: state[j].value,
          parent: state[i].value,
        };
        tempArray.push(tempValue);
      }
    }
  }
  for (k = 0; k < killedState.length; k++) {
    if (
      killedState[k].parent[0] === state[i].value[0] &&
      killedState[k].parent[1] === state[i].value[1] &&
      killedState[k].parent[2] === state[i].value[2]
    ) {
      // console.log(killedStsate[k].value);
      if (!tempChecker(killedState[k].value, tempArray)) {
        var tempValue = {
          value: killedState[k].value,
          parent: state[i].value,
        };
        tempArray.push(tempValue);
      }
    }
  }
  if (tempArray.length === 1) {
    for (let w = 0; w < state.length; w++) {
      if (
        state[w].value[0] === tempArray[0].value[0] &&
        state[w].value[1] === tempArray[0].value[1] &&
        state[w].value[2] === tempArray[0].value[2] &&
        state[w].parent[0] === tempArray[0].parent[0] &&
        state[w].parent[1] === tempArray[0].parent[1] &&
        state[w].parent[2] === tempArray[0].parent[2]
      ) {
        if (state[w].visited) {
          fill(5, 232, 5);
        }
      }
    }
    stroke(7, 135, 240);
    line(state[i].x + 15, state[i].y + 600, state[i].x + 15, state[i].y + 730);
    noStroke();

    text(
        tempArray[0].value, 
        state[i].x, 
        state[i].y + 10
    );
    
    fill(252, 34, 5);
    for (let b = 0; b < state.length; b++) {
      if (
        state[b].value[0] === tempArray[0].value[0] &&
        state[b].value[1] === tempArray[0].value[1] &&
        state[b].value[2] === tempArray[0].value[2]
      ) {
        state[b].x = state[i].x + 50;
        state[b].y = state[i].y - 20;
      }
    }
  } else if (tempArray.length !== 0 && tempArray.length % 2 === 0) {
    for (p = 0; p < tempArray.length; p++) {
      for (let q = 0; q < state.length; q++) {
        if (
          state[q].value[0] === tempArray[p].value[0] &&
          state[q].value[1] === tempArray[p].value[1] &&
          state[q].value[2] === tempArray[p].value[2] &&
          state[q].parent[0] === tempArray[p].parent[0] &&
          state[q].parent[1] === tempArray[p].parent[1] &&
          state[q].parent[2] === tempArray[p].parent[2]
        ) {
          if (state[q].visited === true) {
            fill(5, 232, 5);
          } else {
            fill(252, 192, 13);
          }
        }
      }
      //stroke(255, 255, 255)
      stroke(7, 100, 240);
      line(
        -state[i].x + 940,
        state[i].y + 540,
        -state[i].x + 990,
        state[i].y -  25 * (tempArray.length - 1) + p * 50 + 540
      );
      noStroke();

      //a
      text(
        "[ " + tempArray[p].value + " ]",
        -state[i].x + 1000,
        (state[i].y - 25 * (tempArray.length - 4)) + p * 50 + 390 + 80 + 5
      );
      fill(255, 0, 0);

      for (let b = 0; b < state.length; b++) {
        if (
          state[b].value[0] === tempArray[p].value[0] &&
          state[b].value[1] === tempArray[p].value[1] &&
          state[b].value[2] === tempArray[p].value[2]
        ) {
          (state[b].x = state[i].x  - 120),
            state[i].y + 0;
          state[b].y = state[i].y - (23 * (tempArray.length - 1)) + p * 48, state[i].x + 280;
        }
      }
    }
  } else {
    for (l = 0; l < tempArray.length; l++) {
      for (let q = 0; q < state.length; q++) {
        if (
          state[q].value[0] === tempArray[l].value[0] &&
          state[q].value[1] === tempArray[l].value[1] &&
          state[q].value[2] === tempArray[l].value[2] &&
          state[q].parent[0] === tempArray[l].parent[0] &&
          state[q].parent[1] === tempArray[l].parent[1] &&
          state[q].parent[2] === tempArray[l].parent[2]
        ) {
          if (state[q].visited === true) {
            fill(5, 232, 5);
          } else {
            fill(252, 192, 13);
          }
        }
      }
      //stroke(255, 255, 255)
      stroke(7, 100, 240);
      line(
        -state[i].x + 940, 
        state[i].y + 545,
        -state[i].x + 990,
        state[i].y - (tempArray.length - 3) * 25 - 50 + l * 50 + 545
      ); 
      noStroke();

      //b
      text(
        "[ " + tempArray[l].value + " ]",
        -state[i].x + 1000,
        (state[i].y - (tempArray.length - 9) * 25 - 50) + l * 50 + 240 + 80 + 80 + 5 
        );
      
      fill(252, 34, 5);
      for (let b = 0; b < state.length; b++) {
        if (
          state[b].value[0] === tempArray[l].value[0] &&
          state[b].value[1] === tempArray[l].value[1] &&
          state[b].value[2] === tempArray[l].value[2]
        ) {
          (state[b].x = state[i].x - 120),
            state[i].y - 0;
          state[b].y = ((state[i].y) - ((tempArray.length - 3) * 23) - 50) + l * 48, state[i].x + 80;
        }
      }
    }
  }
}


// Function to check if the obtained state is goal state or not.
function tempChecker(value, goalArray) {
  for (let i = 0; i < goalArray.length; i++) {
    if (
      goalArray[0] === value[0] &&
      goalArray[1] === value[1] &&
      goalArray[2] === value[2]
    ) {
      return true;
    }
  }
  return false;
}
