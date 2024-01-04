let initialState = [3, 3, 1];
let goalState = [0, 0, 0];
let state = [];
let killedState = [];
let iterator = true;
// create an object for individual state
class CreateState { 
  constructor() {
    this.value;
    this.parent;
    this.visited;
    this.x;
    this.y;
  }
}
// To Create a root node.
var  rootNode = new CreateState();
rootNode.value = initialState;
rootNode.parent = initialState;
rootNode.visited = false;


// To set the screen.
function setup() {
  frameRate(3);
  
  createCanvas(windowWidth, windowHeight);
  
  noScrollBars();
  rootNode.x = windowWidth / 2;
  rootNode.y = 70;
  state.push(rootNode);
  while(iterator) {
    applyOperation(state[state.length - 1])
  }
  console.log("State:");
  console.log(state);
  console.log("Killed State:");
  console.log(killedState);
}



// To draw river, river bank, boat, 3 missionaries, and 3 cannibals.
function draw() {
  background(52, 158, 235);  
  stroke(0);
  strokeWeight(1);
  // left bank 
  // Grass
  fill(0, 123, 0);
  quad(0, windowHeight - 388, windowWidth / 2 - 202, windowHeight - 388, windowWidth / 2 - 350, windowHeight - 300, 0, windowHeight - 300);
  
  // Mud
  fill(204, 153, 0);
  quad(
        windowWidth / 2 - 350, windowHeight - 300, 
        0, windowHeight - 300, 
        0, windowHeight,
        windowWidth / 2 - 350, windowHeight  
    );

    fill(204, 153, 0);
    quad(
        windowWidth / 2 - 350, windowHeight - 300, 
        windowWidth / 2 - 350, windowHeight,
        windowWidth / 2 - 202, windowHeight - 120, 
        windowWidth / 2 - 202, windowHeight - 388
    );

    // Water 
    fill(94, 201, 255);
    quad(windowWidth / 2 - 344, 454, windowWidth / 2 + 200, 454, windowWidth / 2 + 220, windowHeight, windowWidth / 2 -  344, windowHeight);
    
    fill(21, 115, 237);
    quad(
        windowWidth / 2 - 344, 454,
        windowWidth / 2 - 200, windowHeight - 388 + 46,
        windowWidth / 2 + 364, windowHeight - 388 + 46,
        windowWidth / 2 + 344, 454
    );


  // Right bank

  // Grass
  fill(0, 123, 0);  
  quad(
    windowWidth / 2 + 200, windowHeight - 300,
    windowWidth / 2 + 300, windowHeight - 388,
    windowWidth, windowHeight - 388,
    windowWidth, windowHeight
    );

  // Mud
  fill(204, 153, 0);
  quad(
        windowWidth, windowHeight - 300, 
        windowWidth / 2 + 200, windowHeight - 300, 
        windowWidth / 2 + 200, windowHeight,
        windowWidth , windowHeight  
    );

  fill(255, 0, 0);
  

  // To set the boat position
  let x;
  if(tracker[2] === 1) {
     x = windowWidth / 2 - 220;
  }else {
     x = windowWidth / 2 + 160;
  }


  // Boat
  stroke(0);
 fill(250, 0, 0);
 x = x - 35;
 beginShape();
    vertex(x + 20, 347);
    vertex(x + 70, 347);
    vertex(x + 70, 287);
    vertex(x + 20, 347);
  endShape();
fill(246, 250, 2)
  beginShape();
    vertex(x + 122, 347);
    vertex(x + 72, 347);
    vertex(x + 72, 287);
    vertex(x + 122, 347);
  endShape();
  fill(171, 142, 89);
  beginShape();
    vertex(x + 20, 352);
    vertex(x + 40, 372);
    vertex(x + 110, 372);
    vertex(x + 130, 352);
    vertex(x + 20, 352)
  endShape();
  beginShape();
  vertex(x + 70, 352);
  vertex(x + 72, 352);
  vertex(x + 72, 282);
  vertex(x + 70, 282);
endShape(); 



  // Missionaries on the left bank
  for(let i = 0; i < tracker[0]; i++) {
    noStroke();
      // For head
      fill(255, 210, 127);
      ellipse((windowWidth / 2 - 383) + i * 50, windowHeight / 2 - 83 + 2, 30, 30);
      quad((windowWidth / 2 - 385) + i * 50, windowHeight / 2 - 83 + 15, (windowWidth / 2 - 380) + i * 50, windowHeight / 2 - 83 + 15, (windowWidth / 2 - 380) + i * 50, windowHeight / 2 - 83 + 40, (windowWidth / 2 - 385) + i  * 50, windowHeight / 2 - 83 + 40);
      
      // For hair 
      fill(79, 8, 8);
      ellipse((windowWidth / 2 - 383) + i * 50, windowHeight / 2 - 96 + 5 , 26, 12);
      
      // For left eye
      noFill();
      stroke(0);
      strokeWeight(1);
      ellipse((windowWidth / 2 - 387) + i * 50, windowHeight / 2 - 96 + 5 + 10, 1, 1);
      // For right eye
      ellipse((windowWidth / 2 - 378) + i * 50, windowHeight / 2 - 96 + 5 + 10, 1, 1);

      stroke(255, 210, 127);
      strokeWeight(3);
     // For legs
      line((windowWidth / 2 - 395) + i * 50, windowHeight / 2 - 96 + 5 + 60, (windowWidth / 2 - 383) + i * 50, windowHeight / 2 - 96 + 5 + 60 - 15);
      line((windowWidth / 2 - 372) + i * 50 , windowHeight / 2 - 96 + 5+ 60, (windowWidth / 2 - 383) + i * 50, windowHeight / 2 - 96 + 5 + 60 - 15);
      line(365 + i * 50, windowHeight / 2 - 96 + 5 + 22, 405 + i * 50, windowHeight / 2 - 96 + 5 + 22);
  }
  

  // Missionaries on the right bank
  for(let i = 0; i < 3 - tracker[0]; i++) {
    noStroke();
      // For head
      fill(255, 210, 127);
      ellipse((windowWidth / 2 + 280 + 30) + i * 50, windowHeight / 2 - 83 + 2, 30, 30);
      quad((windowWidth / 2 + 280 + 30) + i * 50, windowHeight / 2 - 83 + 15, (windowWidth / 2 - 380 + 663 + 30) + i * 50, windowHeight / 2 - 83 + 15, (windowWidth / 2 - 380 + 663 + 30) + i * 50, windowHeight / 2 - 83 + 40, (windowWidth / 2 - 385 + 663 + 30) + i  * 50, windowHeight / 2 - 83 + 40);
      
      // For hair 
      fill(79, 8, 8);
      ellipse((windowWidth / 2 + 280 + 30) + i * 50, windowHeight / 2 - 96 + 5, 26, 12);
      
      // For left eye
      noFill();
      stroke(0);
      strokeWeight(1);
      ellipse((windowWidth / 2 + 280 - 5 + 30) + i * 50, windowHeight / 2 - 96 + 5 + 10, 1, 1);
      
      // For right eye
      ellipse((windowWidth / 2 + 280 + 35) + i * 50, windowHeight / 2 - 96 + 5 + 10, 1, 1);
    
      stroke(255, 210, 127);
      strokeWeight(3);
     
      //For legs
      line((windowWidth / 2 - 395 + 663 + 30) + i * 50, windowHeight / 2 - 96 + 5 + 60, (windowWidth / 2 - 383 + 663 + 20 + 10) + i * 50, windowHeight / 2 - 96 + 5 + 60 - 15);
      line((windowWidth / 2 - 372+ 663 + 30) + i * 50 , windowHeight / 2 - 96 + 5 + 60, (windowWidth / 2 - 383 + 663 + 20 + 10) + i * 50, windowHeight / 2 - 96 + 5 + 60 - 15);
      line(365 + 663 + 30 + i * 50,  windowHeight / 2 - 96 + 5 + 22, 405 + 663 + 30 + i * 50, windowHeight / 2 - 96 + 5 + 22);
      
  }

  
  // Cannibals on the left bank
  for(let j = 0; j < tracker[1]; j++) {
    noStroke();
      // For head
      fill(217, 100, 4);
      ellipse((windowWidth / 2 - 503) + j * 50, windowHeight / 2 - 15 + 4, 30, 30);
      quad((windowWidth / 2 - 500) + j * 50, windowHeight / 2 - 15 + 4, (windowWidth / 2 - 505) + j * 50, windowHeight / 2 - 15 + 4, (windowWidth / 2 - 505) + j * 50, windowHeight / 2 - 15 + 40 + 4, (windowWidth / 2 - 500) + j  * 50, windowHeight / 2 - 15 + 40 + 4);
      
      // For green cap 
      fill(18, 168, 7);
      ellipse((windowWidth / 2 - 503) + j * 50, windowHeight / 2 - 15 - 12 + 4, 26, 12);
      
      // For left eye
      noFill();
      stroke(0);
      fill(255, 0, 0);
      strokeWeight(1);
      ellipse((windowWidth / 2 - 507) + j * 50, windowHeight / 2 - 15 + 4, 3, 3);
      
      // For right eye
      ellipse((windowWidth / 2 - 500) + j * 50, windowHeight / 2 - 15 + 4, 3, 3);
    
      stroke(217, 100, 4);
      strokeWeight(3);
     
      // For legs
      line((windowWidth / 2 - 515) + j * 50, windowHeight / 2 - 15 + 50 + 4, (windowWidth / 2 - 503) + j * 50, windowHeight / 2 - 15+ 35 + 4);
      line((windowWidth / 2 - 491) + j * 50 , windowHeight / 2 - 15 + 50 + 4, (windowWidth / 2 - 503) + j * 50, windowHeight / 2 - 15 + 35 + 4);
      line(245 + j * 50, windowHeight / 2 - 15 + 12+ 2, 285 + j * 50, windowHeight / 2 - 15 + 12 + 4);
      
  }


  // Cannibals on the right bank
  j = 0;
  for(let j = 0; j < 3 - tracker[1]; j++) {
    noStroke();
      // For head
      fill(217, 100, 4);
      ellipse((windowWidth / 2 - 503 + 693 + 20 + 20) + j * 50, windowHeight / 2 - 15 + 4, 30, 30);
      quad((windowWidth / 2 - 500 + 693 + 20 + 20) + j * 50, windowHeight / 2 - 15 + 4, (windowWidth / 2 - 505 + 693 + 20 + 20) + j * 50, windowHeight / 2 - 15 + 4, (windowWidth / 2 - 505 + 693 + 20 + 20) + j * 50, windowHeight / 2 - 15 + 40 + 4, (windowWidth / 2 - 500 + 693 + 20 + 20) + j  * 50, windowHeight / 2 - 15 + 40 + 4);
      
      // For green cap 
      fill(18, 168, 7);
      ellipse((windowWidth / 2 - 503 + 693 + 20 + 20) + j * 50, windowHeight / 2 - 15 - 12 + 4, 26, 12);
      
      // For left eye
      noFill();
      stroke(0);
      fill(255, 0, 0);
      strokeWeight(1);
      ellipse((windowWidth / 2 - 507+691 + 20 + 20) + j * 50, windowHeight / 2 - 15 + 4, 3, 3);
      
      // For right eye
      ellipse((windowWidth / 2 - 500 + 695 + 20 + 20) + j * 50, windowHeight / 2 - 15 + 4, 3, 3);
    
      stroke(217, 100, 4);
      strokeWeight(3);
      
      // For legs
      line((windowWidth / 2 - 515 + 693 + 20 + 20) + j * 50, windowHeight / 2 - 15 + 50 + 4, (windowWidth / 2 - 503 + 693 + 20 + 20) + j * 50, windowHeight / 2 - 15+ 35 + 4);
      line((windowWidth / 2 - 491 + 693 + 20 + 20) + j * 50 , windowHeight / 2 - 15 + 50 + 4, (windowWidth / 2 - 503 + 693 + 20 + 20) + j * 50, windowHeight / 2 - 15+ 35 + 4);
      line(245 + 693 + 20 + 20 + j * 50, windowHeight / 2 - 15 + 12+ 2, 285 + 693 + 20 + 20 + j * 50, windowHeight / 2 - 15 + 12+ 2); 
  }
  
}



