// import { Observable } from 'rxjs'
import { mapTo, delay, mergeMap, map } from 'rxjs/operators'
import { ofType } from 'redux-observable'

const PING = 'PING'
const PONG = 'PONG'

const ping = () => ({ type: PING })
const pong = () => ({ type: PONG })

export const pingEpic = action$ =>
  action$.pipe(
    ofType(PING),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo(pong())
  )

const pingReducer = (state = { isPinging: false }, action) => {
  switch (action.type) {
    case 'PING':
      return { isPinging: true }

    case 'PONG':
      return { isPinging: false }

    default:
      return state
  }
}

export const fetchUserEpic = (action$, state$, { getJSON }) =>
  action$.pipe(
    ofType('FETCH_USER'),
    mergeMap(action =>
      getJSON(`https://api.github.com/users/${action.id}`).pipe(
        map(response => ({ type: 'FETCH_USER_FULFILLED', response }))
      )
    )
  )
