export class Boid {
    constructor(pos, startingVelocity, size, maximumSpeed, maximumForce) {
        this.pos = pos;
         this.velocity = startingVelocity;
        this.size = size;
        this.maximumSpeed = maximumSpeed;
        this.maximumForce = maximumForce;
    }
    
    move(velocity) {
        const { currX, currY } = this.velocity;
        const { newX, newY } = velocity;

        this.velocity = new Phaser.Math.Vector2(currX + newX, currY + newY);
    }

    getRotation() {
        return Phaser.Math.Angle.Between(
            0,
            0,
            velocity.x,
            velocity.y
        );
    }

}