// To generate all the possible states from the parent state
function applyOperation(tempState) {
    if(tempState.visited === true) {
      killedState.push(state[state.length - 1]);
      state.splice(state.length - 1, 1);
    }else {
    tempState.visited = true;
    boatPosition = tempState.value[2];
    // When boat sails from left to right.
    if(boatPosition === 1) {    
      
      // For 2 Missionaries
      if(tempState.value[0] >= 2) {
        addState(tempState, [tempState.value[0] - 2, tempState.value[1] - 0, 0]);
      }      

      // For 1 Missionary
      if(tempState.value[0] >= 1) {
        addState(tempState, [tempState.value[0] - 1, tempState.value[1] - 0, 0]);
      }

      // For 2 Cannibals
      if(tempState.value[1] >= 2) {
        addState(tempState, [tempState.value[0] - 0, tempState.value[1] - 2, 0]);
      }  

      // For 1 Missionary and 1 Cannibal
      if(tempState.value[0] >= 1 && tempState.value[1] >= 1) {
        addState(tempState, [tempState.value[0] - 1, tempState.value[1] - 1, 0]);
      }

      // For 1 Cannibal
      if(tempState.value[1] >= 1) {
        addState(tempState, [tempState.value[0] - 0, tempState.value[1] - 1, 0]);
      }          
    } else if(boatPosition === 0) {
      // When boat sails from right to left

      // For 1 Missionary and 1 Cannibal
      if(initialState[0] - tempState.value[0] > 0) {
        addState(tempState, [tempState.value[0] + 1, tempState.value[1] + 0, 1]);
      }
      // For 1 Cannibal
      if(initialState[1] - tempState.value[1] > 0) {
        addState(tempState, [tempState.value[0] + 0, tempState.value[1] + 1, 1]);
      }
      // For 2 Missionaries
      if(initialState[0] - tempState.value[0] > 2) {
        addState(tempState, [tempState.value[0] + 2, tempState.value[1] + 0, 1]);
      }
      // For 2 Cannibals
      if(initialState[1] - tempState.value[1] > 2) {
        addState(tempState, [tempState.value[0] + 0, tempState.value[1] + 2, 1]);
      }
      // For 1 Missionary and 1 Cannibal
      if((initialState[0] - tempState.value[0] > 0) && (initialState[1] - tempState.value[1] > 0)) {
        addState(tempState, [tempState.value[0] + 1, tempState.value[1] + 1, 1]);
      }      
    }
  }
}


