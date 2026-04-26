import { SteeringBehaviour } from '../SteeringBehaviour.js';
import { vectorDist, vectorDir, vectorMult, normalizeVector } from '../../../Util/NumUtils.js';

const MAX_SPEED_DIST = 30;

export class TargetSteeringBehaviour extends SteeringBehaviour {

    steer(steeringContext, boid, boids, target){
        if (!target) return;

        const boidPos = boid.pos();
        const heading = normalizeVector(vectorDir(target, boidPos));

        let desiredSpeed = boid.maximumSpeed;
        const distanceFromTarget = vectorDist(target, boidPos);

        if(distanceFromTarget < MAX_SPEED_DIST){
            const brakeFactor = distanceFromTarget / MAX_SPEED_DIST;
            desiredSpeed *= brakeFactor;
        }

        const desiredVelocity = vectorMult(heading, desiredSpeed);

        steeringContext.putInterestForVelocity(desiredVelocity, this.weightResolver);
    }

}