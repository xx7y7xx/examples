var assert = require("assert");

describe("split()", function() {
  it("split limit param", function() {
    assert.deepEqual("1,2".split(",", 0), []);
    assert.deepEqual("1,2".split(",", 1), ["1"]);
    assert.deepEqual("1,2".split(",", 2), ["1", "2"]);
    assert.deepEqual("1,2".split(",", 3), ["1", "2"]);
  });
  it("split limit param for invalid 'A,B' pair", function() {
    // Not valid 'A,B' pair
    assert.deepEqual("".split(",", 0), []);
    assert.deepEqual("".split(",", 1), [""]);
    assert.deepEqual("".split(",", 2), [""]);
    assert.deepEqual("".split(",", 3), [""]);

    assert.deepEqual("1".split(",", 0), []);
    assert.deepEqual("1".split(",", 1), ["1"]);
    assert.deepEqual("1".split(",", 2), ["1"]);
    assert.deepEqual("1".split(",", 3), ["1"]);
  });
  it("simulate the user input for a latlng pair", function() {
    // Not valid 'A,B' pair
    assert.deepEqual("".split(",", 2), [""]);
    assert.deepEqual("1".split(",", 2), ["1"]);
    assert.deepEqual("1,".split(",", 2), ["1", ""]);
    assert.deepEqual("1,2".split(",", 2), ["1", "2"]);
    assert.deepEqual("1,2,".split(",", 2), ["1", "2"]);
    assert.deepEqual("1,2,3".split(",", 2), ["1", "2"]);
    // clear the textbox
    assert.deepEqual("".split(",", 2), [""]);
    assert.deepEqual(",".split(",", 2), ["", ""]);
    assert.deepEqual(",2".split(",", 2), ["", "2"]);
  });
});
