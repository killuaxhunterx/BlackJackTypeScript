import { Cards } from "./CardsEnum.js";

export class DeckEntity {

    private Cards: Cards[] = [];
    private playersDeck: Cards[] = [];
    private dealersDeck: Cards[] = [];

    getCards(): Cards[] {
        return this.Cards;
    }
    
    setCards(Cards: Cards[]) {
        this.Cards = Cards;
    }

    getplayersDeck(): Cards[] {
        return this.playersDeck;
    }

    setplayersDeck(playersDeck: Cards[]): void {
        this.playersDeck = playersDeck;
    }

    getDealersDeck(): Cards[] {
        return this.dealersDeck;
    }

    setDealersDeck(dealersDeck: Cards[]): void {
        this.dealersDeck = dealersDeck;
    }

}