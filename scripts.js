
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

let grid = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 13, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 2, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 12, 11, 10, 0, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 3, 0, 1, 1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 1, 1, 0, 3, 1, 0,
    0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0,
    0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //                         X  X  X
] // 21 elements in a row!

const cleanGrid = grid;

// ### GRID VARIABLES
const grid_width = 840; // Width of map 
const grid_height = 840; // Height of map
const elementsInRow = 21;

const blockSize = 41; // this is size of block in px to generate map

// ### Starting values to position blocks!
let currentTop = 0;
let currentLeft = 0;

const gridElement = document.getElementById("gridId");
const gameoverElement = document.getElementById("gameoverBlock");

// ### Player variables
let player;
let playerIndex = grid.indexOf(9);
let isIntervalOn = false;
let playerInterval;
let canPlay = false;
let firstKeyTouched = false;

let lockKey; // Helper to lock key if we already going in that direction
let playerState = 'normal' // only two options, normal | super. If on super, we eat ghosts ;x
let playerLives = 3;

const playerStartingIndex = 325;
const playerBaseTop = "615px";
const playerBaseLeft = "410px";

// ### Points Values
const playerScoreElement = document.getElementById("playerScore");
const playerLivesElement = document.getElementById("playerLives");

let playerPoints = 0;
const point = 10;
const superPoint = 100;

const INTERVAL_DELAY = 200;
const directionKeys = ['KeyW', 'KeyS', 'KeyA', 'KeyD'];
const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
let highestScore;
let highestScoreElement = document.getElementById("highestScore");

if (!window.localStorage.getItem("highestScore")) {
    highestScore = 0;
} else {
    highestScore = window.localStorage.getItem("highestScore");
    highestScoreElement.innerHTML = `Highest Score: ${highestScore}`
}



// ### Ghosts
class Ghost {
    constructor(gridIndex, ghostElement, ghostStartingIndex, ghostLastPosition, ghostInterval, ghostIntervalOn, ghostName, otherGhostsIndexes, baseGridIndex, baseElementTop, baseElementLeft) {
        this.gridIndex = gridIndex
        this.Element = ghostElement;
        this.Index = ghostStartingIndex;
        this.LastPosition = ghostLastPosition;
        this.Interval = ghostInterval;
        this.IntervalOn = ghostIntervalOn;
        this.Name = ghostName;
        this.OtherGhosts = otherGhostsIndexes;
        this.baseGridIndex = baseGridIndex
        this.baseElementTop = baseElementTop;
        this.baseElementLeft = baseElementLeft;
    }
}

let allGhosts = []; // Helper that stores all instances of ghosts

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

    let pathPoint;
    // For loop for every GRID number

    for (let i = 0; i < grid.length; i++) {

        let block = document.createElement("div");

        // If there is max block in row we reset left and add top to next row 
        if (currentLeft >= grid_width) {
            currentTop += blockSize
            currentLeft = 0;
        }

        switch (grid[i]) {
            case 0:
                block.classList.add("block");
                break;
            case 1:
                block.classList.add("path-block");
                // Every path-block has white point
                pathPoint = document.createElement("div");
                pathPoint.classList.add("path-point");
                block.appendChild(pathPoint);
                break;
            case 2:
                block.classList.add("path-block");
                break;
            case 3:
                block.classList.add("path-block");
                // Every path-block has white point
                pathPoint = document.createElement("div");
                pathPoint.classList.add("path-superPoint");
                block.appendChild(pathPoint);
                break;
            case 9:
                block.classList.add("player-block");
                block.setAttribute("id", "player");
                break;
            case 10:
                block.classList.add("ghost");
                block.classList.add("ghost-red");
                block.setAttribute("id", "ghostRed")
                break;
            case 11:
                block.classList.add("ghost");
                block.classList.add("ghost-blue");
                block.setAttribute("id", "ghostBlue")
                break;
            case 12:
                block.classList.add("ghost");
                block.classList.add("ghost-yellow");
                block.setAttribute("id", "ghostYellow")
                break;
            case 13:
                block.classList.add("ghost");
                block.classList.add("ghost-purple");
                block.setAttribute("id", "ghostPurple")
                break;

            default:
                console.log("Something went wrong!")
                return false;
        }

        block.style.top = `${currentTop}px`;
        block.style.left = `${currentLeft}px`;

        gridElement.appendChild(block);

        currentLeft += blockSize;
    }

    return true;

}

