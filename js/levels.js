import { Paddle } from './Paddle.js';

const LEVELS =   [  [[1,1,1,1,0,1,0,1,1,1],
                    [1,1,1,1,0,1,0,1,1,1],
                    [1,0,1,1,0,1,0,1,0,1],
                    [1,1,1,1,0,1,0,1,1,1],
                    [1,1,1,1,0,1,0,1,1,1]],
                             //second level
                    []
                 ];

export const createLevelBricks = (level, canvasWidth, canvasHeight) => {
    const colOffset = Math.round(canvasWidth * .02);
    const rowOffset = Math.round(canvasHeight * .02);
    const brickWidth = (canvasWidth * .7) / 10;
    const brickHeight = (canvasHeight * .2) / 5;
    const maxBricksRow = 5;
    const maxBricksCol = 10;

    const bricks = [];

    for (let i = 0; i < maxBricksRow; i++) {
        for (let j = 0; j < maxBricksCol; j++) {
            if (LEVELS[level][i][j]) {
                const brick = new Paddle( colOffset * 3 + j * colOffset + j * brickWidth,
                                        rowOffset * 3 + i * rowOffset + i * brickHeight, brickWidth, brickHeight);
                bricks.push(brick);
            }
        }
    };

    return bricks
};