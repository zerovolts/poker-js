# Poker JS

This application draws cards from the [Deck of Cards API](https://deckofcardsapi.com/) and finds the best [poker hand](https://en.wikipedia.org/wiki/List_of_poker_hands) for the given cards.

It also looks for the rankings of cards within a given hand, which would be useful when creating a full poker game, as hands in the same category can be ranked relative to each other by comparing the ranks of their respective cards. For example: `[2, 3, 4, 5, 5]` would rank higher than `[2, 3, 3, 7, "KING"]` because the pair of 5's is more valuable than the pair of 3's, even if the latter group has a King. This application assumes that there are no Jokers, so Five of a Kind is not achievable.

## Usage

```console
λ git clone https://github.com/zerovolts/poker-js.git
λ cd poker-js
λ npm install
λ npm start
```

## Testing

Testing is done using the AVA library.

```console
λ npm test
```
