import type { DeckEntity } from "../model/DeckEntity.js";
import { Cards } from "../model/CardsEnum.js";

export class DeckService {    

    private deckEntity: DeckEntity;

    constructor(deckEntity: DeckEntity) {
        this.deckEntity = deckEntity;
    }

    getAllCards(): Cards[] {
        return this.deckEntity.getCards();
    }

    getCardsByType(card: Cards): Cards[] {
        return this.getAllCards().filter(c => c === card);
    }

    addCardsToDeck(card: Cards): void {
        this.deckEntity.getCards().push(card);
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

    generateAllCards(): void {
        this.generateAcesCards();
        this.generateNumericalCards();
        this.generateFaceCards();
    }
}