const { test } = require("ava");

const Card = require("./card");

test("card renders correctly", t => {
  const card = new Card("KING", "DIAMONDS");
  t.is(card.toString(), "King of Diamonds");
});
