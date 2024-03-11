import { Canvas } from './Canvas.js';
import { Ball } from './Ball.js';
import './keyboard.js'

const RADIUS = 10;
let canvasWrapper = document.getElementById('canvas-wrapper');
let width = window.innerWidth * 0.9
let height = window.innerHeight * 0.7
canvasWrapper.style.width = `${window}px`;
canvasWrapper.style.height = `${height}px`;
const canvas = new Canvas(canvasWrapper);

const paddleWidth = 100
const paddleHeight = 10
let paddleX = (width - paddleWidth) / 2

let x = ~~(width / 2);
let y = height - paddleHeight - RADIUS;
const ball = new Ball(x, y, RADIUS, 2, -2)

canvas.drawBall(ball);
canvas.drawPaddle(paddleX, height - paddleHeight, paddleWidth, paddleHeight);

let leftPressed = false;
let rightPressed = false;

function draw() {
    canvas.clear()
    ball.update(canvas.ctx.width, canvas.ctx.height)
    canvas.drawBall(ball);

    if (rightPressed) {
        paddleX = Math.min(width - paddleWidth/2, paddleX + 6);
    } else if (leftPressed) {
        paddleX = Math.max(0, paddleX - 6);
    }

    canvas.drawPaddle(paddleX, height - paddleHeight, paddleWidth, paddleHeight);
}

function startGame() {
    const interval = setInterval(draw, 10);
}

canvasWrapper.addEventListener('click', () => {
    startGame();
})

let keyDownHandler = function (e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") rightPressed = true
    else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") leftPressed = true
}

let keyUpHandler = function (e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") rightPressed = false
    else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") leftPressed = false
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);