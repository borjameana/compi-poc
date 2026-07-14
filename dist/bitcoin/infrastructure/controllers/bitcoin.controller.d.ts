import { GetBitcoinHistory } from '../../application/get-bitcoin-history';
import { BitcoinHistoryResponseDto } from '../dtos/bitcoin-history-response.dto';
export declare class BitcoinController {
    private readonly getBitcoinHistory;
    private readonly logger;
    constructor(getBitcoinHistory: GetBitcoinHistory);
    getHistory(): Promise<BitcoinHistoryResponseDto>;
}
