const CARD_SUITS = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
const CARD_FACES = ["Hearts", "Diamonds", "Spades", "Clubs"];

/* utilities */

function getRandomInt(max) {
  return Math.floor(Math.random(max) * max);
}

function greatestByProperty(objects, property) {
  let currentGreatest = {};
	objects.forEach((ele, idx) => {

  	if (!currentGreatest[property] || currentGreatest[property] < ele[property]) {

    	currentGreatest = ele
    }
  })
  return currentGreatest;
}





/* classes */

/* game.js */
const { Player, Card, Deck } = require("./models");

// create players

class Game {
  // rules of the game:
  //    - the deck is distributed as evenly as possible
  //    - the players take turns comparing cards. 
  //    --- the player with the highest card value wins, and keeps the other players cards. 
  //    - The last player with any cards wins.

  constructor(players) {
    this.deck = new Deck(true)
    this.players = this.initPlayers(players);
  }

  initPlayers(players) {
    let storage = [];
    players.forEach((playerName, idx) => {
      storage.push(new Player(playerName))
    });
    return storage;
  }

  deal() {
    let count = 0
    this.deck.cards.forEach((ele, idx) => {
      if (count > this.players.length-1) {
        count = 0;
      } else {
        this.players[count].currentHand.push(ele);
        count++;
      }
    })
    this.deck.cards = Array.from(0);
  }

  playHands() {
    let playedArray = [];

    this.players[0].currentHand.forEach((ele, idx) => {
      // console.log(JSON.stringify(ele, undefined, 2))
      playedArray.push({
        player: this.players[0].name, 
        card: ele[0]
      });

      // push the cards at the same index from the other players currentHands
      let otherPlayers = this.players.slice(1, this.players.length);
      // console.log(JSON.stringify(otherPlayers, undefined, 2));
      otherPlayers.forEach((player, idx2) => {
        playedArray.push({
          player: player.name, 
          card: player.currentHand[idx] || "No more cards"
        })
      });

      console.log(JSON.stringify(playedArray, undefined, 2))

      let winner = greatestByProperty(playedArray, "card.value");
      playedArray = [];

      // console.log("Winner of this round: " + JSON.stringify(winner, undefined, 2));

      // if (playedArray.length === this.players.length) {

      // }      
    });
  }

}

const theGame = new Game(["goose", "moose"]);
theGame.deal();
theGame.playHands();
// theGame.announceWinner();
