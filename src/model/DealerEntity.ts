import { Cards } from "./CardsEnum.js";

export class DealerEntity {

    private dealersHand: Cards[] = [];

    getDealersHand(): Cards[] {
        return this.dealersHand;
    }

    setDealersHand(cards: Cards[]): void {
        this.dealersHand = cards;
    }

}