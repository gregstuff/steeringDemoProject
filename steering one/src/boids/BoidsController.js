import { Boid } from '../model/Boid.js';
import { SteeringController } from '../steering/SteeringController.js';
import { drawBoid } from '../util/GraphicsUtils.js';

export class BoidsController {

    constructor(graphics, bounds, config){
        this.graphics = graphics;
        this.bounds = bounds;
        this.config = config;
        this.setupEvents();
        this.initBoids();
        this.targetPos = undefined;
        this.steeringController = new SteeringController(config.steeringBehaviours);
    }

    tick(){
        this.updateBoids();
        this.drawBoids();
    }

    initBoids(){
        this.boids = [];

        const { maximumSpeed, size, maximumForce, initialCount } = this.config;

        for(let i  = 0; i < initialCount; ++i){
            const startingPos = new Phaser.Math.Vector2(
                Phaser.Math.Between(0, this.bounds.width), 
                Phaser.Math.Between(0, this.bounds.height));

            const startingVelocity = new Phaser.Math.Vector2(
                Phaser.Math.Between(0, 1), 
                Phaser.Math.Between(0, 1))
                .normalize()
                .scale(maximumSpeed);

            this.boids.push(new Boid(startingPos, startingVelocity, size, maximumSpeed, maximumForce));
        }
    }

    drawBoids() {
        for(let i = 0; i < this.boids.length; ++i){
            const boid = this.boids[i];
            drawBoid(
                this.graphics,
                boid.pos.x,
                boid.pos.y,
                boid.getRotation(),
                boid.size
            );
        }
    }

     updateBoids(){
        for(let i = 0; i < this.boids.length; ++i){
            this.steeringController.updateBoid(this.boids[i], this.boids, this.targetPos);
            this.wrapAround(this.boids[i]);
        }
    }

    wrapAround(boid){
        let {x, y} = boid.pos;

        const outOfBoundsWidthMin = x < this.widthBoundsMin;
        const outOfBoundsWidthMax = x > this.widthBoundsMax;
        const outOfBoundsHeightMin = y < this.heightBoundsMin;
        const outOfBoundsHeightMax = y > this.heightBoundsMax;
        
        if(!outOfBoundsWidthMin 
        && !outOfBoundsWidthMax 
        && !outOfBoundsHeightMin
        && !outOfBoundsHeightMax) return;

        x = outOfBoundsWidthMin ? this.width : outOfBoundsWidthMax ? 0 : x;
        y = outOfBoundsHeightMin ? this.height : outOfBoundsHeightMax ? 0 : y;

        boid.updatePosition(x, y);
    }

    setupEvents() {
        this.config.eventEmitter.on('spawn', this.handleSpawn, this);
        this.config.eventEmitter.on('targetChanged', this.handleTargetMoved, this);
    }

    handleSpawn() {
        console.log('handle spawn!');
    }

    handleTargetMoved(targetPos) {
        this.targetPos = targetPos;
    }

}