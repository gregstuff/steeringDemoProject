const CLOSE_DISTANCE = 50;
const MEDIUM_DISTANCE = 100;
const FAR_DISTANCE = 150;

export class Boid {
    constructor(pos, startingVelocity, size, faction, maximumSpeed, maximumForce) {
        this.id = crypto.randomUUID();
        this.pos = pos;
        this.velocity = startingVelocity;
        this.size = size;
        this.faction = faction;
        this.maximumSpeed = maximumSpeed;
        this.maximumForce = maximumForce;
        this.target = undefined;

        this.closeDistanceEnemies = [];
        this.mediumDistanceEnemies = [];
        this.farDistanceEnemies = [];

        this.closeDistanceFriendlies = [];
        this.mediumDistanceFriendlies = [];
        this.farDistanceFriendlies = [];
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

    updateCache(allBoids) {
        this.closeDistanceEnemies = [];
        this.mediumDistanceEnemies = [];
        this.farDistanceEnemies = [];

        this.closeDistanceFriendlies = [];
        this.mediumDistanceFriendlies = [];
        this.farDistanceFriendlies = [];

        for( let i = 0; i < allBoids.length; ++i ){
            const isSelf = allBoids[i].id === this.id;
            const isEnemy = allBoids[i].faction !== this.faction; // might want to make this more nuanced later

            if(isSelf) continue;

            const other = allBoids[i];

            const nearDist = isEnemy ? this.closeDistanceEnemies : this.closeDistanceFriendlies;
            const mediumDist = isEnemy ? this.mediumDistanceEnemies : this.mediumDistanceFriendlies;
            const farDist = isEnemy ? this.farDistanceEnemies : this.farDistanceFriendlies;

            const toTarget = new Phaser.Math.Vector2()
                .copy(other.pos)
                .subtract(this.pos);

            const dist = toTarget.length();

            if(dist <= CLOSE_DISTANCE){
                nearDist.push(other);
            }
            else if(dist <= MEDIUM_DISTANCE){
                mediumDist.push(other);
            }
            else if(dist <= FAR_DISTANCE) {
                farDist.push(other);
            }
        }
    }

}