var snake;
var snakeLength;
var snakeSize;

var ctx;
var screenWidth;
var screenHeight;

gameInitialize();
snakeInitialize();
setInterval(gameLoop, 1000/30);


function gameInitialize(){
    var cvs = document.getElementById("gameScreen");
    ctx = cvs.getContext("2d");

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    cvs.width = screenWidth;
    cvs.height = screenHeight;
}

function gameLoop(){
    gameDraw();
    snakeUpdate();
    snakeDraw();
}

function gameDraw(){
    ctx.fillStyle = "rgb(67,78,161)";
    ctx.fillRect(0, 0, screenWidth, screenHeight);
}

function snakeInitialize(){
    snake = [];
    snakeLength = 5;
    snakeSize = 20;

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

    snakeHeadX++;

    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}