import { SteeringBehaviour } from '../SteeringBehaviour.js';

const MAX_SPEED_DIST = 30;

export class TargetSteeringBehaviour extends SteeringBehaviour {

    steer(steeringContext, boid, target){
        if (!target) return;

        const boidPos = boid.pos;
        const desiredVelocity = new Phaser.Math.Vector2()
            .copy(target)
            .subtract(boidPos);

        const distanceFromTarget = desiredVelocity.length();

        const heading = desiredVelocity.clone().normalize();

        let desiredSpeed = boid.maximumSpeed;

        if(distanceFromTarget < MAX_SPEED_DIST){
            const brakeFactor = distanceFromTarget / MAX_SPEED_DIST;
            desiredSpeed *= brakeFactor;
        }
        
        steeringContext.putInterestForVelocity(heading.clone().scale(desiredSpeed), this.weightResolver);
    }

}