import { Canvas } from './Canvas.js';
import { Ball } from './Ball.js';
import { Paddle } from './Paddle.js';
import { keyDownHandler, keyUpHandler } from './keyboard.js'

const RADIUS = 10;
let canvasWrapper = document.getElementById('canvas-wrapper');
let width = window.innerWidth * 0.9
let height = window.innerHeight * 0.7
canvasWrapper.style.width = `${width}px`;
canvasWrapper.style.height = `${height}px`;
const canvas = new Canvas(canvasWrapper);

let intervalID = null

const paddleWidth = 100
const paddleHeight = 10

const ball = new Ball(~~(width / 2), height - paddleHeight - RADIUS, RADIUS, 2, -2)
const paddle = new Paddle((width - paddleWidth) / 2, height - paddleHeight, paddleWidth, paddleHeight)


import { LEVELS } from './levels.js';
const bricks = LEVELS[0].map((coords) => {
    return new Paddle(coords[0], coords[1], paddleWidth, paddleHeight)
})

bricks.forEach((brick) => {canvas.drawPaddle(brick)})

canvas.drawBall(ball);
canvas.drawPaddle(paddle);

let directionState = { left: false, right: false }

function draw() {
    canvas.clear()
    bricks.forEach((brick) => {canvas.drawPaddle(brick)})

    ball.update(canvas.ctx.width, canvas.ctx.height, intervalID, paddle.x, paddle.width)
    canvas.drawBall(ball);

    paddle.update(directionState, canvas.ctx.width)
    canvas.drawPaddle(paddle);
}

function startGame() {
    intervalID = setInterval(draw, 10);
}

document.addEventListener("keydown", (e) => { directionState = keyDownHandler(e, directionState) }, false);
document.addEventListener("keyup", (e) => { directionState = keyUpHandler(e, directionState) }, false);

document.addEventListener('keyup', (e) => {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32 ) {
        if (intervalID) {
            onStop(intervalID)
            intervalID = null
        }
        else {
            startGame()
        }
    }
});

export const onStop = (intervalID) => clearInterval(intervalID)