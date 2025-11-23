import { Cards } from "./CardsEnum.js";

export class DeckEntity {

    private Cards: Cards[] = [];
    

    getCards(): Cards[] {
        return this.Cards;
    }
    
    setCards(Cards: Cards[]) {
        this.Cards = Cards;
    }
}