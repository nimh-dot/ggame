import { onStop } from "./main.js";

export class Ball {
    constructor(x, y, radius, dx, dy) {
        this.color = `#8d7370`;
        this.radius = radius;
        this.position = { x: x, y: y };
        this.velocity = { dx: dx, dy: dy };
    }

    update(width, height, intervalID, paddle) {
        if (this.position.x + this.velocity.dx > width - this.radius || this.position.x + this.velocity.dx < this.radius) {
            this.velocity.dx = -this.velocity.dx;
        }

        // bounce off the paddle
        if (this.position.y + this.velocity.dy > height - this.radius - paddle.height) {
            // game over check
            if (this.position.x < paddle.x || this.position.x > paddle.x + paddle.width) {
                onStop(intervalID);
            }
            // bounce angle
            if (this.position.x < (paddle.x + paddle.width / 3) || this.position.x > (paddle.x + paddle.width - paddle.width / 3)) {
                this.velocity.dx = 1.2 * this.velocity.dx;
            }
            else {
                this.velocity.dx = this.velocity.dx / 1.05;
            }

            this.velocity.dy = -this.velocity.dy;
            // bounce off the top
        } else if ((this.position.y + this.velocity.dy < this.radius)) {
            this.velocity.dy = -this.velocity.dy;
        }

        this.position = {
            x: this.position.x + this.velocity.dx,
            y: this.position.y + this.velocity.dy
        };
    }

    updateBrick(brick) {
        let flag = false;
        let deltaX = 0;
        let deltaY = 0;
        if (this.position.y + this.velocity.dy > brick.y - this.radius && this.position.y + this.velocity.dy < brick.y + brick.height) {
            deltaY = Math.max(this.position.y + this.velocity.dy - (brick.y - this.radius), (brick.y + brick.height) - (this.position.y + this.velocity.dy - this.radius))
        }

        if (this.position.x + this.velocity.dx > brick.x - this.radius && this.position.x + this.velocity.dx < brick.x + brick.width) {
            deltaX = Math.max(this.position.x + this.velocity.dx - (brick.x - this.radius), (brick.x + brick.width) - (this.position.x + this.velocity.dx - this.radius))
        }

        if (deltaX && deltaY) {
            flag = true;
            if (deltaX >= deltaY) this.velocity.dy = -this.velocity.dy;
            else this.velocity.dx = -this.velocity.dx;
        }

        return flag
    }
}