import { DIRECTION_VECTORS } from '../constants/Direction.js';
import { normalizeVector } from '../../Util/NumUtils.js';

export class SteeringContext {
    interestMap;
    dangerMap;

    constructor(){
        this.interestMap = [0,0,0,0,0,0,0,0];
        this.dangerMap = [0,0,0,0,0,0,0,0];
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
        const slice = Math.PI * 2 / 8;

        return Math.round(normalizedAngle / slice) % 8;
    }

    desiredVelocity() {
        const result = { x: 0, y: 0 };

        for (let i = 0; i < 8; i++) {
            const interest = this.interestMap[i];
            const danger = this.dangerMap[i];

            const score = Math.max(0, interest - danger);

            result.x += DIRECTION_VECTORS[i].x * score;
            result.y += DIRECTION_VECTORS[i].y * score;
        }

        return result;
    }
}