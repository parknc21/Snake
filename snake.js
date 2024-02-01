var canvas;
var app;

var boardSize = 20;
var colSize = 20;
var rowSize = 20;

var snakeHeadX = Math.floor(Math.random() * 20) * boardSize;
var snakeHeadY = Math.floor(Math.random() * 20) * boardSize;

var foodX;
var foodY;

var moveX = 0;
var moveY = 0;

var snakeBody = [];

var gameOver = false;

window.onload = () => {
  canvas = document.getElementById("snake");
  app = canvas.getContext("2d");

  foodPlace();
  document.addEventListener("keyup", move);
  setInterval(update, 1000/10);
};

function update() {
  if(gameOver) {
    return;
  };

  app.fillStyle = "black";
  app.fillRect(0, 0, colSize * boardSize, rowSize * boardSize);

  app.fillStyle = "green";
  app.fillRect(foodX, foodY, boardSize, boardSize);

  if(foodX === snakeHeadX && foodY === snakeHeadY) {
    snakeBody.push([foodX, foodY]);
    foodPlace();
  };

  for(let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i-1];
  };

  if(snakeBody.length) {
    snakeBody[0] = [snakeHeadX, snakeHeadY];
  };

  app.fillStyle = "red";
  snakeHeadX += moveX * boardSize;
  snakeHeadY += moveY * boardSize;
  app.fillRect(snakeHeadX, snakeHeadY, boardSize, boardSize);
  for(let i = 0; i < snakeBody.length; i++) {
    app.fillRect(snakeBody[i][0], snakeBody[i][1], boardSize, boardSize);
  };

  if(snakeHeadX < 0 || snakeHeadX === colSize * boardSize || snakeHeadY < 0 || snakeHeadY === rowSize * boardSize ) {
    gameOver = true;
    alert("Game Over");
  };

  for(let i = 0; i< snakeBody.length; i++) {
    if(snakeHeadX === snakeBody[i][0] && snakeHeadY === snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    };
  };
};

function foodPlace() {
  foodX = Math.floor(Math.random() * 20) * boardSize;
  foodY = Math.floor(Math.random() * 20) * boardSize;
};

function move(event) {
  if(event.key === "ArrowUp" && snakeHeadY !== 1) {
    moveX = 0;
    moveY = -1;
  }
  else if(event.key === "ArrowDown" && snakeHeadY !== -1) {
    moveX = 0;
    moveY = 1;
  }
  else if(event.key === "ArrowLeft" && snakeHeadX !== -1) {
    moveX = -1;
    moveY = 0;
  }
  else if(event.key === "ArrowRight" && snakeHeadX !== 1) {
    moveX = 1;
    moveY = 0;
  };
};