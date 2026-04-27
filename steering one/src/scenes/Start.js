import { Bounds } from '../model/Bounds.js';
import { drawBoid, drawX } from '../util/GraphicsUtils.js';
import { BoidsController } from '../boids/BoidsController.js';
import { BoidsConfig } from '../boids/BoidsConfig.js';
import { GAME_CONFIG } from '../config/GameConfig.js'; 

const BOUNDS_BUFFER = 1.2;

export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
        this.targetPos = undefined;
    }

    preload() {

    }

    create() {
        this.graphics = this.add.graphics();
        this.setupInputs();
        this.eventEmitters = {};
        this.bounds = new Bounds(this.scale.width, this.scale.height, BOUNDS_BUFFER);
        this.initBoidsControllers();
    }

    update() {
        this.graphics.clear();
        this.drawTarget();

        for(let i = 0; i < this.boidsControllers; ++i){
            this.boidsControllers[i].tick();
        }
    }

    drawTarget() {
        if(!this.targetPos) return;

        const { x, y } = this.targetPos;

        drawX(this.graphics, x,y);
    }

    setupInputs() {
        this.input.on('pointerdown', (pointer)=> {
            const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
            this.targetPos = new Phaser.Math.Vector2(worldPoint.x, worldPoint.y);
        });
    }

    initBoidsControllers() {
        this.boidsControllers = GAME_CONFIG.boidsControllers.map(bc=>
        {
            const { initialCount, steeringBehaviours, maximumForce, maximumSpeed, id, size } = bc;
            const relevantEventEmitter = new Phaser.Events.EventEmitter();
            this.eventEmitters[id] = relevantEventEmitter;
            const config = new BoidsConfig(
                id, 
                initialCount, 
                size, 
                maximumSpeed, 
                maximumForce, 
                steeringBehaviours, 
                relevantEventEmitter);
            
            return new BoidsController(this.graphics, this.bounds, config); 
        });
    }
    
}
