export class SteeringBehaviour {

    weightResolver;

    constructor(weightResolver) {
        this.weightResolver = weightResolver;
    }

    steer(steeringContext, boid, target){
        throw new Error("SteeringBehaviour.steer() must be implemented by subclass");
    }
}