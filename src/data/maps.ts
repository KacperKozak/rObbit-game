import { MapData } from '../types/types'

import walk from './walk.json'
// import buttonImg from './images/walk.png'

import button from './button.json'
import buttonImg from './images/button.png'

import box from './box.json'
// import stairsImg from './images/box.png'

import stairs from './stairs.json'
import stairsImg from './images/stairs.png'

import wall from './wall.json'
import wallImg from './images/wall.png'

import cliff from './cliff.json'
import cliffImg from './images/cliff.png'

import cannon from './cannon.json'
// import cannonImg from './images/cannonRecoil.png'

import cannonRecoil from './cannonRecoil.json'
import cannonRecoilImg from './images/cannonRecoil.png'

import dustRiver from './dustRiver.json'
import dustRiverImg from './images/dustRiver.png'

import dustPipe from './dustPipe.json'
import dustPipeImg from './images/dustPipe.png'

import greenRiver from './greenRiver.json'
import greenRiverImg from './images/greenRiver.png'

import lake from './lake.json'
import lakeImg from './images/lake.png'

import crossbow from './crossbow.json'
// import crossbowImg from './images/crossbow.png'

import map0 from './map0.json'
import map1 from './map1.json'
import map2 from './map2.json'

import mountains from './mountains.json'

import mapStarter from './starter.json'
import { IS_DEV } from '../config'

export const maps: MapData[] = [
    { id: 'walk', name: 'walk', objects: walk },
    { id: 'button', name: 'button', image: buttonImg, objects: button as any },

    { id: 'box', name: 'box', objects: box as any },

    { id: 'stairs', name: 'stairs', image: stairsImg, objects: stairs as any },
    { id: 'cliff', name: 'cliff', image: cliffImg, objects: cliff as any },
    { id: 'wall', name: 'wall', image: wallImg, objects: wall as any },

    // Cannon ↓
    { id: 'cannon', name: 'cannon', objects: cannon },
    {
        id: 'cannon-recoil',
        name: 'cannon-recoil',
        image: cannonRecoilImg,
        objects: cannonRecoil as any,
    },
    { id: 'dust-river', name: 'dust-river', image: dustRiverImg, objects: dustRiver as any },
    { id: 'dust-pipe', name: 'dust-pipe', image: dustPipeImg, objects: dustPipe as any },
    { id: 'green-river', name: 'green-river', image: greenRiverImg, objects: greenRiver as any },

    // Crossbow ↓
    { id: 'crossbow', name: 'crossbow', objects: crossbow as any },
    { id: 'mountains', name: 'mountains', objects: mountains as any },
    { id: 'lake', name: 'lake', image: lakeImg, objects: lake as any },
]

if (IS_DEV) {
    maps.push(
        { id: 'map-0', name: 'Test 0', objects: map0 as any },
        { id: 'map-1', name: 'Test 1', objects: map1 as any },
        { id: 'map-2', name: 'Test 2', objects: map2 as any },
        { id: 'starter', name: 'Editor', objects: mapStarter as any },
    )
}
