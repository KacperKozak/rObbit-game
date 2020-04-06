import { MapData } from '../types/types'

import walk from './jsons/walk.json'
import walkImg from './images/walk.png'

import button from './jsons/button.json'
import buttonImg from './images/button.png'

import box from './jsons/box.json'
import boxImg from './images/box.png'

import stairs from './jsons/stairs.json'
import stairsImg from './images/stairs.png'

import wall from './jsons/wall.json'
import wallImg from './images/wall.png'

import cliff from './jsons/cliff.json'
import cliffImg from './images/cliff.png'

import cannon from './jsons/cannon.json'
import cannonImg from './images/cannonRecoil.png'

import cannonRecoil from './jsons/cannonRecoil.json'
import cannonRecoilImg from './images/cannonRecoil.png'

import dustRiver from './jsons/dustRiver.json'
import dustRiverImg from './images/dustRiver.png'

import dustPipe from './jsons/dustPipe.json'
import dustPipeImg from './images/dustPipe.png'

import columns from './jsons/columns.json'
import columnsImg from './images/columns.png'

import greenRiver from './jsons/greenRiver.json'
import greenRiverImg from './images/greenRiver.png'

import crossbow from './jsons/crossbow.json'
import crossbowImg from './images/crossbow.png'

import mountains from './jsons/mountains.json'
import mountainsImg from './images/mountains.png'

import iceworld from './jsons/iceworld.json'
import iceworldImg from './images/iceworld.png'

import lake from './jsons/lake.json'
import lakeImg from './images/lake.png'

import map0 from './jsons/map0.json'
import map1 from './jsons/map1.json'
import map2 from './jsons/map2.json'

import mapStarter from './jsons/starter.json'
import { IS_DEV } from '../config'

export const maps: MapData[] = [
    { id: 'walk', name: 'walk', image: walkImg, objects: walk as any },
    { id: 'button', name: 'button', image: buttonImg, objects: button as any },

    { id: 'box', name: 'box', image: boxImg, objects: box as any },

    { id: 'stairs', name: 'stairs', image: stairsImg, objects: stairs as any },
    { id: 'cliff', name: 'cliff', image: cliffImg, objects: cliff as any },
    { id: 'wall', name: 'wall', image: wallImg, objects: wall as any },

    // Cannon ↓
    { id: 'cannon', name: 'cannon', image: cannonImg, objects: cannon },
    {
        id: 'cannon-recoil',
        name: 'cannon-recoil',
        image: cannonRecoilImg,
        objects: cannonRecoil as any,
    },
    { id: 'dust-river', name: 'dust-river', image: dustRiverImg, objects: dustRiver as any },
    { id: 'columns', name: 'columns', image: columnsImg, objects: columns as any },
    { id: 'dust-pipe', name: 'dust-pipe', image: dustPipeImg, objects: dustPipe as any },

    { id: 'green-river', name: 'green-river', image: greenRiverImg, objects: greenRiver as any },

    // Crossbow ↓
    { id: 'crossbow', name: 'crossbow', image: crossbowImg, objects: crossbow as any },
    { id: 'mountains', name: 'mountains', image: mountainsImg, objects: mountains as any },

    { id: 'iceworld', name: 'iceworld', image: iceworldImg, objects: iceworld as any },

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
