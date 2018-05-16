const getDeck = (count = 1) =>
  `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${count}`;

const drawCards = (id, count = 5) =>
  `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${count}`;

module.exports = { getDeck, drawCards };
