const { findBestHand } = require("./categories");
const { capitalize } = require("./utilities");

class Hand {
  constructor(cards) {
    this.cards = cards;
    this.bestHand = this.findBestHand();
  }

  findBestHand() {
    return findBestHand(this.cards);
  }

  toString() {
    const { rank, category } = this.bestHand;
    const isArray = Array.isArray(rank);
    return (
      this.cards.map(card => "- " + card.toString()).join("\n") +
      `\n\nBest Hand: ${capitalize(category)}` +
      `\nSorting Ranks: ${
        isArray ? rank.map(r => capitalize(r)).join(" -> ") : capitalize(rank)
      }\n`
    );
  }
}

module.exports = Hand;
