const { test } = require("ava");

const { capitalize, groupDuplicates, compareLists } = require("./utilities");

test("capitalize correctly transforms text", t => {
  t.is(capitalize("HELLO_WORLD"), "Hello World");
});

test("groupDuplicates works as intended", t => {
  t.is(groupDuplicates([1, 2, 3, 4]).length, 4);
  t.is(groupDuplicates([1, 2, 2, 3]).length, 3);
  t.is(groupDuplicates([5, 5, 5, 5, 5]).length, 1);
});

test("compareLists returns true if lists are the same", t => {
  t.true(compareLists([1, 2, 3], [1, 2, 3]));
});

test("compareList returns false if lists are different", t => {
  t.false(compareLists([1, 2, 3], [1, 2, 3, 4]));
  t.false(compareLists([1, 2, 3], [1, 2, 4]));
});
