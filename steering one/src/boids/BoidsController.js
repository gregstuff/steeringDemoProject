import { Boid } from '../model/Boid.js';
import { SteeringController } from '../steering/SteeringController.js';
import { drawBoid } from '../util/GraphicsUtils.js';

const CACHE_UPDATE_SECONDS = 0.2;

export class BoidsController {

    constructor(graphics, bounds, config) {
        this.graphics = graphics;
        this.bounds = bounds;
        this.config = config;
        this.setupEvents();
        this.initBoids();
        this.targetPos = undefined;
        this.steeringController = new SteeringController(config.steeringBehaviours);
        this.lastCacheUpdate = undefined;
    }

    tick(allBoids, secondsSinceStart) {
        this.updateBoidReferences(allBoids, secondsSinceStart);
        this.updateBoids();
        this.drawBoids();
    }

    initBoids() {
        this.boids = [];

        const { initialCount } = this.config;

        for(let i  = 0; i < initialCount; ++i){
            const randPos = new Phaser.Math.Vector2(
                Phaser.Math.Between(0, this.bounds.width), 
                Phaser.Math.Between(0, this.bounds.height));
            this.addBoid(randPos);
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

     updateBoids() {
        for(let i = 0; i < this.boids.length; ++i){
            this.steeringController.updateBoid(this.boids[i], this.targetPos);
            this.wrapAround(this.boids[i]);
        }
    }

    wrapAround(boid) {
        let {x, y} = boid.pos;

        const outOfBoundsWidthMin = x < this.bounds.widthBoundsMin;
        const outOfBoundsWidthMax = x > this.bounds.widthBoundsMax;
        const outOfBoundsHeightMin = y < this.bounds.heightBoundsMin;
        const outOfBoundsHeightMax = y > this.bounds.heightBoundsMax;
        
        if(!outOfBoundsWidthMin 
        && !outOfBoundsWidthMax 
        && !outOfBoundsHeightMin
        && !outOfBoundsHeightMax) return;

        x = outOfBoundsWidthMin ? this.bounds.width : outOfBoundsWidthMax ? 0 : x;
        y = outOfBoundsHeightMin ? this.bounds.height : outOfBoundsHeightMax ? 0 : y;

        boid.pos.set(x, y);
    }

    setupEvents() {
        this.config.eventEmitter.on('spawn', this.handleSpawn, this);
        this.config.eventEmitter.on('targetChanged', this.handleTargetMoved, this);
    }

    handleSpawn(targetPos) {
        this.addBoid(targetPos);
    }

    handleTargetMoved(targetPos) {
        this.targetPos = targetPos;
    }

    addBoid(startingPos) {
        const { maximumSpeed, size, maximumForce, faction } = this.config;

        const startingVelocity = new Phaser.Math.Vector2(
            Phaser.Math.Between(0, 1), 
            Phaser.Math.Between(0, 1))
            .normalize()
            .scale(maximumSpeed);

        this.boids.push(new Boid(startingPos, startingVelocity, size, faction, maximumSpeed, maximumForce));
    }

    updateBoidReferences(allBoids, secondsSinceStart) {
        if(this.lastCacheUpdate && this.lastCacheUpdate + CACHE_UPDATE_SECONDS > secondsSinceStart ) return;

        this.lastCacheUpdate = secondsSinceStart;

        for(let i = 0; i < this.boids.length; ++i){
            this.boids[i].updateCache(allBoids);
        }
    }

}