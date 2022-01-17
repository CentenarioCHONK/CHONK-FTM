import { useContractCall, useContractFunction } from "@usedapp/core";
import { chonkInterface, contract, smartContractAddress } from "./config";

export function useMyDividends(includeReferralBonus) {
    const [dividends] = useContractCall({
          abi: chonkInterface,
          address: smartContractAddress,
          method: 'myDividends',
          args: [includeReferralBonus],
      }
    ) ?? []
    console.log(dividends)
    return dividends
}

export function useCalculateBnbReceived(tokensToSell) {
    console.log(tokensToSell);
    const [bnb] = useContractCall({
          abi: chonkInterface,
          address: smartContractAddress,
          method: 'calculateFtmReceived',
          args: [tokensToSell],
      }
    ) ?? []
    return bnb;
}

export function useCalculateTokensReceived(bnbToSpend) {
    console.log(bnbToSpend);
    const [tokens] = useContractCall({
          abi: chonkInterface,
          address: smartContractAddress,
          method: 'calculateTokensReceived',
          args: [bnbToSpend],
      }
    ) ?? []
    return tokens;
}

export function useHolder() {
    const [count] = useContractCall({
        abi: chonkInterface,
        address: smartContractAddress,
        method: "getTokenHolderAmount",
        args: [],
    }) ?? [];
    return count;
}

export function useTvl() {
    const [count] = useContractCall({
        abi: chonkInterface,
        address: smartContractAddress,
        method: "totalFtmBalance",
        args: [],
    }) ?? [];
    return count;
}

export function useBuyPrice() {
    const [count] = useContractCall({
        abi: chonkInterface,
        address: smartContractAddress,
        method: "buyPrice",
        args: [],
    }) ?? [];
    return count;
}

export function useSellPrice() {
    const [count] = useContractCall({
        abi: chonkInterface,
        address: smartContractAddress,
        method: "sellPrice",
        args: [],
    }) ?? [];
    return count;
}

export function useBuyChonk() {
    const { state, send } = useContractFunction(contract, "buy");
    return { buyState: state, sendBuyTx: send };
}

export function useSellChonk() {
    const { state, send } = useContractFunction(contract, "sell");
    return { sellstate: state, sendSellTx: send };
}

export function useWithdraw() {
    const { state, send } = useContractFunction(contract, "withdraw");
    return { withdrawState: state, sendWithdrawTx: send };
}

export function useReinvest() {
    const { state, send } = useContractFunction(contract, "reinvest");
    return { reinvestState: state, sendReinvestTx: send };
}






