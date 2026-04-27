import { TargetSteeringBehaviour } from './behaviours/impl/TargetSteeringBehaviour.js';
import { SteeringContext } from './model/SteeringContext.js';

export class SteeringController {
    constructor(steeringBehaviours) {
        this.initTargetSteeringWeightResolvers();
        this.initBehaviours();
        this.steeringBehaviours = steeringBehaviours;
    }

    updateBoid(boid, boids, target) {
        const ctx = new SteeringContext();

        for(let i = 0; i < this.steeringBehaviours.length; ++i){
            const mappedBehaviour = this.mappedSteeringBehaviours[this.steeringBehaviours[i]];

            if(!mappedBehaviour) throw Error(`No behaviour mapped for: ${this.steeringBehaviours[i]}`);

            mappedBehaviour.steer(ctx, boid, boids, target);
        }

        const desiredVelocity = ctx.desiredVelocity(); 

        const clampedDesiredVelocity = desiredVelocity.clone().limit(boid.maximumSpeed);

        const newVelocity = boid.velocity.clone().lerp(clampedDesiredVelocity, boid.turnSharpness)

        boid.move(newVelocity);
    }

    initBehaviours() {
        this.mappedSteeringBehaviours = {
            'TARGET': new TargetSteeringBehaviour(this.targetSteeringWeightResolver),
        };
    }

    initTargetSteeringWeightResolvers(){
        this.targetSteeringWeightResolver = () => 0.5;
    }


}