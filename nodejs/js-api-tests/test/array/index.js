var assert = require("assert");



describe("Array", function() {
  describe("#forEach()", function() {
    it("js object reference", function() {
      const oldArr = [{ foo: "bar" }, "bar"];
      const newArr = [];

      oldArr.forEach(item => {
        newArr.push(item);
      });

      oldArr[0].foo = "bar2";
      oldArr[1] = "bar3";

      assert.equal(newArr[0].foo, "bar2");
      assert.equal(newArr[1], "bar");
    });
  });

  describe("#map()", function() {
    describe("Object in array", function() {
      it("Change an Object item in new array will affect the old array", function() {
        // ----------------------- Memory -----------------------------
        // oldArr[ reference ]
        //             `------- item{ key: "foo" }
        // ------------------------------------------------------------
        const oldArr = [
          { key: "foo" } // The first item of array is an Object
        ];

        // Copy a new array from an old array
        // ----------------------- Memory -----------------------------
        // oldArr[ reference ]
        //             `----------+
        // newArr[ reference ]    |
        //             `----------+---- item{ key: "foo" }
        // ------------------------------------------------------------
        const newArr = oldArr.map(item => item);

        // Update the key in the object
        // ----------------------- Memory -----------------------------
        // oldArr[ reference ]
        //             `----------+
        // newArr[ reference ]    |
        //             `----------+---- item{ key: "foo_update" }
        // ------------------------------------------------------------
        newArr[0].key = "foo_update";
        assert.equal(oldArr[0].key, "foo_update");
        assert.equal(newArr[0].key, "foo_update");
      });

      it("Change an simple value item in new array will not affect the old array", function() {
        // ----------------------- Memory -----------------------------
        // oldArr[ "bar" ]
        // ------------------------------------------------------------
        const oldArr = [
          "bar" // Simple value
        ];

        // Copy a new array from an old array
        // ----------------------- Memory -----------------------------
        // oldArr[ "bar" ]
        // newArr[ "bar" ]
        // ------------------------------------------------------------
        const newArr = oldArr.map(item => item);

        // Update the array item
        // ----------------------- Memory -----------------------------
        // oldArr[ "bar" ]
        // newArr[ "bar_update" ]
        // ------------------------------------------------------------
        newArr[0] = "bar_update";
        assert.equal(oldArr[0], "bar");
        assert.equal(newArr[0], "bar_update");
      });

      it("Solution", function() {
        const oldArr = [
          { key: "foo" } // Object
        ];

        // Copy a new array from an old array
        const newArr = oldArr.map(item => ({ ...item }));

        // Update the key in the object
        newArr[0].key = "foo_update";
        assert.equal(oldArr[0].key, "foo");
        assert.equal(newArr[0].key, "foo_update");
      });
    });
  });
});
