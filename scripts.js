
// Grid number types 
// 0 - wall 
// 1 - empty | path for pacman and normal points
// 2 - ONLY Path | For ghosts spawn or Path that user went and got a point
// 3 - SuperPoint
// 9 - Player 
// 10 - RED ghost
// 11 - Blue ghost
// 12 - Yellow ghost
// 13 - Purple ghost


const grid = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 13, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 1, 0, 2, 2, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 11, 12, 10, 0, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 3, 0, 1, 1, 1, 1, 0, 1, 9, 1, 0, 1, 1, 1, 1, 0, 3, 1, 0,
    0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0,
    0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //                         X  X  X
] // 21 elements in a row!

// ### GRID VARIABLES
const grid_width = 840; // Width of map 
const grid_height = 840; // Height of map
const elementsInRow = 21;

const blockSize = 41; // this is size of block in px to generate map

// ### Starting values to position blocks!
let currentTop = 0;
let currentLeft = 0;

const gridElement = document.getElementById("gridId");

// ### Player variables
let player;
let playerIndex = grid.indexOf(9);
let isIntervalOn = false;
let playerInterval;
let lockKey; // Helper to lock key if we already going in that direction
let playerState = 'normal' // only two options, normal | super. If on super, we eat ghosts ;x

// ### Points Values
let playerPoints = 0;
const point = 10;
const superPoint = 100;

const INTERVAL_DELAY = 200;
const directionKeys = ['KeyW', 'KeyS', 'KeyA', 'KeyD'];
const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];


// ### Ghosts
class Ghost {
    constructor(gridIndex, ghostElement, ghostStartingIndex, ghostLastPosition, ghostIntervalOn, ghostName, otherGhostsIndexes) {
        this.gridIndex = gridIndex
        this.Element = ghostElement;
        this.Index = ghostStartingIndex;
        this.LastPosition = ghostLastPosition;
        this.IntervalOn = ghostIntervalOn;
        this.Name = ghostName;
        this.OtherGhosts = otherGhostsIndexes;
    }
}

let ghostRedElement; // Initialized in start() element 
let ghostRed; // Initialized in start()

let ghostBlueElement;
let ghostBlue;

let ghostPurpleElement;
let ghostPurple;

let ghostYellowElement;
let ghostYellow;


// This function generates grid
function generateGrid() {

    // For loop for every GRID number
    for (let i = 0; i < grid.length; i++) {

        let block = document.createElement("div");

        // If there is max block in row we reset left and add top to next row 
        if (currentLeft >= grid_width) {
            currentTop += blockSize
            currentLeft = 0;
        }

        // Here we add different classes for blocks as grid shows
        if (grid[i] == 0) {
            block.classList.add("block");
        }
        else if (grid[i] == 1) {
            block.classList.add("path-block");
            // Every path-block has white point
            let pathPoint = document.createElement("div");
            pathPoint.classList.add("path-point");
            block.appendChild(pathPoint);
        }
        else if (grid[i] == 2) {
            block.classList.add("path-block");
        }
        else if (grid[i] == 3) {
            block.classList.add("path-block");
            // Every path-block has white point
            let pathPoint = document.createElement("div");
            pathPoint.classList.add("path-superPoint");
            block.appendChild(pathPoint);
        }
        else if (grid[i] == 9) {
            block.classList.add("player-block");
            block.setAttribute("id", "player")
        }
        else if (grid[i] == 10) {
            block.classList.add("ghost");
            block.classList.add("ghost-red");
            block.setAttribute("id", "ghostRed")
        }
        else if (grid[i] == 11) {
            block.classList.add("ghost");
            block.classList.add("ghost-blue");
            block.setAttribute("id", "ghostBlue")
        }
        else if (grid[i] == 12) {
            block.classList.add("ghost");
            block.classList.add("ghost-yellow");
            block.setAttribute("id", "ghostYellow")
        }
        else if (grid[i] == 13) {
            block.classList.add("ghost");
            block.classList.add("ghost-purple");
            block.setAttribute("id", "ghostPurple")
        }


        block.style.top = `${currentTop}px`;
        block.style.left = `${currentLeft}px`;

        gridElement.appendChild(block);

        currentLeft += blockSize;

    }

}

// ####
// GHOST MOVEMENT

// Here ghost ate player!
function playerGotEaten() {
    console.log("Player eaten");
}

// This function moves ghosts ON GRID
function swapCorrectGhostGridPosition(ghost, moveValue) {

    if (grid[ghost.Index + moveValue] == 9) {
        playerGotEaten();
    }
    grid[ghost.Index + moveValue] = ghost.gridIndex;
    grid[ghost.Index] = 1;
    ghost.Index += moveValue;

}

