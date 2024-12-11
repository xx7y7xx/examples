import { TestScheduler } from 'rxjs/testing'
import { expect } from 'chai'

import { pingEpic } from './ping'

describe('Epic ping', () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    // somehow assert the two objects are equal
    // e.g. with chai `expect(actual).deep.equal(expected)`
    console.log('actual', actual)
    console.log('expected', expected)
    expect(actual).deep.equal(expected)
  })
  it('should trigger PONG after 1s', () => {
    testScheduler.run(helpers => {
      const { hot, cold, expectObservable, expectSubscriptions } = helpers
      const input = '-a'
      const subs = '^----------!'
      const expected = '- 1s a'

      const action$ = hot(input, {
        a: { type: 'PING' }
      })

      const output$ = pingEpic(action$)

      expectObservable(output$).toBe(expected, {
        a: {
          type: 'PONG'
        }
      })
      // expectSubscriptions(output$.subscriptions).toBe(subs)
    })
  })
})
