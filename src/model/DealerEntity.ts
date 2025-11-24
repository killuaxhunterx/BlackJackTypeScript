import { Cards } from "./CardsEnum.js";

export class DealerEntity {

    private dealersHand: Cards[] = [];
    private lastCardGiven: number = 0;
    private scoreHand: number = 0;

    getDealersHand(): Cards[] {
        return this.dealersHand;
    }

    setDealersHand(cards: Cards[]): void {
        this.dealersHand = cards;
    }

    getLastCardGiven(): number {
        return this.lastCardGiven;
    }

    setLastCardGiven(lastCardGiven: number): void {
        this.lastCardGiven = lastCardGiven;
    }

    getScoreHand(): number {
        return this.scoreHand;
    }

    setScoreHand(score: number): void {
        this.scoreHand = score;
    }

}