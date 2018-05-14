const Deck = require("./deck")

const deck = new Deck(() => {
  deck.draw(cards => {
    cards.forEach(card => {
      console.log(card.toString())
    })
  })
})