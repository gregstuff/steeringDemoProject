export class Boid {
    constructor(pos, startingVelocity, size, maximumSpeed, maximumForce) {
        this.pos = pos;
         this.velocity = startingVelocity;
        this.size = size;
        this.maximumSpeed = maximumSpeed;
        this.maximumForce = maximumForce;
    }
    
    move(newVelocity) {
        this.velocity = newVelocity;
        this.pos.add(this.velocity);
    }

    getRotation() {
        return Phaser.Math.Angle.Between(
            0,
            0,
            this.velocity.x,
            this.velocity.y
        );
    }

}