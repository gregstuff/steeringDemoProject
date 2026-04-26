export class SteeringBehaviour {
    steer(steeringContext, boid, boids, target){
        throw new Error("SteeringBehaviour.steer() must be implemented by subclass");
    }
}