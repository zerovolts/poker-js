const { capitalize } = require("./utility");

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  toString() {
    return `- ${capitalize(this.rank)} of ${capitalize(this.suit)}`;
  }
}

module.exports = Card;
