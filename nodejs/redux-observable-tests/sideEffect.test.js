import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';

import { TestScheduler } from 'rxjs/testing';

import {
  // actions
  REQUEST,
  SUCCESS,
  FAILURE,
  // epic
  epic,
} from './sideEffect';

describe('Epic', () => {
  // // REQUEST -> SUCCESS
  // it('should trigger SUCCESS action when REQUEST', () => {
  //   const action$ = ActionsObservable.of({ type: REQUEST })
  //   epic(action$, null)
  //     .toArray() // buffers all emitted actions until your Epic naturally completes()
  //     .subscribe(actions => {
  //       expect(actions).toMatchSnapshot()
  //     })
  // })

  // // REQUEST -> FAILURE
  // it('should trigger FAILURE action when REQUEST and js error', done => {
  //   const action$ = ActionsObservable.of({ type: REQUEST })
  //   epic(action$, null)
  //     .toArray() // buffers all emitted actions until your Epic naturally completes()
  //     .subscribe(actions => {
  //       console.log(1)
  //       expect(actions).toMatchSnapshot()
  //       done()
  //     })
  // })

  it('should trigger SUCCESS action when REQUEST', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      console.log(actual, expected);
      // somehow assert the two objects are equal
      // e.g. with chai `expect(actual).deep.equal(expected)`
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: { type: REQUEST, id: '123' },
      });
      const state$ = null;
      const dependencies = {
        getJSON: (url) =>
          cold('--a', {
            a: { url },
          }),
      };

      const output$ = epic(action$, state$, dependencies);

      expectObservable(output$).toBe('---a', {
        a: {
          type: SUCCESS,
          response: {
            url: 'https://api.github.com/users/123',
          },
        },
      });
    });
  });

  it('should trigger FAILURE action when REQUEST', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      console.log(actual, expected);
      // somehow assert the two objects are equal
      // e.g. with chai `expect(actual).deep.equal(expected)`
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: { type: REQUEST, id: '321' },
      });
      const state$ = null;
      const dependencies = {
        getJSON: (url) => {
          throw new Error('Foo');
        },
      };

      const output$ = epic(action$, state$, dependencies);

      expectObservable(output$).toBe('---a', {
        a: {
          type: FAILURE,
          response: {
            url: 'https://api.github.com/users/321',
          },
        },
      });
    });
  });
});
