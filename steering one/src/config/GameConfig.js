export const GAME_CONFIG = {
    boidsControllers: [
        {
            id: 'boids controller one',
            initialCount: 0,
            size: 30,
            maximumSpeed: 3,
            maximumForce: 0.05,
            faction: 'DEFENDER',
            steeringBehaviours: [
                'TARGET',
            ]
        }
    ]
};