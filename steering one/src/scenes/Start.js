import { Boid } from '../model/Boid.js';
import { randomRange } from '../Util/NumUtils.js';
import { drawBoid, drawX } from '../Util/GraphicsUtils.js';
import { SteeringController } from '../steering/SteeringController.js';


export class Start extends Phaser.Scene {

    boundsBuffer = 1.2; // once we go x% out of bounds then wrap around

    widthBoundsMax;
    widthBoundsMin;
    heightBoundsMax;
    heightBoundsMin;

    graphics;
    boids;
    width;
    height;

    steeringController;

    targetPos;

    constructor() {
        super('Start');
        this.steeringController = new SteeringController();
    }

    preload() {

    }

    create() {
        this.graphics = this.add.graphics();
        this.dimensionsSetup();
        this.initBoids();
        this.setupInputs();
    }

    update() {
        this.graphics.clear();
        this.updateBoids();
        this.drawBoids();
        this.drawTarget();
    }

    initBoids(quantity = 1){
        this.boids = [];

        const startingX = randomRange(0, this.width);
        const startingY = randomRange(0, this.height);
        const startingRotation = randomRange(0, Math.PI * 2);

        for(let i  = 0; i < quantity; ++i){
            this.boids.push(new Boid(startingX, startingY, startingRotation));
        }
    }

    drawBoids() {
        for(let i = 0; i < this.boids.length; ++i){
            const { x, y, rotation, size } = this.boids[i];
            drawBoid(this.graphics, x, y, rotation, size);
        }
    }

    drawTarget() {
        if(!this.targetPos) return;

        const { x, y } = this.targetPos;

        drawX(this.graphics, x,y);
    }

    updateBoids(){
        for(let i = 0; i < this.boids.length; ++i){
            this.steeringController.updateBoid(this.boids[i], this.boids, this.targetPos);
            this.wrapAround(this.boids[i]);
        }
    }

    wrapAround(boid){
        let {x, y} = boid;

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

    dimensionsSetup(){
        this.width = this.scale.width;
        this.height = this.scale.height;

        this.widthBoundsMax = this.width * this.boundsBuffer;
        this.widthBoundsMin = this.width - this.widthBoundsMax;

        this.heightBoundsMax = this.height * this.boundsBuffer;
        this.heightBoundsMin = this.height - this.heightBoundsMax;
    }

    setupInputs() {
        this.input.on('pointerdown', (pointer)=> {
            if(pointer.rightButtonDown()){
                this.targetPos = undefined;
            }
            else{
                const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
                this.targetPos = {x: worldPoint.x, y: worldPoint.y};
            }

        });
    }
    
}
