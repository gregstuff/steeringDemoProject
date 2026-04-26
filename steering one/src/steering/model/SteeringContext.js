import { DIRECTION_VECTORS, DIRECTION_COUNT } from '../constants/Direction.js';

export class SteeringContext {
    interestMap;
    dangerMap;

    constructor(){
        this.interestMap = Array(DIRECTION_COUNT).fill(0);
        this.dangerMap = Array(DIRECTION_COUNT).fill(0);
    }

    putDangerForDirection(direction, score) {
        const relevantIndex = this.directionToIndex(direction);

        if(this.dangerMap[relevantIndex] <= score)
            this.dangerMap[relevantIndex] = score;
    }

    putInterestForDirection(direction, score) {
        const relevantIndex = this.directionToIndex(direction);

        if(this.interestMap[relevantIndex] <= score)
            this.interestMap[relevantIndex] = score;
    }

    directionToIndex(vector) {
        const angle = Math.atan2(vector.y, vector.x);

        // Convert from [-PI, PI] to [0, 2PI]
        const normalizedAngle = angle < 0 ? angle + Math.PI * 2 : angle;

        // 8 slices around the circle
        const slice = Math.PI * 2 / DIRECTION_COUNT;

        return Math.round(normalizedAngle / slice) % DIRECTION_COUNT;
    }

    desiredVelocity() {
        const result = { x: 0, y: 0 };

        for (let i = 0; i < DIRECTION_COUNT; i++) {
            const interest = this.interestMap[i];
            const danger = this.dangerMap[i];

            const score = Math.max(0, interest - danger);

            result.x += DIRECTION_VECTORS[i].x * score;
            result.y += DIRECTION_VECTORS[i].y * score;
        }

        return result;
    }
}