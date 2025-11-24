import promptSync, { type Prompt } from 'prompt-sync';
import type { DealerService } from '../service/DealerService';
import type { DealerEntity } from '../model/DealerEntity';
import type { PlayerEntity } from '../model/PlayerEntity';
import type { Cards } from '../model/CardsEnum';

export class StartController {

    private prompt = promptSync();
    private dealerService: DealerService;
    private dealerEntity: DealerEntity;
    private playerEntity: PlayerEntity;

    constructor(dealerService: DealerService, dealerEntity: DealerEntity, playerEntity: PlayerEntity) {
        this.dealerService = dealerService;
        this.dealerEntity = dealerEntity;
        this.playerEntity = playerEntity;
    }

    getPlayersFunds(): void {
        const funds: unknown = this.prompt("Player's fund: ");
        this.playerEntity.setFunds(Number(funds));
    }

    getBet(): void {
        const bet: unknown = this.prompt("Enter your bet: ");
        this.playerEntity.setBet(Number(bet));
    }

    showPlayersHand(): void {
        const playersHand: Cards[] = this.playerEntity.getPlayersHand();
        const totalScore: number = this.dealerService.getScoreOfBothHands(this.playerEntity);
        console.log(`Your hand: ${playersHand} (total: ${totalScore})`);
    }

    showDealersHiddenHand(): void {
        const dealersHand: Cards[] = this.dealerEntity.getDealersHand();
        console.log(`Dealer's hand: ${dealersHand[0]}, [HIDDEN]`);
    }

    showDealersFullHand(): void {
        const dealersHand: Cards[] = this.dealerEntity.getDealersHand();
        console.log(`Dealer's hand: ${dealersHand}`);
    }

    getAction(): boolean {
        const action: string = this.prompt("Your action (hit/stand): ");
        if (action.toLowerCase() === "hit".toLowerCase()) {
            return true;
        } else {
            return false;
        }
    }

    dealersHits(): void {
        const totalScore: number = this.dealerEntity.getScoreHand();
        const dealersHand: Cards[] = this.dealerEntity.getDealersHand();
        console.log(`Dealer's hits: ${dealersHand} (total: ${totalScore})`);
    }

    payoutBetsPlayer(): void {
        const totalScore: number = this.playerEntity.getScoreHand();
        if (totalScore == 21) {
            console.log(`You win $ ${this.dealerService.payThePlayerBetForBlackJack()}`)
            console.log(`Player's funds: $ ${this.playerEntity.getFunds()}`)
        } else {
            console.log(`You win $ ${this.dealerService.payThePlayerBetNormal()}`)
            console.log(`Player's funds: $ ${this.playerEntity.getFunds()}`)
        }
    }


    run(): void {
        this.getPlayersFunds();
        this.getBet();
        this.showPlayersHand();
        this.showDealersHiddenHand();
        while (this.getAction() && this.playerEntity.getScoreHand() != 21) {
            this.dealerService.giveOneMoreCardToPlayer();
            this.showPlayersHand();
            if (this.playerEntity.getScoreHand() > 21) {
                this.dealerService.getWinner();
                this.payoutBetsPlayer();
                break;
            }
        }
        if (this.dealerEntity.getScoreHand() <= 16) {
            this.dealerService.giveOneMoreCardToDealer();
            this.dealersHits();
            this.dealerService.getWinner();
            this.payoutBetsPlayer();
        }
    }
}