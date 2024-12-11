var assert = require("assert");

describe("Switch", function() {
  it("Case 1", function() {
    const status = 502;
    switch (status) {
      // Compare (status) with (status >= 500), first expression eval to 502,
      // second expression exal to true, 502 is not equal to true, try next case.
      case status >= 500:
        // Code not run here
        assert.fail();
        break;
      default:
        // Code run here
        break;
    }
  });

  it("Case 2", function() {
    // https://stackoverflow.com/a/3463944/4685522
    const amount = 7500;
    switch (true) {
      case amount >= 7500 && amount < 10000:
        // Code run here
        break;
      case amount >= 10000 && amount < 15000:
        // Code not run here
        assert.fail();
        break;
    }
  });

  it("Switch function", function() {
    function Switch() {}
    Switch(502, []);
  });
});
