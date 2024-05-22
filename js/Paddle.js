export class Paddle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update(direction, width) {
        if (direction.right) {
            this.x = Math.min(width - this.width, this.x + 6);
        } else if (direction.left) {
            this.x = Math.max(0, this.x - 6);
        }
    }

    reset(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}