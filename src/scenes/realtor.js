import gameObjects from '../gameObjects/map_realtor';
import { initMap } from '../init/map.init';
import interactions from '../interactions/map_realtor';

export async function realtor() {
    const objectConfig = {
        static: [
            'map_boundaries',
            'building_boundaries',
            'enter_new_map_boundaries',
        ],
        spawnpoints: ['spawnpoints'],
        interactionObjects: ['interaction_objects'],
    };
    const [map, spawnpoint] = await initMap(
        objectConfig,
        './exports/maps/map_realtor.png',
        './maps/map_realtor.json'
    );

    return [map, spawnpoint, gameObjects, interactions];
}
