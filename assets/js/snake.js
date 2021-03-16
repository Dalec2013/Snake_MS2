/*----------------------------------------------------------------------------------------------------------------------------------------
    Variables
 -----------------------------------------------------------------------------------------------------------------------------------------
 */
var snake;
var snakeLength;
var snakeSize;
var snakeDirection;
var snakeHeadX;
var snakeHeadY;

var food;

var ctx;
var screenWidth;
var screenHeight;

var gameState;
var gameOverMenu;
var startGameMenu;
var restartButton;
var scoreBoard;

var xDown = null;                                                        
var yDown = null;
/*------------------------------------------------------------------------------------------------------------------------------------------
    Game Code Execution
  ------------------------------------------------------------------------------------------------------------------------------------------
  */
gameInitialize();
noScroll();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1000 / 20);


/*------------------------------------------------------------------------------------------------------------------------------------------
    Game Functions
  ------------------------------------------------------------------------------------------------------------------------------------------
  */
function gameInitialize() {
    var cvs = document.getElementById("gameScreen");
    ctx = cvs.getContext("2d");

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    cvs.width = screenWidth;
    cvs.height = screenHeight;

    document.addEventListener("keydown", keyboardHandler);
    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);

    gameOverMenu = document.getElementById("gameOver");
    centerMenuPosition(gameOverMenu);

    scoreBoard = document.getElementById("scoreBoard");
    score = document.getElementById("score");

    startGameMenu = document.getElementById("startGame");
    centerMenuPosition(startGameMenu);

    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", gameRestart);
    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("touchstart", gameRestart);


    startButton = document.getElementById("startButton");
    startButton.addEventListener("click", startGame);
    startButton = document.getElementById("startButton");
    startButton.addEventListener("touchstart", startGame);

    setState("PLAY");
    
}

function gameLoop() {
    gameDraw();
    drawScoreBoard();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
    }
}

function gameDraw() {
    ctx.fillStyle = "rgb(67,78,161)";
    ctx.fillRect(0, 0, screenWidth, screenHeight);
}

function startGame(){
    snakeInitialize();
    foodInitialize();
    hideMenu(startGameMenu);
    setState("PLAY");
}

function gameRestart(){
    snakeInitialize();
    foodInitialize();
    hideMenu(gameOverMenu);
    setState("PLAY");
}

/*-----------------------------------------------------------------------------------------------------------------------------------------
    Snake Functions
  -----------------------------------------------------------------------------------------------------------------------------------------
  */

function snakeInitialize() {
    snake = [];
    snakeLength = 1;
    snakeSize = 40;
    snakeDirection = "idle";

    for (var i = snakeLength - 1; i >= 0; i--) {
        snake.push({
            x: i,
            y: 0
        });
    }
}

function snakeDraw() {
    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#2EE916";
        ctx.fillRect(snake[i].x * snakeSize, snake[i].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    snakeHeadX = snake[0].x;
    snakeHeadY = snake[0].y;

    if (snakeDirection == "right") {
        snakeHeadX++;
    }
    else if (snakeDirection == "down") {
        snakeHeadY++;
    }
    else if (snakeDirection == "left") {
        snakeHeadX--;
    }
    else if (snakeDirection == "up") {
        snakeHeadY--;
    }

    checkFoodCollision();
    checkSnakeCollision();
    checkWallCollision();

    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

/*-----------------------------------------------------------------------------------------------------------------------------------------
    Food Functions
  -----------------------------------------------------------------------------------------------------------------------------------------
  */

function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw() {
    ctx.fillStyle = "#F42208";
    ctx.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodPosition() {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);

    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}

/*--------------------------------------------------------------------------------------------------------------------------------------
    Keyboard Handler Event
----------------------------------------------------------------------------------------------------------------------------------------
*/

function keyboardHandler(event) {

    if (event.keyCode == "37" && snakeDirection != "right") {
        snakeDirection = "left";
    }
    else if (event.keyCode == "38" && snakeDirection != "down") {
        snakeDirection = "up";
    }
    else if (event.keyCode == "39" && snakeDirection != "left") {
        snakeDirection = "right";
    }
    else if (event.keyCode == "40" && snakeDirection != "up") {
        snakeDirection = "down";
    }
}


/*-----------------------------------------------------------------------------------------------------------------------------------------
    Collision Handling
  -----------------------------------------------------------------------------------------------------------------------------------------
  */

function checkFoodCollision() {
    if (snakeHeadX == food.x && snakeHeadY == food.y) {
        snake.push({
            x: 0,
            y: 0
        });
        snakeLength++;
        setFoodPosition();
    }
}

function checkWallCollision() {
    if (snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0 ||
        snakeHeadY * snakeSize >= screenHeight || snakeHeadY * snakeSize < 0) {
        setState("GAME OVER");
    }
}

function checkSnakeCollision(snakeHeadX, snakeHeadY){
    for(var i = 1; i < snakeLength; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            setState("GAME OVER")
            return;
        }
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------------------
   Game State Handling
   ----------------------------------------------------------------------------------------------------------------------------------------
   */

function setState(state) {
    gameState = state;
    showMenu(state);
}

/*------------------------------------------------------------------------------------------------------------------------------------------
    Game Menu
 -------------------------------------------------------------------------------------------------------------------------------------------
 */

function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function hideMenu(menu){
    menu.style.visibility = "hidden";
}

function showMenu(state) {
    if (state == "GAME OVER") {
        displayMenu(gameOverMenu);
    }
    else if (state == "PLAY"){
        displayMenu(scoreBoard);
    }
    
   
}

function centerMenuPosition(menu) {
    menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
    menu.style.left = (screenWidth / 2) - (menu.offsetWidth / 2) + "px";
    
}

function drawScoreBoard(){
    score.innerHTML = "Length: " + snakeLength;
}

/*--------------------------------------------------------------------------------------------------------------------------------------------
    Touch Handler
    -----------------------------------------------------------------------------------------------------------------------------------------
    */

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
             (event.touchmove == "left" && snakeDirection != "right") 
                   snakeDirection = "left";
        } else {
            /* right swipe */
              (event.touchmove == "right" && snakeDirection != "left") 
        snakeDirection = "right";
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
             (event.touchmove == "up" && snakeDirection != "down") 
        snakeDirection = "up";
        } else { 
            /* down swipe */
           (event.keyCode == "down" && snakeDirection != "up") 
        snakeDirection = "down";
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

/*------------------------------------------------------------------------------------------------------------------------------------------
    Scroll Function
--------------------------------------------------------------------------------------------------------------------------------------------
*/

function noScroll(){
    window.removeEventListener("scroll", noScroll);
};