import test from "ava";
import Promise from "bluebird";
import { getDirFilesContent, getDirFiles } from "../helpers.js";

test("getDirFiles()", async t => {
  t.deepEqual(await getDirFiles(), ["foo.txt", "bar.txt"]);
});

test("getDirFilesContent()", async t => {
  const bar = getDirFilesContent();
  t.is(await bar, "foo 200ms\nbar 100ms");
});
