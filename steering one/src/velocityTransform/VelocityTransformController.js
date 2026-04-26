import { TargetSteeringTransformer } from './transformers/impl/TargetSteeringTransformer.js';
import { SteeringContext } from './model/SteeringContext.js';
import { lerpVector, clampVectorMagnitude } from '../Util/NumUtils.js';

export class VelocityTransformController {
    velocityTransformers;

    constructor() {
        this.initTransformers();
    }

    updateBoid(boid, boids, target) {
        const ctx = new SteeringContext();

        for(var i = 0; i < this.velocityTransformers.length; ++i){
            this.velocityTransformers[i].transform(ctx, boid, boids, target);
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

    initTransformers() {
        this.velocityTransformers = [
            new TargetSteeringTransformer(),
        ];
    }
}