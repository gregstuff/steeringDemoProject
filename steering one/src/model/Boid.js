export class Boid {
    x;
    y;
    size;
    rotation;
    maximumSpeed;
    turnSharpness;
    velocity;

    constructor(x, y, rotation, size = 30, maximumSpeed = 3, turnSharpness = 0.05) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.rotation = rotation;
        this.maximumSpeed = maximumSpeed;
        this.turnSharpness = turnSharpness;
        this.velocity = {
            x: Math.cos(rotation) * maximumSpeed,
            y: Math.sin(rotation) * maximumSpeed
        };
    }

    updatePosition(x, y){
        this.x = x;
        this.y = y;
    }

    getForward(){
        return {
            x: Math.cos(this.rotation),
            y: Math.sin(this.rotation)
        };
    }
    
    move(velocity) {
        const { x, y } = velocity;
        
        this.x += x;
        this.y += y;

        if (Math.hypot(velocity.x, velocity.y) > 0.0001) {
            this.velocity = velocity;
            this.updateRotation(velocity);
        }
    }

    updateRotation(movementVector) {
        this.rotation = Math.atan2(movementVector.y, movementVector.x);
    }

}