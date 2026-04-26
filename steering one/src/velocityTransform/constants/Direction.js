import { normalizeVector } from '../../Util/NumUtils.js';

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


export const DIRECTION_VECTORS = [
    { x: 1,  y: 0  }, // RIGHT
    { x: 1,  y: 1  }, // DOWN_RIGHT
    { x: 0,  y: 1  }, // DOWN
    { x: -1, y: 1  }, // DOWN_LEFT
    { x: -1, y: 0  }, // LEFT
    { x: -1, y: -1 }, // UP_LEFT
    { x: 0,  y: -1 }, // UP
    { x: 1,  y: -1 }  // UP_RIGHT
].map(normalizeVector);