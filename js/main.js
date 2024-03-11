import { Canvas } from './Canvas.js';
import { Ball } from './Ball.js';

const RADIUS = 10;
let canvasWrapper = document.getElementById('canvas-wrapper');
let width = window.innerWidth * 0.9
let height = window.innerHeight * 0.7
canvasWrapper.style.width = `${window}px`;
canvasWrapper.style.height = `${height}px`;
const canvas = new Canvas(canvasWrapper);

let paddleWidth = 100
let paddleHeight = 10
// console.log(height, paddleHeight)

let x = ~~(width / 2);
let y = height - paddleHeight- RADIUS;
console.log(x, y)
const ball = new Ball(x, y, RADIUS, 2, -2)

canvas.drawBall(ball);
canvas.drawPaddle(x - paddleWidth/2, height - paddleHeight, paddleWidth, paddleHeight);

function draw() {
    canvas.clear()
    ball.update(canvas.ctx.width, canvas.ctx.height)
    canvas.drawBall(ball);
    canvas.drawPaddle(x - paddleWidth/2, height - paddleHeight, paddleWidth, paddleHeight);
}

function startGame() {
    const interval = setInterval(draw, 10);
}

canvasWrapper.addEventListener('click', () => {
    startGame();
})