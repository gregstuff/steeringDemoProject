export class VelocityTransformer {
    transform(steeringContext, boid, boids, target){
        throw new Error("VelocityTransformer.transform() must be implemented by subclass");
    }
}