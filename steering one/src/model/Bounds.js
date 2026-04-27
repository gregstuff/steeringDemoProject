export class Bounds {
    constructor(width, height, boundsBuffer){
        this.width = width;
        this.height = height;

        this.widthBoundsMax = width * boundsBuffer;
        this.widthBoundsMin = width - this.widthBoundsMax;

        this.heightBoundsMax = height * boundsBuffer;
        this.heightBoundsMin = height - this.heightBoundsMax;
    }
}