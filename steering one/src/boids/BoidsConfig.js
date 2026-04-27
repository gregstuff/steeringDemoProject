export class BoidsConfig {
    constructor(id, initialCount, size, maximumSpeed, maximumForce, steeringBehaviours, eventEmitter){
        this.id = id;
        this.initialCount = initialCount;
        this.size = size;
        this.maximumSpeed = maximumSpeed;
        this.maximumForce = maximumForce;
        this.eventEmitter = eventEmitter;
        this.steeringBehaviours = steeringBehaviours;
    }
}