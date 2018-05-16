const Deck = require("./deck");
const Hand = require("./hand");

const deck = new Deck(() => {
  deck.draw(cards => {
    const hand = new Hand(cards);
    console.log(hand.toString());
  });
});
