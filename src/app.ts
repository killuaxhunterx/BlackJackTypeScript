import { StartController } from "./controller/StartController.js";
import { Cards } from "./model/CardsEnum.js";
import { DealerEntity } from "./model/DealerEntity.js";
import { DeckEntity } from "./model/DeckEntity.js";
import { PlayerEntity } from "./model/PlayerEntity.js";
import type { Draw, Winner } from "./model/WinnerType.js";
import { DealerService } from "./service/DealerService.js";
import { DeckService } from "./service/DeckService.js";



const deckEntity = new DeckEntity();
const playerEntity = new PlayerEntity();
const dealerEntity = new DealerEntity();
const deckService = new DeckService(deckEntity);
const dealerService = new DealerService(deckService, playerEntity, dealerEntity);
const start = new StartController(dealerService, dealerEntity, playerEntity);
start.run();