function displayGrid() {
    let chunk = [];

    for (let i = 0; i < grid.length; i++) {

        if (i % (21) == 0 && i > 0) {
            console.log(chunk.join(', '))
            chunk = []
        }

        chunk.push(grid[i])

        if (i == grid.length - 1) {
            console.log(chunk.join(', '))
        }
    }

    console.log("===")
}

// This setups lives in html
function setupLives() {
    for (let i = 0; i < playerLives; i++) {
        let liveBlock = document.createElement("div");
        playerLivesElement.appendChild(liveBlock);
    }
}

// This removes childs (lives) from parent element 
function removeLive() {
    if (playerLives >= 0) {
        playerLivesElement.firstElementChild.remove();
    }

}

// This updates score on board 
function updateScore(points) {
    playerPoints += points;
    playerScoreElement.innerHTML = `Score: ${playerPoints}`;
}





// ####
// GHOST MOVEMENT
// ###

function clearAllGhostsInterval() {
    for (let i = 0; i < allGhosts.length; i++) {
        clearGhostInterval(allGhosts[i])
    }
}

function clearGhostInterval(ghost) {

    if (ghost.IntervalOn == true) {
        ghost.Interval = clearInterval(ghost.Interval);
        ghost.Interval = null;
        ghost.IntervalOn = false;
    }

}

function startGhostInterval(ghost) {
    if (ghost.IntervalOn == false) {
        ghost.Interval = setInterval(function () {
            ghostMoveRandom(ghost)
        }, 200)
        ghost.IntervalOn = true;
    }
}

function findGhostByIdx(ghostIdx) {
    for (let i = 0; i < allGhosts.length; i++) {
        if (allGhosts[i].gridIndex == ghostIdx) {
            return i;
        }
    }
}

// This function moves ghosts ON GRID
function swapCorrectGhostGridPosition(ghost, moveValue) {

    if (grid[ghost.Index + moveValue] == 9) {
        grid[ghost.Index + moveValue] = ghost.gridIndex;
        grid[ghost.Index] = 1;
        ghost.Index += moveValue;
        ghostPlayerInteraction(ghost.gridIndex)
    }
    else {
        grid[ghost.Index + moveValue] = ghost.gridIndex;
        grid[ghost.Index] = 1;
        ghost.Index += moveValue;
    }


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

    // console.log(ghost.Name, possibleNextMoves, "Next move:", pickRandomMove)

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

    // If ghost step on player
    if (grid[ghost.Index - 1] == 9 || grid[ghost.Index + 1] == 9 || grid[ghost.Index - elementsInRow] == 9 || grid[ghost.Index + elementsInRow] == 9) {
        ghostPlayerInteraction(ghost.gridIndex)
    }
    else {
        if (grid[ghost.Index - 1] != 0 && ghost.LastPosition != "RIGHT" && !ghost.OtherGhosts.includes(grid[ghost.Index - 1])) possibleNextMoves.push("LEFT");
        if (grid[ghost.Index + 1] != 0 && ghost.LastPosition != "LEFT" && !ghost.OtherGhosts.includes(grid[ghost.Index + 1])) possibleNextMoves.push("RIGHT");
        if (grid[ghost.Index - elementsInRow] != 0 && ghost.LastPosition != "DOWN" && !ghost.OtherGhosts.includes(grid[ghost.Index - elementsInRow])) possibleNextMoves.push("UP");
        if (grid[ghost.Index + elementsInRow] != 0 && ghost.LastPosition != "UP" && !ghost.OtherGhosts.includes(grid[ghost.Index + elementsInRow])) possibleNextMoves.push("DOWN");

    }

    return possibleNextMoves;
}

function ghostsController() {

    for (let i = 0; i < allGhosts.length; i++) {
        let ghost = allGhosts[i];
        if (ghost.IntervalOn == false) {
            ghost.Interval = setInterval(function () {
                ghostMoveRandom(ghost)
            }, 200)
            ghost.IntervalOn = true;
        }

    }

}


