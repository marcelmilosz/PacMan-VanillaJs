
// Grid number types 
// 0 - wall 
// 1 - empty | path for pacman and normal points
// 2 - ONLY Path | For ghosts spawn or Path that user went and got a point
// 3 - SuperPoint
// 9 - Player 


const grid = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 1, 0, 2, 2, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 0,
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

// starting values to position blocks!
let currentTop = 0;
let currentLeft = 0;

const gridElement = document.getElementById("gridId");

// ### Player variables
let player;
let playerIndex = grid.indexOf(9);
let isIntervalOn = false;
let playerInterval;
let lockKey; // Helper to lock key if we already going in that direction

// ### Points Values
let playerPoints = 0;
const point = 10;
const superPoint = 100;

const INTERVAL_DELAY = 200;
const directionKeys = ['KeyW', 'KeyS', 'KeyA', 'KeyD'];
const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];



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


        block.style.top = `${currentTop}px`;
        block.style.left = `${currentLeft}px`;

        gridElement.appendChild(block);

        currentLeft += blockSize;

    }

}


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
}

start();





