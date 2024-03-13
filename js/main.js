import { Canvas } from './Canvas.js';
import { Ball } from './Ball.js';
import { keyDownHandler, keyUpHandler } from './keyboard.js'

const RADIUS = 10;
let canvasWrapper = document.getElementById('canvas-wrapper');
let width = window.innerWidth * 0.9
let height = window.innerHeight * 0.7
canvasWrapper.style.width = `${width}px`;
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

let horizontal = { left: false, right: false }

function draw() {
    canvas.clear()
    ball.update(canvas.ctx.width, canvas.ctx.height)
    canvas.drawBall(ball);

    if (horizontal.right) {
        paddleX = Math.min(width - paddleWidth, paddleX + 6);
    } else if (horizontal.left) {
        paddleX = Math.max(0, paddleX - 6);
    }

    canvas.drawPaddle(paddleX, height - paddleHeight, paddleWidth, paddleHeight);
}

function startGame() {
    const interval = setInterval(draw, 10);
}

document.addEventListener("keydown", (e) => { horizontal = keyDownHandler(e, horizontal) }, false);
document.addEventListener("keyup", (e) => { horizontal = keyUpHandler(e, horizontal) }, false);

canvasWrapper.addEventListener('click', () => startGame());