// Function for moving single ghost in random possible path
function ghostMoveRandom(ghost) {
    let possibleNextMoves = ghostPossibleMoves(ghost);
    let currentGhostTop = parseInt((ghost.Element.style.top).replace("px", ""));
    let currentGhostLeft = parseInt((ghost.Element.style.left).replace("px", ""));

    let pickRandomMove = possibleNextMoves[Math.floor(Math.random() * possibleNextMoves.length)];

    // It might happen that both ghost got stuck on base, so keep it to prevent from it
    if (pickRandomMove === undefined) {
        ghost.LastPosition = null;
        pickRandomMove = possibleNextMoves[Math.floor(Math.random() * possibleNextMoves.length)];
    }

    console.log(ghost.Name, possibleNextMoves, "Next move:", pickRandomMove)

    if (pickRandomMove == "LEFT") {
        ghost.Element.style.left = `${currentGhostLeft - blockSize}px`;
        ghost.LastPosition = "LEFT"
        swapCorrectGhostGridPosition(ghost, -1);
    }
    else if (pickRandomMove == "RIGHT") {
        ghost.Element.style.left = `${currentGhostLeft + blockSize}px`;
        ghost.LastPosition = "RIGHT"
        swapCorrectGhostGridPosition(ghost, 1);
    }
    else if (pickRandomMove == "UP") {
        ghost.Element.style.top = `${currentGhostTop - blockSize}px`;
        ghost.LastPosition = "UP"
        swapCorrectGhostGridPosition(ghost, -elementsInRow);
    }
    else if (pickRandomMove == "DOWN") {
        ghost.Element.style.top = `${currentGhostTop + blockSize}px`;
        ghost.LastPosition = "DOWN"
        swapCorrectGhostGridPosition(ghost, elementsInRow);
    }

}

// Possible moves for single ghost
function ghostPossibleMoves(ghost) {
    let possibleNextMoves = [];

    if (grid[ghost.Index - 1] != 0 && ghost.LastPosition != "RIGHT" && !ghost.OtherGhosts.includes(grid[ghost.Index - 1])) possibleNextMoves.push("LEFT");
    if (grid[ghost.Index + 1] != 0 && ghost.LastPosition != "LEFT" && !ghost.OtherGhosts.includes(grid[ghost.Index + 1])) possibleNextMoves.push("RIGHT");
    if (grid[ghost.Index - elementsInRow] != 0 && ghost.LastPosition != "DOWN" && !ghost.OtherGhosts.includes(grid[ghost.Index - elementsInRow])) possibleNextMoves.push("UP");
    if (grid[ghost.Index + elementsInRow] != 0 && ghost.LastPosition != "UP" && !ghost.OtherGhosts.includes(grid[ghost.Index + elementsInRow])) possibleNextMoves.push("DOWN");

    return possibleNextMoves;
}

function ghostsController() {

    // if (ghostRed.IntervalOn == false) {
    //     setInterval(function () {
    //         ghostMoveRandom(ghostRed)
    //     }, 200)
    // }

    // if (ghostBlue.IntervalOn == false) {
    //     setInterval(function () {
    //         ghostMoveRandom(ghostBlue)
    //     }, 200)
    // }

    // if (ghostYellow.IntervalOn == false) {
    //     setInterval(function () {
    //         ghostMoveRandom(ghostYellow)
    //     }, 200)
    // }

    // if (ghostPurple.IntervalOn == false) {
    //     setInterval(function () {
    //         ghostMoveRandom(ghostPurple)
    //     }, 200)
    // }

}





// ####
// EVERY THING ABOUT USER MOVEMENT!
// ####
// This code adds eventListener that passes key press to moveController()
document.addEventListener('keydown', (event) => {
    let keyPressed = event.code;
    let possibleNextMoves = possibleMoves();
    // This code checks if we clicked button and the next direction is correct
    // If we are moving and we click etc. Left where there is no wall, then we will clear interval and move there
    // If there is a wall, then interval will remain ON

    if (keyPressed == "KeyW" && possibleNextMoves.includes('UP') && lockKey != keyPressed) {
        clearPlayerInterval();
        lockCurrentKey(keyPressed);
        moveController(keyPressed);
    }
    else if (keyPressed == "KeyS" && possibleNextMoves.includes('DOWN') && lockKey != keyPressed) {
        clearPlayerInterval();
        lockCurrentKey(keyPressed);
        moveController(keyPressed);
    }
    else if (keyPressed == "KeyA" && possibleNextMoves.includes('LEFT') && lockKey != keyPressed) {
        clearPlayerInterval();
        lockCurrentKey(keyPressed);
        moveController(keyPressed);
    }
    else if (keyPressed == "KeyD" && possibleNextMoves.includes('RIGHT') && lockKey != keyPressed) {
        clearPlayerInterval();
        lockCurrentKey(keyPressed);
        moveController(keyPressed);
    }

}, false);


