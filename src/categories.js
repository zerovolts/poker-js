const { groupDuplicates, compareLists } = require("./utilities");

const Categories = {
  FIVE_OF_A_KIND: "FIVE_OF_A_KIND",
  STRAIGHT_FLUSH: "STRAIGHT_FLUSH",
  FOUR_OF_A_KIND: "FOUR_OF_A_KIND",
  FULL_HOUSE: "FULL_HOUSE",
  FLUSH: "FLUSH",
  STRAIGHT: "STRAIGHT",
  THREE_OF_A_KIND: "THREE_OF_A_KIND",
  TWO_PAIR: "TWO_PAIR",
  ONE_PAIR: "ONE_PAIR",
  HIGH_CARD: "HIGH_CARD"
};

// use if comparing hands together; lower is better
const Rankings = {
  FIVE_OF_A_KIND: 0,
  STRAIGHT_FLUSH: 1,
  FOUR_OF_A_KIND: 2,
  FULL_HOUSE: 3,
  FLUSH: 4,
  STRAIGHT: 5,
  THREE_OF_A_KIND: 6,
  TWO_PAIR: 7,
  ONE_PAIR: 8,
  HIGH_CARD: 9
};

const nameToRank = name => {
  switch (name) {
    case "JACK":
      return 11;
    case "QUEEN":
      return 12;
    case "KING":
      return 13;
    case "ACE":
      return 14;
    default:
      return parseInt(name);
  }
};

const rankToName = rank => {
  switch (rank) {
    case 11:
      return "JACK";
    case 12:
      return "QUEEN";
    case 13:
      return "KING";
    case 14:
      return "ACE";
    default:
      return rank.toString();
  }
};

// sort a straight and subtract the lowest rank card from all the rest
const normalizedStraightRanks = [0, 1, 2, 3, 4];

// use to check against hand duplicates
const duplicateRankHands = {
  FOUR_OF_A_KIND: [1, 4], // 4 of the same rank; one different
  FULL_HOUSE: [2, 3], // two of one rank; three of another
  THREE_OF_A_KIND: [1, 1, 3], // three of the same rank; two of different ranks
  TWO_PAIR: [1, 2, 2], // two groups of two pairs; one different
  ONE_PAIR: [1, 1, 1, 2] // two of the same rank; all the rest different
};

const isSameSuit = cards => {
  return cards.map(card => card.suit).every(suit => suit === cards[0].suit);
};

findBestHand = cards => {
  // e.g. [5, 5, 8, 8, 12] - all of the examples assume this array
  const sortedRanks = cards
    .map(card => nameToRank(card.rank))
    .sort((a, b) => a - b);

  // e.g. ["8", "5", "QUEEN"]
  const highestRanks = groupDuplicates(sortedRanks).map(group =>
    rankToName(group[0])
  );

  // e.g. "QUEEN"
  const highestRank = rankToName(sortedRanks[4]);

  // e.g. {5: 2, 8: 2, 12: 1}
  const duplicateRankMap = sortedRanks.reduce(
    (acc, key) => ({
      ...acc,
      [key]: acc[key] ? acc[key] + 1 : 1
    }),
    {}
  );

  // e.g. [1, 2, 2]
  const counts = Object.values(duplicateRankMap).sort((a, b) => a - b);

  // e.g. [0, 0, 3, 3, 7]
  const normalizedRanks = sortedRanks.map(rank => rank - sortedRanks[0]);

  // Straight Flush
  if (
    isSameSuit(cards) &&
    compareLists(normalizedRanks, normalizedStraightRanks)
  ) {
    return {
      category: Categories.STRAIGHT_FLUSH,
      rank: highestRank
    };
  }
  // Four of a Kind
  if (compareLists(counts, [1, 4])) {
    return {
      category: Categories.FOUR_OF_A_KIND,
      rank: [highestRanks[0] + " (quad)", ...highestRanks.slice(1)]
    };
  }
  // Full House
  if (compareLists(counts, [2, 3])) {
    return {
      category: Categories.FULL_HOUSE,
      rank: [
        highestRanks[0] + " (triplet)",
        highestRanks[1] + " (pair), ",
        ...highestRanks.slice(1)
      ]
    };
  }
  // Flush
  if (isSameSuit(cards)) {
    return {
      category: Categories.FLUSH,
      rank: highestRank
    };
  }
  // Straight
  if (compareLists(normalizedRanks, normalizedStraightRanks)) {
    return {
      category: Categories.STRAIGHT,
      rank: highestRanks
    };
  }
  // Three of a Kind
  if (compareLists(counts, [1, 1, 3])) {
    return {
      category: Categories.THREE_OF_A_KIND,
      rank: [highestRanks[0] + " (triplet)", ...highestRanks.slice(1)]
    };
  }
  // Two Pair
  if (compareLists(counts, [1, 2, 2])) {
    return {
      category: Categories.TWO_PAIR,
      rank: [
        highestRanks[0] + " (pair)",
        highestRanks[1] + " (pair)",
        ...highestRanks.slice(2)
      ]
    };
  }
  // One Pair
  if (compareLists(counts, [1, 1, 1, 2])) {
    return {
      category: Categories.ONE_PAIR,
      rank: [highestRanks[0] + " (pair)", ...highestRanks.slice(1)]
    };
  }
  // High Card (Default)
  return {
    category: Categories.HIGH_CARD,
    rank: highestRanks
  };
};

module.exports = {
  Categories,
  nameToRank,
  rankToName,
  isSameSuit,
  findBestHand
};
