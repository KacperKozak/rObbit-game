import { MapData } from '../types/types'

import level1 from './level1.json'
import level1img from './images/1.png'

import level2 from './level2.json'
import level2img from './images/2.png'

import level3 from './level3.json'
import level3img from './images/3.png'

import level4 from './level4.json'
import level4img from './images/4.png'

import level5 from './level5.json'

import level6 from './level6.json'

import level7 from './level7.json'

import level8 from './level8.json'

import map0 from './map0.json'
import map1 from './map1.json'
import map2 from './map2.json'
import mapStarter from './starter.json'

export const maps: MapData[] = [
    { id: 'level1', name: 'level1', image: level1img, objects: level1 as any },
    { id: 'level2', name: 'level2', image: level2img, objects: level2 as any },
    { id: 'level3', name: 'level3', image: level3img, objects: level3 as any },
    { id: 'level4', name: 'level4', image: level4img, objects: level4 as any },
    { id: 'level5', name: 'level5', objects: level5 as any },
    { id: 'level6', name: 'level6', objects: level6 as any },
    { id: 'level7', name: 'level7', objects: level7 as any },
    { id: 'level8', name: 'level8', objects: level8 as any },
    { id: 'map-0', name: 'Test 0', objects: map0 as any },
    { id: 'map-1', name: 'Test 1', objects: map1 as any },
    { id: 'map-2', name: 'Test 2', objects: map2 as any },
    { id: 'starter', name: 'Editor', objects: mapStarter as any },
]
