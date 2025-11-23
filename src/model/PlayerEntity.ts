import { Cards } from "./CardsEnum.js";

export class PlayerEntity {
    
    private bet: number = 0;
    private funds: number = 0;
    private playersHand: Cards[] = [];
    
    getBet(): number {
        return this.bet;
    }

    setBet(bet: number): void {
        this.bet = bet;
    }

    getFunds(): number {
        return this.funds;
    }

    getplayersHand(): Cards[] {
        return this.playersHand;
    }

    setplayersHand(playersHand: Cards[]): void {
        this.playersHand = playersHand;
    }
}