// Helper function to addEventListener that locks key if we are already running in this direction
function lockCurrentKey(keyPressed) {
    if (isIntervalOn == false) lockKey = directionKeys[directionKeys.indexOf(keyPressed)];
}

// Function to clear player interval if we change direction or make a correct move
function clearPlayerInterval() {
    clearInterval(playerInterval);
    isIntervalOn = false;
}

// Function that checks, where can we go from current position
function possibleMoves() {

    let possibleNextMoves = [];

    if (grid[playerIndex - 1] == 1 || grid[playerIndex - 1] == 3) possibleNextMoves.push("LEFT");
    if (grid[playerIndex + 1] == 1 || grid[playerIndex + 1] == 3) possibleNextMoves.push("RIGHT");
    if (grid[playerIndex - elementsInRow] == 1 || grid[playerIndex - elementsInRow] == 3) possibleNextMoves.push("UP");
    if (grid[playerIndex + elementsInRow] == 1 || grid[playerIndex + elementsInRow] == 3) possibleNextMoves.push("DOWN");

    return possibleNextMoves;
}

// Helper function for playerMove(), to make it shorter and cleaner
function gridSwap(nextIndexDistance) {
    grid[playerIndex + nextIndexDistance] = 9;
    grid[playerIndex] = 1;
    playerIndex += nextIndexDistance;
}

function gatherPoint() {

    let currentPlayerPosition = gridElement.childNodes[playerIndex + 1];

    // HERE We are adding points whether we step on normal or super point!
    if (currentPlayerPosition.firstChild) {
        if (currentPlayerPosition.firstChild.classList.contains('path-point')) {
            playerPoints += point;
        }
        if (currentPlayerPosition.firstChild.classList.contains('path-superPoint')) {
            playerPoints += superPoint;
            // Here add function that improves PacMan 
        }
    }

    // Removes Point or SuperPoint
    if (currentPlayerPosition.firstChild) {
        currentPlayerPosition.removeChild(currentPlayerPosition.firstChild)
    }


}

// Function that moves our player object to next block after button click
function playerMove(keyPressed) {
    // KeyW, KeyS, KeyA, KeyD

    let currentPlayerTop = parseInt((player.style.top).replace("px", ""));
    let currentPlayerLeft = parseInt((player.style.left).replace("px", ""));
    let possibleNextMoves = possibleMoves();


    if (keyPressed == "KeyA" && possibleNextMoves.includes("LEFT")) { // LEFT
        // console.log("Moving left!");
        player.style.left = `${currentPlayerLeft - blockSize}px`;
        gridSwap(-1);
        gatherPoint();
    }
    else if (keyPressed == "KeyD" && possibleNextMoves.includes("RIGHT")) { // RIGHT
        // console.log("Moving right!");
        player.style.left = `${currentPlayerLeft + blockSize}px`;
        gridSwap(1);
        gatherPoint();
    }
    else if (keyPressed == "KeyW" && possibleNextMoves.includes("UP")) { // UP
        // console.log("Moving UP!");
        player.style.top = `${currentPlayerTop - blockSize}px`;
        gridSwap(-elementsInRow);
        gatherPoint();
    }
    else if (keyPressed == "KeyS" && possibleNextMoves.includes("DOWN")) { // DOWN
        // console.log("Moving DOWN!");
        player.style.top = `${currentPlayerTop + blockSize}px`;
        gridSwap(elementsInRow);
        gatherPoint();
    }
}


// Function that adds constant move (interval) after click and manages player moves
function moveController(keyPressed) {

    playerMove(keyPressed);

    if (isIntervalOn == false) {
        playerInterval = setInterval(function () {
            playerMove(keyPressed);
        }, INTERVAL_DELAY);

        isIntervalOn = true;
    }

}

function start() {
    generateGrid();

    player = document.getElementById("player");

    // Ghost Red -- 10 
    ghostRedElement = document.getElementById("ghostRed");
    ghostRed = new Ghost(10, ghostRedElement, grid.indexOf(10), null, false, "red", [11, 12, 13]);

    // Ghost Blue - 11
    ghostBlueElement = document.getElementById("ghostBlue");
    ghostBlue = new Ghost(11, ghostBlueElement, grid.indexOf(11), null, false, "blue", [10, 12, 13])

    // Ghost Yellow - 12
    ghostYellowElement = document.getElementById("ghostYellow");
    ghostYellow = new Ghost(12, ghostYellowElement, grid.indexOf(12), null, false, "yellow", [10, 11, 13])

    // Ghost Purple - 13
    ghostPurpleElement = document.getElementById("ghostPurple");
    ghostPurple = new Ghost(13, ghostPurpleElement, grid.indexOf(13), null, false, "purple", [10, 11, 12])


    ghostsController();
}

start();