// ####
// EVERY THING ABOUT USER MOVEMENT!
// ####
function playAgain() {
    document.location.reload()
}

function GameOver() {
    canPlay = false;

    clearAllGhostsInterval();
    clearPlayerInterval();

    restartAllGhostsPositions();
    restartPlayerPosition();


    // Save score if we have new max!

    if (playerPoints > highestScore) {
        window.localStorage.setItem("highestScore", playerPoints)
        highestScore = window.localStorage.getItem("highestScore");
    }

    highestScoreElement.innerHTML = `Highest Score: ${highestScore}`

    gameoverElement.style.display = "block";

}

// Restart all after losing life
function gotEatenRestartPositions() {
    clearPlayerInterval();
    clearAllGhostsInterval();

    setTimeout(function () {
        // Sooo.. this function below has to be called two times and it gives me the result i need
        // For now i dont understand why it needs to be called two times .. 
        restartAllGhostsPositions();
        restartAllGhostsPositions();

        restartPlayerPosition();
    }, 400)



    setTimeout(function () {
        ghostsController();
    }, 1000)


    // start();
}

// restart all ghosts positions to base
function restartAllGhostsPositions() {
    for (let i = 0; i < allGhosts.length; i++) {

        let ghost = allGhosts[i];
        // ghost.Index = ghost.baseGridIndex;
        clearGhostInterval(ghost)
        ghost.LastPosition = "";
        ghost.Element.style.top = ghost.baseElementTop;
        ghost.Element.style.left = ghost.baseElementLeft;


        grid[ghost.Index] = 1;
        grid[ghost.baseGridIndex] = ghost.gridIndex;
        ghost.Index = grid.indexOf(ghost.gridIndex);
        ghost.LastPosition = "";

    }

    // displayGrid()
}

function restartGhostPosition(hittedGhost) {


    clearGhostInterval(hittedGhost)

    hittedGhost.LastPosition = "";
    hittedGhost.Element.style.top = hittedGhost.baseElementTop;
    hittedGhost.Element.style.left = hittedGhost.baseElementLeft;

    grid[hittedGhost.Index] = 1;
    grid[hittedGhost.baseGridIndex] = hittedGhost.gridIndex;
    hittedGhost.Index = grid.indexOf(hittedGhost.gridIndex);

}

function restartPlayerPosition() {
    player.style.top = playerBaseTop;
    player.style.left = playerBaseLeft;

    lockKey = "";
    grid[playerIndex] = 1;
    grid[playerStartingIndex] = 9;
    playerIndex = playerStartingIndex;
}

function ghostPlayerInteraction(ghostIdx) {

    let ghostObjIdx = findGhostByIdx(ghostIdx);
    let hittedGhost = allGhosts[ghostObjIdx];

    if (playerState == "normal") {

        // losing life or game over
        playerLives--;
        removeLive();

        if (playerLives <= 0) {
            GameOver();
        }
        else {
            gotEatenRestartPositions();
        }
    }
    else if (playerState == "super") {

        // We should add 200 points to player
        updateScore(200);

        // clear ghost interval
        setTimeout(function () {
            clearGhostInterval(hittedGhost);

            // Fade out animation
            hittedGhost.Element.classList.add("ghost-fadeOut");
        }, 200)


        // Hide him and put him in base
        setTimeout(function () {
            restartGhostPosition(hittedGhost)
        }, 1000)


        // Show him and give him a 5 second stay in base
        setTimeout(function () {
            hittedGhost.Element.classList.remove("ghost-fadeOut");
            hittedGhost.Element.classList.add("ghost-fadeIn");
        }, 1700)

        setTimeout(function () {
            startGhostInterval(hittedGhost);
            hittedGhost.Element.classList.remove("ghost-fadeIn");
        }, 5000)
    }
}

