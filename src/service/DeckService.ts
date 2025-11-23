import type { DeckEntity } from "../model/DeckEntity.js";
import { Cards } from "../model/CardsEnum.js";
import type { PlayerEntity } from "../model/PlayerEntity.js";
import type { DealerEntity } from "../model/DealerEntity.js";


export class DeckService {    

    private deckEntity: DeckEntity;
    private playerEntity: PlayerEntity;
    private dealerEntity: DealerEntity;

    constructor(deckEntity: DeckEntity, playerEntity: PlayerEntity, dealerEntity: DealerEntity) {
        this.deckEntity = deckEntity;
        this.playerEntity = playerEntity;
        this.dealerEntity = dealerEntity;
        this.generateAllCards();
    }

    getAllCards(): Cards[] {
        return this.deckEntity.getCards();
    }

    getCardsByType(card: Cards): Cards[] {
        return this.getAllCards().filter(c => c === card);
    }

    getPlayersHand(): Cards[] {
        return this.playerEntity.getplayersHand();
    }

    getDealersHand(): Cards[] {
        return this.dealerEntity.getDealersHand();
    }

    shuffleArrayCards(array: Cards[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    addCardsToDeck(card: Cards): void {
        this.deckEntity.getCards().push(card);
    }

    addCardsToPlayersHand(card: Cards): void {
        this.playerEntity.getplayersHand().push(card);
    }

    addCardsToDealersHand(card: Cards): void {
        this.dealerEntity.getDealersHand().push(card);
    }

    generateAcesCards(): void {
        for (let i = 0; i < 4; i++) {
            let acesCards: Cards = Cards.A;
            this.addCardsToDeck(acesCards);
        }
    }

    generateNumericalCards(): void {
        for (let i = 2; i <= 10; i++) {
            for (let j = 0; j < 4; j++){
                if (i == 2) {
                    this.addCardsToDeck(Cards.two);
                } else if (i == 3) {
                    this.addCardsToDeck(Cards.three);
                } else if (i == 4) {
                    this.addCardsToDeck(Cards.four);
                } else if (i == 5) {
                    this.addCardsToDeck(Cards.five);
                } else if (i == 6) {
                    this.addCardsToDeck(Cards.six);
                } else if (i == 7) {
                    this.addCardsToDeck(Cards.seven);
                } else if (i == 8) {
                    this.addCardsToDeck(Cards.eight);
                } else if (i == 9) {
                    this.addCardsToDeck(Cards.nine);
                } else if (i == 10) {
                    this.addCardsToDeck(Cards.ten);
                }
            }
        }
    }

    generateFaceCards(): void {
        for (let i = 1; i <= 3; i++) {
            for (let j = 0; j < 4; j++) {
                if (i == 1) {
                    this.addCardsToDeck(Cards.J);
                } else if (i == 2) {
                    this.addCardsToDeck(Cards.K);
                } else {
                    this.addCardsToDeck(Cards.Q);
                }
            }
        }
    }
    
    generateInitialHands(): void {
        const cardsInitialDeck: Cards[] = this.getAllCards();
        const cardsInitialDeckShuffled = this.shuffleArrayCards(cardsInitialDeck);
        for (let i = 0; i < 4; i++) {
            if (i < 2) {
                this.addCardsToPlayersHand(cardsInitialDeckShuffled[i]);
            } else {
                this.addCardsToDealersHand(cardsInitialDeckShuffled[i]);
            }
        }
    }

    conditionToScoreOnAceCard(): void {
        for (let i= 0; i < this.getPlayersHand().length; i++) {
            if (this.getPlayersHand()[1] === Cards.A && this.getPlayersHand()[0] > 1) {
                const newScoreAce: Cards = Cards.AA;
                this.playerEntity.setplayersHand([this.getPlayersHand()[0], newScoreAce]);
                this.dealerEntity.setDealersHand([this.getDealersHand()[0], newScoreAce]);
            }
        }
    }

    generateAllCards(): void {
        this.generateAcesCards();
        this.generateNumericalCards();
        this.generateFaceCards();
        this.generateInitialHands();
        this.conditionToScoreOnAceCard();
    }
}