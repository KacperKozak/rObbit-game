import { Action } from 'redux'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, ignoreElements, tap } from 'rxjs/operators'
import { play } from '../audio/play'
import { equip, move } from './gameReducer'

const moveSoundEpic = (actions$: Observable<Action>): Observable<Action> =>
    actions$.pipe(
        filter(move.match),
        tap(() => play('engineStart', 0.2)),
        ignoreElements(),
    )

const equipSoundEpic = (actions$: Observable<Action>): Observable<Action> =>
    actions$.pipe(
        filter(equip.match),
        tap(() => play('button')),
        ignoreElements(),
    )

export const soundEpics = combineEpics(moveSoundEpic, equipSoundEpic)
