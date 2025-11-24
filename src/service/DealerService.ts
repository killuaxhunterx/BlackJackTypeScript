import { DealerEntity } from "../model/DealerEntity.js";
import { PlayerEntity } from "../model/PlayerEntity.js";
import type { DeckService } from "./DeckService.js";
import { Cards } from "../model/CardsEnum.js";
import type { Draw, Winner } from "../model/WinnerType.js";
import type { Hand } from "../model/HandType.js";



export class DealerService {

    private deckService: DeckService;
    private playerEntity: PlayerEntity;
    private dealerEntity: DealerEntity;
    
    constructor(deckService: DeckService, playerEntity: PlayerEntity, dealerEntity: DealerEntity) {
        this.deckService = deckService;
        this.playerEntity = playerEntity;
        this.dealerEntity = dealerEntity;
        this.deckService.generateAllCards();
        this.generateInitialHands();
        this.conditionToScoreOnAceCard();
    }

    addCardsToPlayersHand(card: Cards): void {
        this.playerEntity.getPlayersHand().push(card);
    }
    
    addCardsToDealersHand(card: Cards): void {
       this.dealerEntity.getDealersHand().push(card);
    }

    shuffleArrayCards(array: Cards[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    generateInitialHands(): void {
        const cardsInitialDeck: Cards[] = this.deckService.getAllCards();
        const cardsInitialDeckShuffled = this.shuffleArrayCards(cardsInitialDeck);
        for (let i = 0; i < 4; i++) {
            if (i < 2) {
                this.addCardsToPlayersHand(cardsInitialDeckShuffled[i]);
            } else {
                this.addCardsToDealersHand(cardsInitialDeckShuffled[i]);
            }
            this.dealerEntity.setLastCardGiven(cardsInitialDeckShuffled[i]);
        }
    }

    conditionToScoreOnAceCard(): void {
        for (let i= 0; i < this.playerEntity.getPlayersHand().length; i++) {
            if (this.playerEntity.getPlayersHand()[0] === Cards.A || this.playerEntity.getPlayersHand()[1] === Cards.A) {
                const newScoreAce: Cards = Cards.AA;
                this.playerEntity.setPlayersHand([this.playerEntity.getPlayersHand()[0], newScoreAce]);
            } else if (this.dealerEntity.getDealersHand()[0] === Cards.A || this.dealerEntity.getDealersHand()[1] === Cards.A) {
                const newScoreAce: Cards = Cards.AA;
                this.dealerEntity.setDealersHand([newScoreAce, this.dealerEntity.getDealersHand()[1]]);
            }
        }
    }

    giveOneMoreCardToPlayer(): void {
        this.addCardsToPlayersHand(this.dealerEntity.getLastCardGiven()+1);
        this.dealerEntity.setLastCardGiven(this.dealerEntity.getLastCardGiven()+1);
        this.playerEntity.getPlayersHand().forEach((card, index, hand) => {
            if (card === Cards.AA && index > 1) {
                hand[index] = Cards.A;
            }
        });
    }

    giveOneMoreCardToDealer(): void {
        this.addCardsToDealersHand(this.dealerEntity.getLastCardGiven()+1);
        this.dealerEntity.setLastCardGiven(this.dealerEntity.getLastCardGiven()+1);
        this.dealerEntity.getDealersHand().forEach((card, index, hand) => {
            if (card === Cards.AA && index > 1) {
                hand[index] = Cards.A;
            }
        });
        this.dealerEntity.setScoreHand(this.dealerEntity.getScoreHand() + this.getScoreOfBothHands(this.dealerEntity))
    }

    getScoreOfBothHands(handType: Hand): number {
        let score: number = 0;
        if (handType instanceof PlayerEntity) {
            for (let i = 0; i < handType.getPlayersHand().length; i++) {
                score += handType.getPlayersHand()[i];
            } 
            this.playerEntity.setScoreHand(score);
        } else {
            for (let i = 0; i < handType.getDealersHand().length; i++) {
                score += handType.getDealersHand()[i];
            } 
        }
        return score;
    }

    handMoreCloserTo21(): Hand | Draw {
        const dealersHandScore: number = this.getScoreOfBothHands(this.dealerEntity);
        const playersHandScore: number = this.getScoreOfBothHands(this.playerEntity);
        let differencePlayer: number = 0;
        let differenceDealer: number = 0;
        differencePlayer = 21 - playersHandScore;
        differenceDealer = 21 - dealersHandScore;

        if (differenceDealer < differencePlayer && differenceDealer <= 21) {
            return this.dealerEntity;
        } else if (differenceDealer > differencePlayer && differencePlayer <= 21) {
            return this.playerEntity;
        } else {
            return "Draw";
        }
    }

    whoWins(): Winner | Draw {
        const dealersHandScore: number = this.getScoreOfBothHands(this.dealerEntity);
        const playersHandScore: number = this.getScoreOfBothHands(this.playerEntity);
        const handMoreCloserTo21: Hand | Draw = this.handMoreCloserTo21();
        
        if (dealersHandScore > 21) {
            return this.playerEntity;
        } else if (playersHandScore > 21) {
            return this.dealerEntity;
        }

        if (dealersHandScore == 21) {
            return this.dealerEntity;
        } else if (playersHandScore == 21) {
            return this.playerEntity;
        }

        if (handMoreCloserTo21 instanceof PlayerEntity) {
            return this.playerEntity;
        } else if (handMoreCloserTo21 instanceof DealerEntity) {
            return this.dealerEntity;
        } else {
            return "Draw";
        }
    } 

    getWinner(): void {
        const whoWins: Winner | Draw = this.whoWins();
        if (whoWins instanceof PlayerEntity) {
            console.log("Player wins");
        } else if (whoWins instanceof DealerEntity) {
            console.log("Player lose");
        } else {
            console.log("Draw");
        }
    }

    payThePlayerBetForBlackJack(): number {
        let total: number = 0;
        total += (3/2) * this.playerEntity.getBet();
        this.playerEntity.setFunds(this.playerEntity.getFunds() + total);
        return total;
    }

    payThePlayerBetNormal(): number {
        let total: number = this.playerEntity.getBet();
        this.playerEntity.setFunds(this.playerEntity.getFunds() + total);
        return total;
    }
}