export class Player {
  constructor(name) {
    this.name = name;
    this.currentHand = [];
    this.winnings = [];
  }
}

export class Card {
  constructor(value, suit, face) {
    this.value = value;
    this.suit = suit;
    this.face = face;
  }
}

export class Deck {
  constructor(shuffled) {
    this.cards = this.createDeck();
    if (shuffled) {
      this.suffleDeck();
    }
  }

  createDeck() {
    let cards = Array.from(0);

    CARD_SUITS.forEach((suit, idx) => {
      CARD_FACES.forEach((face, idx2) => {
        cards.push(new Card(idx, suit, face))
      });
    });

    return cards;
  }

  suffleDeck() {
    let oldDeck = [...this.cards];
    let newDeck = Array.from(0);

    while (oldDeck.length > 0) {
      let pickedNumber = oldDeck.splice(
        getRandomInt(oldDeck.length), 
        1
      ); 

      newDeck.push(pickedNumber[0]);
    }

    this.cards = newDeck;
  }
}