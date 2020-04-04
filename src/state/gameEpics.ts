import { first } from 'lodash'
import { Action } from 'redux'
import { combineEpics, StateObservable } from 'redux-observable'
import { concat, Observable, of, timer } from 'rxjs'
import { delay, filter, flatMap, map, mapTo, ignoreElements } from 'rxjs/operators'
import { DEFAULT_ACTION_DELAY } from '../config'
import {
    enqueue,
    GameStateAware,
    nextAction,
    queueEnd,
    tryNextAction,
    tmpSpawn,
    remove,
    enqueueAfter,
} from './gameReducer'

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
        map(action => remove(action.payload.instance.id)),
    )

const enqueueAfterEpic = (
    actions$: Observable<Action>,
    state$: StateObservable<GameStateAware>,
): Observable<Action> =>
    actions$.pipe(
        filter(enqueueAfter.match),
        flatMap(({ payload }) =>
            concat(
                timer(payload.timeout).pipe(ignoreElements()),
                of(...payload.actions.map(a => enqueue(a))),
            ),
        ),
    )

export const gameEpics = combineEpics(
    enqueueEpic,
    tryNextEpic,
    nextActionEpic,
    enqueueAfterEpic,
    tmpSpawnEpic,
)
