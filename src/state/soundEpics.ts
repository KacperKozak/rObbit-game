import { Action } from 'redux'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, ignoreElements, tap } from 'rxjs/operators'
import { play, playEngine } from '../audio/play'
import { equip, move } from './gameReducer'
import { PLAYER_ID } from '../types/consts'

const moveSoundEpic = (actions$: Observable<Action>): Observable<Action> =>
    actions$.pipe(
        filter(move.match),
        filter(action => action.payload.targetId === PLAYER_ID),
        tap(() => playEngine(0.1)),
        ignoreElements(),
    )

const equipSoundEpic = (actions$: Observable<Action>): Observable<Action> =>
    actions$.pipe(
        filter(equip.match),
        tap(() => play('Hero_2', 0.7)),
        ignoreElements(),
    )

export const soundEpics = combineEpics(moveSoundEpic, equipSoundEpic)
