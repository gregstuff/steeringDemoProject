export function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

export function normalizeVector(vector) {

    const { x, y } = vector;

    const length = Math.hypot(x, y);

    if (length === 0) {
        return { x: 0, y: 0 };
    }

    return {
        x: x / length,
        y: y / length
    };
}

export function lerpVector(a, b, t) {
    return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t
    };
}

export function vectorMagnitude(vector){
    return Math.hypot(vector.x, vector.y);
}

export function clampVectorMagnitude(vector, maxLength) {
    const length = Math.hypot(vector.x, vector.y);

    if (length === 0 || length <= maxLength) {
        return vector;
    }

    const scale = maxLength / length;

    return {
        x: vector.x * scale,
        y: vector.y * scale
    };
}

export function vectorDist(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    const distance = Math.hypot(dx, dy);
    
    return distance;
}

export function vectorMult(vector, scale) {
    return {
        x: vector.x * scale,
        y: vector.y * scale    
    };
}

export function vectorDir(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y
    };
}