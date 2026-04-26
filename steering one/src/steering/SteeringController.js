import { TargetSteeringBehaviour } from './behaviours/impl/TargetSteeringBehaviour.js';
import { SteeringContext } from './model/SteeringContext.js';
import { lerpVector, clampVectorMagnitude } from '../Util/NumUtils.js';

export class SteeringController {
    steeringBehaviours;

    constructor() {
        this.initBehaviours();
    }

    updateBoid(boid, boids, target) {
        const ctx = new SteeringContext();

        for(let i = 0; i < this.steeringBehaviours.length; ++i){
            this.steeringBehaviours[i].steer(ctx, boid, boids, target);
        }

        const desiredVelocity = ctx.desiredVelocity();

        const clampedDesiredVelocity = clampVectorMagnitude(
            {
                x: desiredVelocity.x * boid.maximumSpeed,
                y: desiredVelocity.y * boid.maximumSpeed
            },
            boid.maximumSpeed
        );

        const newVelocity = lerpVector(
            boid.velocity,
            clampedDesiredVelocity,
            boid.turnSharpness
        );

        boid.move(newVelocity);
    }

    initBehaviours() {
        this.steeringBehaviours = [
            new TargetSteeringBehaviour(),
        ];
    }
}