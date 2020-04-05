import { ObjectInstance, MapData } from '../types/types'
import mapstarter from './starter.json'
import level1 from './level1.json'
import level3 from './level3.json'
import map0 from './map0.json'
import map1 from './map1.json'
import map2 from './map2.json'

export const maps: MapData[] = [
    { id: 'starter', name: 'Editor', objects: mapstarter as any },
    { id: 'level1', name: 'level1', objects: level1 as any },
    { id: 'level3', name: 'level3', objects: level3 as any },
    { id: 'map-0', name: 'Test 0', objects: map0 as any },
    { id: 'map-1', name: 'Test 1', objects: map1 as any },
    { id: 'map-2', name: 'Test 2', objects: map2 as any },
]
