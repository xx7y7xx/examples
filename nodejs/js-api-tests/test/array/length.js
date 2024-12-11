const assert = require("assert");

describe("Array", function() {
  describe("length", function() {
    it("array length", function() {
      const arr = [];
      arr[2] = "foo";
      arr[5] = undefined;
      assert.equal(arr.length, 6)
      assert.equal(arr[5], undefined)
      assert.equal(arr[6], undefined)
    })
  })
});