// This code adds eventListener that passes key press to moveController()
document.addEventListener('keydown', (event) => {

    if (firstKeyTouched === false) {
        activateGhostsAfterFirstKeyPress()
        firstKeyTouched = true;
    }


    if (playerLives > 0 && canPlay) {
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
    let possibleBlocks = [1, 2, 3, 10, 11, 12, 13];

    if (possibleBlocks.includes(grid[playerIndex - 1])) possibleNextMoves.push("LEFT");
    if (possibleBlocks.includes(grid[playerIndex + 1])) possibleNextMoves.push("RIGHT");
    if (possibleBlocks.includes(grid[playerIndex - elementsInRow])) possibleNextMoves.push("UP");
    if (possibleBlocks.includes(grid[playerIndex + elementsInRow])) possibleNextMoves.push("DOWN");

    return possibleNextMoves;
}

// Helper function for playerMove(), to make it shorter and cleaner
function gridSwap(nextIndexDistance) {

    let ghostBlocks = [10, 11, 12, 13];

    if (ghostBlocks.includes(grid[playerIndex + nextIndexDistance])) {
        ghostPlayerInteraction(grid[playerIndex + nextIndexDistance])

        grid[playerIndex] = 1;
        grid[playerIndex + nextIndexDistance] = 9;
        playerIndex += nextIndexDistance;
    }
    else {
        grid[playerIndex + nextIndexDistance] = 9;
        grid[playerIndex] = 1;
        playerIndex += nextIndexDistance;
    }

}

// Adds point and changes state if we got super point 
function gatherPoint() {

    let currentPlayerPosition = gridElement.childNodes[playerIndex + 1];

    // HERE We are adding points whether we step on normal or super point!
    if (currentPlayerPosition.firstChild) {
        if (currentPlayerPosition.firstChild.classList.contains('path-point')) {
            updateScore(point)
        }

        // Player ate super point!
        // 6 seconds of power
        if (currentPlayerPosition.firstChild.classList.contains('path-superPoint')) {
            updateScore(superPoint)
            playerState = "super";

            // if we already have super point 
            // WORK ON IT NOW
            // if (player.classList.contains("player-animation")) {
            //     setTimeout(function () {
            //         player.classList.toggle("player-animation");
            //         playerState = "normal";
            //     }, 6000)
            // }
            // else {
            //     player.classList.toggle("player-animation");
            //     setTimeout(function () {
            //         player.classList.toggle("player-animation");
            //         playerState = "normal";
            //     }, 6000)
            // }
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

function activateGhostsAfterFirstKeyPress() {
    setTimeout(function () {
        ghostsController();
    }, 200)
}

function start() {

    grid = cleanGrid;
    generateGrid();

    // Ghost Red -- 10 -- starting Position on grid: 242
    ghostRedElement = document.getElementById("ghostRed");
    ghostRed = new Ghost(10, ghostRedElement, grid.indexOf(10), null, null, false, "red", [11, 12, 13], grid.indexOf(10), ghostRedElement.style.top, ghostRedElement.style.left)

    // Ghost Blue - 11 -- starting Position on grid: 240
    ghostBlueElement = document.getElementById("ghostBlue");
    ghostBlue = new Ghost(11, ghostBlueElement, grid.indexOf(11), null, null, false, "blue", [10, 12, 13], grid.indexOf(11), ghostBlueElement.style.top, ghostBlueElement.style.left)

    // // Ghost Yellow - 12 -- starting Position on grid: 241
    ghostYellowElement = document.getElementById("ghostYellow");
    ghostYellow = new Ghost(12, ghostYellowElement, grid.indexOf(12), null, null, false, "yellow", [10, 11, 13], grid.indexOf(12), ghostYellowElement.style.top, ghostYellowElement.style.left)

    // // Ghost Purple - 13 -- starting Position on grid: 178
    ghostPurpleElement = document.getElementById("ghostPurple");
    ghostPurple = new Ghost(13, ghostPurpleElement, grid.indexOf(13), null, null, false, "purple", [10, 11, 12], grid.indexOf(13), ghostPurpleElement.style.top, ghostPurpleElement.style.left)


    allGhosts = [ghostRed, ghostBlue, ghostYellow, ghostPurple]

    playerIndex = playerStartingIndex;

    player = document.getElementById("player");
    player.style.top = playerBaseTop;
    player.style.left = playerBaseLeft;


    canPlay = true;

    setupLives();

}

start();




