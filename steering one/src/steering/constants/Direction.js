export const DirectionIndex = Object.freeze({
    RIGHT: 0,
    DOWN_RIGHT: 1,
    DOWN: 2,
    DOWN_LEFT: 3,
    LEFT: 4,
    UP_LEFT: 5,
    UP: 6,
    UP_RIGHT: 7
});

export const DIRECTION_COUNT = Object.keys(DirectionIndex).length;



export const DIRECTION_VECTORS = [
    new Phaser.Math.Vector2(1, 0),   // RIGHT
    new Phaser.Math.Vector2(1, 1),   // DOWN_RIGHT
    new Phaser.Math.Vector2(0, 1),   // DOWN
    new Phaser.Math.Vector2(-1, 1),  // DOWN_LEFT
    new Phaser.Math.Vector2(-1, 0),  // LEFT
    new Phaser.Math.Vector2(-1, -1), // UP_LEFT
    new Phaser.Math.Vector2(0, -1),  // UP
    new Phaser.Math.Vector2(1, -1)   // UP_RIGHT
].map(v=>v.normalize());