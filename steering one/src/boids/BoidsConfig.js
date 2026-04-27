export class BoidsConfig {
    constructor(id, initialCount, size, faction, maximumSpeed, maximumForce, steeringBehaviours, eventEmitter){
        this.id = id;
        this.initialCount = initialCount;
        this.size = size;
        this.faction = faction;
        this.maximumSpeed = maximumSpeed;
        this.maximumForce = maximumForce;
        this.eventEmitter = eventEmitter;
        this.steeringBehaviours = steeringBehaviours;
    }
}