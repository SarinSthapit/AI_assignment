let missionaryCount;
let cannibalCount;
let tracker = [3, 3, 1];
let parent;

document.querySelector('#oneMissionary').addEventListener('click', () => play(1, 0));
document.querySelector('#oneCannibal').addEventListener('click', () => play(0, 1));
document.querySelector('#twoMissionaries').addEventListener('click', () => play(2, 0));
document.querySelector('#twoCannibals').addEventListener('click', () => play(0, 2));
document.querySelector('#oneMissionaryOneCannibal').addEventListener('click', () => play(1, 1));

const play = (M, C) => {
    missionaryCount = M
    cannibalCount = C;
    applyMove(missionaryCount, cannibalCount);
}

 
function applyMove(M, C) {
    parent = tracker;
    // When the boat is in the left bank.
    if(tracker[2] === 1) {
        if(M + C <= 2) {
            if(M > tracker[0]  || C > tracker[1]) {
                console.log("Invalid Move");
            }else {
                tracker[0] = tracker[0] - M;
                tracker[1] = tracker[1] - C;
                if(tracker[2] === 1 ? tracker[2] = 0 : tracker[2] = 1);
                console.log(tracker);
                if(tracker[0] === 0 && tracker[1] === 0 && tracker[2] === 0) {                  
                    console.log("YOU WON");
                    alert("You won! Press enter to play again!");
                    location.reload();
                }else if(checkfromState()) {
                    console.log("Acceptable State");
                }else {
                    console.log("GAME OVER");
                    alert("GAME OVER!");
                    location.reload();
                }
            }
        }else {
            console.log("Cannot accomodate more than two people in a boat");
        }
    }else {
        // When the boat is in the right bank.
        if(M > (3 - tracker[0]) || C > (3 - tracker[1])) {
            console.log("This means invalid input");
        }else {
            tracker[0] = tracker[0] + M;
            tracker[1] = tracker[1] + C;
            (tracker[2] === 1 ? tracker[2] = 0 : tracker[2] = 1); 
            console.log(tracker);
            if(tracker[0] === 0 && tracker[1] === 0 && tracker[2] === 0) {
                console.log("YOU WON");
            }else if(checkfromState()) {
                console.log("Acceptable State");
            }else {
                console.log("Game Over");
            }
        }
    }
}


// To check for the acceptability of the state
function checkfromState() {
    for(let i = 0; i < state.length; i++) {
        if(state[i].value[0] === tracker[0] && state[i].value[1] === tracker[1] && state[i].value[2] === tracker[2]) {
            return true;
        }
    }
    return false;
}
