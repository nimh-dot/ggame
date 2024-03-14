import { onStop } from "./main.js";

export class Ball {
    constructor(x, y, radius, dx, dy) {
        this.color = `#8d7370`;
        this.radius = radius;
        this.position = { x: x, y: y };
        this.velocity = { dx: dx, dy: dy };
    }

    update(width, height, intervalID, paddleX, paddleWidth) {
        if (this.position.x + this.velocity.dx > width - this.radius || this.position.x + this.velocity.dx < this.radius) {
            this.velocity.dx = -this.velocity.dx;
        }

        if (this.position.y + this.velocity.dy > height - this.radius) {
            if (this.position.x < paddleX || this.position.x > paddleX + paddleWidth) {
                onStop(intervalID);
            this.velocity.dy = -this.velocity.dy;
        } else if ((this.position.y + this.velocity.dy < this.radius)) {
            this.velocity.dy = -this.velocity.dy;
        }

        this.position = {
            x: this.position.x + this.velocity.dx,
            y: this.position.y + this.velocity.dy
        };
    }
}