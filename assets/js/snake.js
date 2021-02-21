/*----------------------------------------------------------------------------------------------------------------------------------------
    Variables
 -----------------------------------------------------------------------------------------------------------------------------------------
 */
var snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var food;

var ctx;
var screenWidth;
var screenHeight;
/*------------------------------------------------------------------------------------------------------------------------------------------
    Game Code Execution
  ------------------------------------------------------------------------------------------------------------------------------------------
  */
gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1000/30);

/*------------------------------------------------------------------------------------------------------------------------------------------
    Game Functions
  ------------------------------------------------------------------------------------------------------------------------------------------
  */
function gameInitialize(){
    var cvs = document.getElementById("gameScreen");
    ctx = cvs.getContext("2d");

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    cvs.width = screenWidth;
    cvs.height = screenHeight;

    document.addEventListener("keydown", keyboardHandler);
}

function gameLoop(){
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}

function gameDraw(){
    ctx.fillStyle = "rgb(67,78,161)";
    ctx.fillRect(0, 0, screenWidth, screenHeight);
}

/*-----------------------------------------------------------------------------------------------------------------------------------------
    Snake Functions
  -----------------------------------------------------------------------------------------------------------------------------------------
  */

function snakeInitialize(){
    snake = [];
    snakeLength = 5;
    snakeSize = 20;
    snakeDirection = "right";

    for(var i = snakeLength - 1; i >= 0; i--){
        snake.push({
            x: i,
            y: 0
        });
    }
}

function snakeDraw(){
    for(var i = 0; i < snake.length; i++){
        ctx.fillStyle = "#2EE916"
        ctx.fillRect(snake[i].x * snakeSize, snake[i].y * snakeSize, snakeSize, snakeSize)
    }
}

function snakeUpdate(){
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    if(snakeDirection == "right"){
        snakeHeadX++;
    }
    else if(snakeDirection == "down") {
        snakeHeadY++;
    }
    else if(snakeDirection == "left"){
        snakeHeadX--;
    }
    else if(snakeDirection == "up"){
        snakeHeadY--;
    }

    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

/*-----------------------------------------------------------------------------------------------------------------------------------------
    Food Functions
  -----------------------------------------------------------------------------------------------------------------------------------------
  */

function foodInitialize(){
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw(){
    ctx.fillStyle = "#F42208";
    ctx.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize)
}

function setFoodPosition(){
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}

/*--------------------------------------------------------------------------------------------------------------------------------------
    Keyboard Handler Event
----------------------------------------------------------------------------------------------------------------------------------------
*/

function keyboardHandler(event){
    
    if(event.keyCode == "37" && snakeDirection != "right"){
        snakeDirection = "left";
    }
    else if(event.keyCode == "38" && snakeDirection != "down"){
        snakeDirection = "up";
    }
    else if(event.keyCode == "39" && snakeDirection != "left"){
        snakeDirection = "right";
    }
    else if(event.keyCode == "40" && snakeDirection != "up"){
        snakeDirection = "down";
    }
}