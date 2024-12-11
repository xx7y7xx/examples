import { Observable } from 'rxjs'
import { map, switchMap, catchError } from 'rxjs/operators'
import { ofType } from 'redux-observable'

export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

export const request = payload => ({ type: REQUEST, payload })
export const success = payload => ({ type: SUCCESS, payload })
export const failure = payload => ({ type: FAILURE, payload, error: true })

// REQUEST -> SUCCESS
// REQUEST -> FAILURE
export const epic = (action$, store, { getJSON }) => action$.pipe(
  ofType(REQUEST),
  switchMap(({ payload }) => {
    return getJSON(`https://api.github.com/users/${action.id}`).pipe(
      map(success)
    )
  }),
  catchError((error, stream) => {
    return Observable.merge(Observable.of(failure(error)), stream)
  })
)
