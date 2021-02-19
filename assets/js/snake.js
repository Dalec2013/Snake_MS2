var snake;

var ctx;
var screenWidth;
var screenHeight;

gameInitialize()
gameDraw();

function gameInitialize(){
    var cvs = document.getElementById("gameScreen");
    ctx = cvs.getContext("2d");

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    cvs.width = screenWidth;
    cvs.height = screenHeight;
}

function gameLoop(){

}

function gameDraw(){
    ctx.fillStyle = "rgb(224,142,25)";
    ctx.fillRect(0, 0, screenWidth, screenHeight);
}