// Function to check the new states, and decide to add or delete them.
function addState(parent, value) {
  var temp = new CreateState();
  temp.value = value;
  temp.parent = parent.value;
  temp.visited = false;
  if(goalState[0] === value[0] && goalState[1] === value[1]) {
    state.push(temp);
    iterator = false;
  }else if((temp.value[0] === 0) || temp.value[0] >= temp.value[1]) {
    if((3 - temp.value[0] === 0) || (3 - temp.value[0] >= 3 - temp.value[1])){
      if(repetitionChecker(value)) {
        killedState.push(temp);
      } else {
        state.push(temp);
      }
    }else {
      killedState.push(temp);
    }
  }else if(temp.value[0] < temp.value[1]) {
    killedState.push(temp); 
  }
}


// Function to check if the state already exists or not.
function repetitionChecker(value) {
  for(let i = 0; i < state.length; i++) {
    if(state[i].value[0] === value[0] && state[i].value[1] === value[1] && state[i].value[2] === value[2]) {
      return true;
    }
  }
  return false;
}


// To remove the scrollbars
function noScrollBars() {
    // Disable scrollbars by modifying the DOM
    let style = document.createElement("style");
    style.innerHTML = `
      ::-webkit-scrollbar {
          width: 0 !important;
      }
      ::-webkit-scrollbar-thumb {
          background: none !important;
      }
      ::-webkit-scrollbar-track {
          background: none !important;
      }
    `;
    document.head.appendChild(style);
  }