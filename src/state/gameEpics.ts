import { first } from 'lodash'
import { Action } from 'redux'
import { combineEpics, StateObservable } from 'redux-observable'
import { concat, Observable, of } from 'rxjs'
import { delay, filter, flatMap, map, mapTo } from 'rxjs/operators'
import { DEFAULT_ACTION_DELAY } from '../config'
import { enqueue, GameStateAware, nextAction, queueEnd, tryNextAction } from './gameReducer'

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
        flatMap(action =>
            concat(
                of(action.payload),
                of(tryNextAction()).pipe(delay(action.meta?.delay || DEFAULT_ACTION_DELAY)),
            ),
        ),
    )

export const gameEpics = combineEpics(enqueueEpic, tryNextEpic, nextActionEpic)
