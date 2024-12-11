import test from "ava";
import Promise from "bluebird";

test("foo", t => {
  t.pass();
});

test("bar", async t => {
  const bar = Promise.delay(1000).then(() => "bar");
  t.is(await bar, "bar");
});
