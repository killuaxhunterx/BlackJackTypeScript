import { Cards } from "./CardsEnum.js";

export class PlayerEntity {
    
    private bet: number = 0;
    private funds: number = 0;
    private playersHand: Cards[] = [];
    private scoreHand: number = 0;
    
    getBet(): number {
        return this.bet;
    }

    setBet(bet: number): void {
        this.bet = bet;
    }

    setFunds(funds: number): void {
        this.funds = funds;
    }

    getFunds(): number {
        return this.funds;
    }

    getPlayersHand(): Cards[] {
        return this.playersHand;
    }

    setPlayersHand(playersHand: Cards[]): void {
        this.playersHand = playersHand;
    }
    
    getScoreHand(): number {
        return this.scoreHand;
    }

    setScoreHand(score: number): void {
        this.scoreHand = score;
    }
}