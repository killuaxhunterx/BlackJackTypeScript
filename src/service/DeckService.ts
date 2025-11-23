import type { DeckEntity } from "../model/DeckEntity.js";
import { Cards } from "../model/CardsEnum.js";

export class DeckService {    

    private deckEntity: DeckEntity;

    constructor(deckEntity: DeckEntity) {
        this.deckEntity = deckEntity;
        this.generateAllCards();
    }

    getAllCards(): Cards[] {
        return this.deckEntity.getCards();
    }

    getCardsByType(card: Cards): Cards[] {
        return this.getAllCards().filter(c => c === card);
    }

    getPlayersDeck(): Cards[] {
        return this.deckEntity.getplayersDeck();
    }

    getDealersDeck(): Cards[] {
        return this.deckEntity.getDealersDeck();
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

    addCardsToPlayersDeck(card: Cards): void {
        this.deckEntity.getplayersDeck().push(card);
    }

    addCardsToDealersDeck(card: Cards): void {
        this.deckEntity.getDealersDeck().push(card);
    }

    generateAces(): void {
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

    generateAllCards(): void {
        this.generateAces();
        this.generateNumericalCards();
        this.generateFaceCards();
        this.generateInitialDecks();
    }
    
    generateInitialDecks(): void {
        const cardsInitialDeck: Cards[] = this.getAllCards();
        const cardsInitialDeckShuffled = this.shuffleArrayCards(cardsInitialDeck);
        for (let i = 0; i < 4; i++) {
            if (i < 2) {
                this.addCardsToPlayersDeck(cardsInitialDeckShuffled[i]);
            } else {
                this.addCardsToDealersDeck(cardsInitialDeckShuffled[i]);
            }
        }
    }

}