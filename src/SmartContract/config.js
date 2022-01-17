import { Fantom } from '@usedapp/core';
import { utils } from 'ethers'
import ChonkAbi from "./chonk.json";
import { Contract } from '@ethersproject/contracts'

export const config = {
  readOnlyChainId: Fantom.chainId,
  readOnlyUrls: {
    [Fantom.chainId]: 'https://rpc.ftm.tools/',
  },
}

export const smartContractAddress = "0xDa02e1ab2410fCbBF4bc7aB7EC4109Cfb6A39649"
export const chonkInterface = new utils.Interface(ChonkAbi)
export const contract = new Contract(smartContractAddress, chonkInterface)

