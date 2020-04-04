import { ObjectInstance, MapData } from '../types/types'
import map0 from './map0.json'
import map1 from './map1.json'
import map2 from './map2.json'

export const maps: MapData[] = [
    { id: 'map-0', name: 'Test 0', objects: map0 as any },
    { id: 'map-1', name: 'Test 1', objects: map1 as any },
    { id: 'map-2', name: 'Test 2', objects: map2 as any },
]
