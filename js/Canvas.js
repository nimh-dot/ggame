export class Canvas {
    constructor(parentElement) {
        this.ctx = document.createElement('canvas');
        this.ctx.width = parentElement.clientWidth;
        this.ctx.height = parentElement.clientHeight;
        this.ctx.classList.add("canvas");
        parentElement.appendChild(this.ctx);
        this.canvas = this.ctx.getContext("2d");
    }

    drawBall(item) {
        this.canvas.beginPath();
        this.canvas.arc(item.position.x, item.position.y, item.radius, 6.2832, false);
        this.canvas.closePath();
        this.canvas.fillStyle = item.color;
        this.canvas.fill();
    }

    drawPaddle(x, y, dx, dy) {
        this.canvas.beginPath();
        this.canvas.rect(x, y, dx, dy);
        this.canvas.fillStyle = `#8d7370`;
        this.canvas.fill();
        this.canvas.closePath();
    }

    clear() {
        this.canvas.clearRect(0, 0, this.ctx.width, this.ctx.height)
    }

    update() {
        this.clear()
    }
}