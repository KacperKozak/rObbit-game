import { Action } from 'redux'
import { combineEpics, StateObservable } from 'redux-observable'
import { concat, from, Observable, of, Subject } from 'rxjs'
import {
    concatMap,
    delay,
    distinctUntilChanged,
    filter,
    ignoreElements,
    map,
    mapTo,
    startWith,
    switchMap,
    switchMapTo,
    flatMap,
    tap,
} from 'rxjs/operators'
import { enqueue, GameStateAware, nextAction, tryNextAction, queueEnd, equip } from './gameReducer'
import { first } from 'lodash'
import { play } from '../audio/play'

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
            concat(of(action.payload), of(tryNextAction()).pipe(delay(action.meta?.delay || 50))),
        ),
    )

export const gameEpics = combineEpics(enqueueEpic, tryNextEpic, nextActionEpic)
