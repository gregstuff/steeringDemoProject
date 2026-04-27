import { DIRECTION_VECTORS, DIRECTION_COUNT } from '../constants/Direction.js';

export class SteeringContext {
    constructor(){
        this.interestMap = Array(DIRECTION_COUNT).fill(0);
        this.dangerMap = Array(DIRECTION_COUNT).fill(0);
    }

    putDangerForVelocity(velocity, weightResolver) {
        const weightedVelocity = velocity.clone().scale(weight)
        const relevantIndex = this.directionToIndex(weightedVelocity);
        const score = weightedVelocity.length();

        if(this.dangerMap[relevantIndex] <= score)
            this.dangerMap[relevantIndex] = score;
    }

    putInterestForVelocity(velocity, weightResolver) {
        const weightedVelocity = velocity.clone().scale(weight)
        const relevantIndex = this.directionToIndex(weightedVelocity);
        const score = weightedVelocity.length();

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

        return new Phaser.Math.Vector2(result.x, result.y);
    }
}