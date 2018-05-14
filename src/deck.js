const { getDeck, drawCards } = require("./endpoints")
const Card = require("./card")
const request = require("request")

class Deck {
  constructor(callback) {
    this.id = null
    this.cardCount = null

    request(getDeck(), (err, res, body) => {
      const data = JSON.parse(body)
      this.id = data.deck_id
      this.cardCount = data.remaining

      callback ? callback() : null
    })
  }

  draw(callback) {
    request(drawCards(this.id), (err, res, body) => {
      const data = JSON.parse(body)
      const cards = data.cards.map(card => new Card(card.value, card.suit))
      this.cardCount = data.remaining

      callback ? callback(cards) : null
    })
  }
}

module.exports = Deck