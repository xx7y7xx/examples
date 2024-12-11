var assert = require('assert');

describe('Spread syntax', function() {

  it('function call', function() {
    function static(arg1, arg2) {
      return {
        arg1,
        arg2,
      };
    }
    // TODO rest parameters vs spread syntax
    function dynamic(...arg) { // rest parameters
      return static(...arg); // test spread syntax for function call
    }
    const result = dynamic('foo', { bar: 'bar' });
    assert.deepEqual(result, { arg1: 'foo', arg2: { bar: 'bar' } });
    //const oldArr = [
    //  { foo: 'bar' },
    //  'bar',
    //];
    //const newArr = [];

    //oldArr.forEach((item) => {
    //    newArr.push(item);
    //});

    //oldArr[0].foo = 'bar2';
    //oldArr[1] = 'bar3';

    //assert.equal(newArr[0].foo, 'bar2');
    //assert.equal(newArr[1], 'bar');
  });

});
