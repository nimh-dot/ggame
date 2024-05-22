import { Canvas } from './Canvas.js';
import { Ball } from './Ball.js';
import { Paddle } from './Paddle.js';
import { keyDownHandler, keyUpHandler } from './keyboard.js';
import { debounce } from './utils.js';

const RADIUS = 10;
let canvasWrapper = document.getElementById('canvas-wrapper');
let width = window.innerWidth * 0.7;
let height = window.innerHeight * 0.7;
canvasWrapper.style.width = `${width}px`;
canvasWrapper.style.height = `${height}px`;
const canvas = new Canvas(canvasWrapper);

const paddleWidth = window.innerWidth * 0.1;
const paddleHeight = 20;

const ball = new Ball(~~(width / 2), height - paddleHeight - RADIUS, RADIUS, 3, -3);
const paddle = new Paddle((width - paddleWidth) / 2, height - paddleHeight, paddleWidth, paddleHeight);
const paddleStartX = Math.ceil(window.innerWidth * 0.15);
const paddleEndX = paddleStartX + canvas.ctx.width - paddleWidth + 10;

// bricks layout by levels
import { createLevelBricks } from './levels.js';

let score = 0;
let curLevel = 0;
let record = 0;
let bricks = createLevelBricks(curLevel, canvas.ctx.width, canvas.ctx.height);

bricks.forEach((brick) => { canvas.drawPaddle(brick) });

canvas.drawBall(ball);
canvas.drawPaddle(paddle);
canvas.drawNumberOfLevel(curLevel);
canvas.drawScore(score);

let directionState = { left: false, right: false };

function draw() {
    canvas.clear();

    bricks.forEach((brick, index) => {
        canvas.drawPaddle(brick);
        if (ball.updateBrick(brick)) {
            bricks.splice(index, 1);
            score++;
        }
    });

    canvas.drawScore(score);

    // level finish sucsefull 
    if (!bricks.length) {
        curLevel++;
        resetGame(intervalID, curLevel)
    }

    canvas.drawNumberOfLevel(curLevel);
    ball.update(canvas.ctx.width, canvas.ctx.height, intervalID, paddle);
    canvas.drawBall(ball);
    paddle.update(directionState, canvas.ctx.width);
    canvas.drawPaddle(paddle);
};

let intervalID = null;

document.addEventListener("keydown", (e) => { directionState = keyDownHandler(e, directionState) }, false);
document.addEventListener("keyup", (e) => { directionState = keyUpHandler(e, directionState) }, false);
document.addEventListener("mousemove", (e) => {
    if (e.pageX >= paddleStartX && e.pageX <= paddleEndX) {
        paddle.x = e.pageX - paddle.width;
    }
}, false);

document.addEventListener('keyup', (e) => {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
        if (intervalID) {
            onStop(intervalID);
            intervalID = null;
        }
        else {
            startGame();
        }
    }
});

document.addEventListener("mouseup", (e) => {
    if (intervalID) {
        onStop(intervalID);
        intervalID = null;
    }
    else {
        startGame();
    }
}, false);

function startGame() {
    intervalID = setInterval(draw, 6);
};

function resetGame(intervalID, level) {
    clearInterval(intervalID);
    intervalID = null;
    paddle.reset((width - paddleWidth) / 2, height - paddleHeight, paddleWidth, paddleHeight);
    ball.reset(~~(width / 2), height - paddleHeight - RADIUS, 3, -3);


    if (level) {
        bricks = createLevelBricks(curLevel, canvas.ctx.width, canvas.ctx.height);
    }
    else {
        score = 0;
        curLevel = 0;
        bricks = createLevelBricks(curLevel, canvas.ctx.width, canvas.ctx.height);
    }

    canvas.clear();
    canvas.drawBall(ball);
    canvas.drawPaddle(paddle);
    canvas.drawNumberOfLevel(curLevel);
    canvas.drawScore(score);
    bricks.forEach((brick, index) => canvas.drawPaddle(brick));
};

export const onStop = (intervalID) => clearInterval(intervalID);