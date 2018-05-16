const { test } = require("ava");

const Card = require("./card");
const {
  Categories,
  nameToRank,
  rankToName,
  isSameSuit,
  findBestHand
} = require("./categories");

test("nameToRank returns the rank value of a rank", t => {
  t.is(nameToRank("ACE"), 14);
  t.is(nameToRank("KING"), 13);
  t.is(nameToRank("QUEEN"), 12);
  t.is(nameToRank("JACK"), 11);
  t.is(nameToRank("6"), 6);
});

test("rankToName returns the string name of the rank", t => {
  t.is(rankToName(14), "ACE");
  t.is(rankToName(13), "KING");
  t.is(rankToName(12), "QUEEN");
  t.is(rankToName(11), "JACK");
  t.is(rankToName(6), "6");
});

test("isSameSuit returns true is suits are the same", t => {
  const cards = emptyHand.map((_, i) => {
    return new Card(i, "DIAMONDS");
  });
  t.true(isSameSuit(cards));
});

test("isSameSuit returns false if suits are different", t => {
  const cards = emptyHand.map((_, i) => new Card(i, cycleSuits(i)));
  t.false(isSameSuit(cards));
});

const emptyHand = Array(5).fill(null);
const noMatchRanks = [2, 4, 6, 8, 10];

// cycle through ranks so hands don't become straights or pairs (always odd)
const cycleRanks = (() => {
  let i = 0;
  return () => (i++ % 6) * 2 + 3;
})();

// cycle through suits so hands don't become flushes
const cycleSuits = (() => {
  let i = 0;
  return () => {
    return ["HEARTS", "SPADES", "DIAMONDS", "CLUBS"][i++ % 4];
  };
})();

test("findBestHand matches a straight flush", t => {
  const cards = emptyHand.map((_, i) => new Card(i + 5, "DIAMONDS"));
  t.is(findBestHand(cards).category, Categories.STRAIGHT_FLUSH);
});

test("findBestHand matches a four of a kind", t => {
  const cards = emptyHand.map((_, i) => new Card(6, cycleSuits()));
  cards[0] = new Card(cycleRanks(), cycleSuits()); // change one to avoid five of a kind
  t.is(findBestHand(cards).category, Categories.FOUR_OF_A_KIND);
});

test("findBestHand matches a full house", t => {
  const cards = emptyHand.map((_, i) => new Card(6, cycleSuits()));
  cards[1] = new Card("KING", "SPADES"); // change two to avoid four of a kind
  cards[3] = new Card("KING", "SPADES");
  t.is(findBestHand(cards).category, Categories.FULL_HOUSE);
});

test("findBestHand matches a flush", t => {
  const cards = emptyHand.map((_, i) => new Card(noMatchRanks[i], "DIAMONDS"));
  t.is(findBestHand(cards).category, Categories.FLUSH);
});

test("findBestHand matches a straight", t => {
  const cards = emptyHand.map((_, i) => new Card(i + 5, cycleSuits()));
  t.is(findBestHand(cards).category, Categories.STRAIGHT);
});

test("findBestHand matches a three of a kind", t => {
  const cards = emptyHand.map((_, i) => new Card(6, cycleSuits()));
  cards[1] = new Card(cycleRanks(), cycleSuits()); // change two to avoid four of a kind
  cards[3] = new Card(cycleRanks(), cycleSuits());
  t.is(findBestHand(cards).category, Categories.THREE_OF_A_KIND);
});

test("findBestHand matches a two pair", t => {
  const cards = [
    new Card(10, cycleSuits()), // pair one
    new Card(10, cycleSuits()),
    new Card(6, cycleSuits()), // pair two
    new Card(6, cycleSuits()),
    new Card(2, cycleSuits()) // kicker
  ];
  t.is(findBestHand(cards).category, Categories.TWO_PAIR);
});

test("findBestHand matches a one pair", t => {
  const cards = emptyHand.map((_, i) => new Card(cycleRanks(), cycleSuits()));
  cards[1] = new Card(6, cycleSuits()); // pair
  cards[3] = new Card(6, cycleSuits());
  console.log(cards);
  t.is(findBestHand(cards).category, Categories.ONE_PAIR);
});

test("findBestHand matches a high card", t => {
  const cards = emptyHand.map(
    (_, i) => new Card(noMatchRanks[i], cycleSuits())
  );
  t.is(findBestHand(cards).category, Categories.HIGH_CARD);
});
