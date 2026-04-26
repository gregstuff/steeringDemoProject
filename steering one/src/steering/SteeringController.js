import { TargetSteeringBehaviour } from './behaviours/impl/TargetSteeringBehaviour.js';
import { SteeringContext } from './model/SteeringContext.js';
import { lerpVector, clampVectorMagnitude } from '../Util/NumUtils.js';

export class SteeringController {
    steeringBehaviours;
    targetSteeringWeightResolver;

    constructor() {
        this.initTargetSteeringWeightResolvers();
        this.initBehaviours();
    }

    updateBoid(boid, boids, target) {
        const ctx = new SteeringContext();

        for(let i = 0; i < this.steeringBehaviours.length; ++i){
            this.steeringBehaviours[i].steer(ctx, boid, boids, target);
        }

        const desiredVelocity = ctx.desiredVelocity();

        const clampedDesiredVelocity = clampVectorMagnitude(desiredVelocity, boid.maximumSpeed);

        const newVelocity = lerpVector(
            boid.velocity,
            clampedDesiredVelocity,
            boid.turnSharpness
        );

        boid.move(newVelocity);
    }

    initBehaviours() {
        this.steeringBehaviours = [
            new TargetSteeringBehaviour(this.targetSteeringWeightResolver),
        ];
    }

    initTargetSteeringWeightResolvers(){
        this.targetSteeringWeightResolver = () => 0.5;
    }


}