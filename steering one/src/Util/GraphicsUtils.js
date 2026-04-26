export function drawBoid(graphics, x,y,rotation, size){

        graphics.fillStyle(0xffffff, 1);

        const points = [
            { x: size, y: 0 },              // nose / forward point
            { x: -size * 0.6, y: -size * 0.45 }, // rear left
            { x: -size * 0.6, y: size * 0.45 }   // rear right
        ];

        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);

        const rotatePoint = (p) => {
            return {
                x: x + p.x * cos - p.y * sin,
                y: y + p.x * sin + p.y * cos
            }
        };

        const pointA = rotatePoint(points[0]);
        const pointB = rotatePoint(points[1]);
        const pointC = rotatePoint(points[2]);

        graphics.beginPath();
        graphics.moveTo(pointA.x, pointA.y);
        graphics.lineTo(pointB.x, pointB.y);
        graphics.lineTo(pointC.x, pointC.y);

        graphics.closePath();
        graphics.fillPath();
    }

export function drawX(graphics, x, y, size = 20) {
      graphics.lineStyle(2, 0xff0000, 1);

        // top-left to bottom-right
        graphics.lineBetween(
            x - size,
            y - size,
            x + size,
            y + size
        );

        // bottom-left to top-right
        graphics.lineBetween(
            x - size,
            y + size,
            x + size,
            y - size
        );
}