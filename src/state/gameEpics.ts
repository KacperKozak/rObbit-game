import { first } from 'lodash'
import { Action } from 'redux'
import { combineEpics, StateObservable } from 'redux-observable'
import { concat, Observable, of } from 'rxjs'
import { delay, filter, flatMap, map, mapTo } from 'rxjs/operators'
import { DEFAULT_ACTION_DELAY } from '../config'
import {
    enqueue,
    GameStateAware,
    nextAction,
    queueEnd,
    removeObject,
    tmpSpawn,
    tryNextAction,
    win,
    reset,
    lose,
    showWinDialog,
} from './gameReducer'
import { addCompletedMap } from './localReducer'

const enqueueEpic = (
    actions$: Observable<Action>,
    state$: StateObservable<GameStateAware>,
): Observable<Action> =>
    actions$.pipe(
        filter(enqueue.match),
        filter(() => !state$.value.game.queueStared),
        mapTo(tryNextAction()),
    )

const tryNextEpic = (
    actions$: Observable<Action>,
    state$: StateObservable<GameStateAware>,
): Observable<Action> =>
    actions$.pipe(
        filter(tryNextAction.match),
        map(() => first(state$.value.game.queue)),
        map(action => (action ? nextAction(action) : queueEnd())),
    )

const nextActionEpic = (
    actions$: Observable<Action>,
    state$: StateObservable<GameStateAware>,
): Observable<Action> =>
    actions$.pipe(
        filter(nextAction.match),
        flatMap(action => {
            const newActionDelay = (action.payload as any).meta?.delay || DEFAULT_ACTION_DELAY
            return concat(of(action.payload), of(tryNextAction()).pipe(delay(newActionDelay)))
        }),
    )

const tmpSpawnEpic = (
    actions$: Observable<Action>,
    state$: StateObservable<GameStateAware>,
): Observable<Action> =>
    actions$.pipe(
        filter(tmpSpawn.match),
        delay(600),
        map(action => removeObject(action.payload.instance.id)),
    )

const winEpic = (
    actions$: Observable<Action>,
    state$: StateObservable<GameStateAware>,
): Observable<Action> =>
    actions$.pipe(
        filter(win.match),
        delay(600),
        flatMap(() => concat(of(showWinDialog()), of(addCompletedMap(state$.value.game.mapId!)))),
    )

const loseEpic = (
    actions$: Observable<Action>,
    state$: StateObservable<GameStateAware>,
): Observable<Action> =>
    actions$.pipe(
        filter(lose.match),
        delay(600),
        map(() => reset()),
    )

export const gameEpics = combineEpics(
    enqueueEpic,
    tryNextEpic,
    nextActionEpic,
    tmpSpawnEpic,
    winEpic,
    loseEpic,
)
