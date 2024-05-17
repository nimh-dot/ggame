import { Canvas } from './Canvas.js';
import { Ball } from './Ball.js';
import { Paddle } from './Paddle.js';
import { keyDownHandler, keyUpHandler } from './keyboard.js';
import { debounce } from './utils.js';

const RADIUS = 10;
let canvasWrapper = document.getElementById('canvas-wrapper');
let width = window.innerWidth * 0.9;
let height = window.innerHeight * 0.7;
canvasWrapper.style.width = `${width}px`;
canvasWrapper.style.height = `${height}px`;
const canvas = new Canvas(canvasWrapper);

const paddleWidth = 220;
const paddleHeight = 20;

const ball = new Ball(~~(width / 2), height - paddleHeight - RADIUS, RADIUS, 3, -3);
const paddle = new Paddle((width - paddleWidth) / 2, height - paddleHeight, paddleWidth, paddleHeight);
const paddleStartX = Math.ceil((window.innerWidth - canvas.ctx.width) / 2) + paddleWidth / 2;
const paddleEndX = paddleStartX + canvas.ctx.width - paddleWidth + 10;

// bricks layout by levels
import { createLevelBricks } from './levels.js';

let curLevel = 1;
let bricks = createLevelBricks(curLevel, canvas.ctx.width, canvas.ctx.height);

bricks.forEach((brick) => { canvas.drawPaddle(brick) });

canvas.drawBall(ball);
canvas.drawPaddle(paddle);

let directionState = { left: false, right: false };

function draw() {
    canvas.clear();
    bricks.forEach((brick, index) => {
        canvas.drawPaddle(brick);
        if (ball.updateBrick(brick)) bricks.splice(index, 1);
    });
    if (!bricks.length) {
        curLevel++;
        bricks = createLevelBricks(curLevel, canvas.ctx.width, canvas.ctx.height);
    }
    ball.update(canvas.ctx.width, canvas.ctx.height, intervalID, paddle);
    canvas.drawBall(ball);
    paddle.update(directionState, canvas.ctx.width);
    canvas.drawPaddle(paddle);
};

let intervalID = null;

function startGame() {
    intervalID = setInterval(draw, 6);
};

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

export const onStop = (intervalID) => clearInterval(intervalID);