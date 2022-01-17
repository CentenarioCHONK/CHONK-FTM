import { useCallback, useEffect, useState } from "react";
import Page from "../../Components/Page";
import Rewards from "./Rewards/Rewards";
import MyHoldings from "./MyHoldings/MyHoldings";
import TradingPanel from "./TradingPanel/TradingPanel";
import RefSelection from "./RefSelection/RefSelection";
import { Grid } from "@mui/material";
import Card from "../../Components/Card";
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { formatEther, formatUnits } from '@ethersproject/units'
import { smartContractAddress } from "../../SmartContract/config";
import { utils, Contract } from 'ethers'
import {
    useBuyChonk,
    useBuyPrice,
    useReinvest,
    useSellChonk,
    useSellPrice,
    useTvl,
    useWithdraw
} from '../../SmartContract/interaction';
import { useCoingeckoPrice } from '@usedapp/coingecko'
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { addressRegex, cookieExpirationDate } from "../../vipReflinks";
import { abi } from "../../SmartContract/abi"

export default function Exchange() {
    const [location] = useState(useLocation());
    const [buyAmount, setBuyAmount] = useState("");
    const [sellAmount, setSellAmount] = useState("");
    const [rewardsAmount, setRewardsAmount] = useState("");
    const [cookies, setCookie] = useCookies(['Refaddress', 'Refselection']);
    const [reflinkSelection, setReflinkSelection] = useState(cookies.Refselection);
    const { account, library, active } = useEthers();
    const balance = useEtherBalance(account);
    const chonkBalance = useTokenBalance(smartContractAddress, account);
    const buyPrice = useBuyPrice();
    const sellPrice = useSellPrice();
    const tvl = useTvl();
    const EtherPriceUSD = useCoingeckoPrice('fantom', 'usd')
    const { sellstate, sendSellTx } = useSellChonk();
    const { buyState, sendBuyTx } = useBuyChonk();
    const { reinvestState, sendReinvestTx } = useReinvest();
    const { withdrawState, sendWithdrawTx } = useWithdraw();

    useEffect(() => {
        const getData = async () => {
            if (active) {
                const signer = library.getSigner();
                const contract = new Contract(smartContractAddress, abi, signer);
                const promises = [contract.myDividends(true)];
                await Promise.all(promises)
                  .then((value) => {
                      setRewardsAmount(utils.formatEther(value[0]._hex));
                  }).catch((error) => console.log(error));
            }}
        getData();
    });

    const handleChange = useCallback((value) => {
        setCookie('Refselection', value, { path: '/', expires: cookieExpirationDate });
        setReflinkSelection(value);
    }, [setCookie]);

    useEffect(() => {
        if (cookies.Refaddress === undefined && addressRegex.test(location.search)) {
            setCookie('Refaddress', location.search.replace("?ref=", ""), { path: '/', expires: cookieExpirationDate })
            setCookie('Refselection', "two", { path: '/', expires: cookieExpirationDate })
            setReflinkSelection("two");
        }
        if (cookies.Refselection === undefined) {
            handleChange("three");
        }
    }, [location, cookies, setCookie, setReflinkSelection, handleChange]);

    async function buyChonk(amount) {
        let ref = '';
        switch (cookies.Refselection) {
            case "two":
                ref = cookies.Refaddress;
                break;
            case "three":
                ref = '0x0c30ccDAB056A4e743E1d2FAdef1398f1244B82a'; // CHONK ADDRESS
                break;
            default:
                ref = '0x0000000000000000000000000000000000000000';
        }
        await sendBuyTx(ref, { value: utils.parseEther(amount.replace(',', '.')) })
    }

    async function sellChonk(amount) {
        await sendSellTx(utils.parseEther(amount.replace(',', '.')));
    }

    async function reinvest() {
        await sendReinvestTx();
    }

    async function withdraw() {
        await sendWithdrawTx();
    }

    const getShareOfPool = () => {
        if (chonkBalance && sellPrice && tvl) {
            if (Number(formatUnits(chonkBalance, 18)) > 0) {
                const cBalance = (Number(formatUnits(chonkBalance, 18)))
                const sPrice = Number(formatEther(sellPrice))
                const t = Number(formatEther(tvl))
                return (cBalance * sPrice/t * 100).toFixed(2)
            }
        }
        return "0"
    }


    return (
      <Page>
          <Grid container spacing={0} justifyContent="center" style={{maxWidth: "950px", paddingTop: "25px", paddingBottom: "25px"}}>
              <Grid item xs={12} sm={7} md={6}>
                  <Card>
                      <Grid container>
                          <Grid item style={{width: "100%"}}>
                              <TradingPanel
                                label="Spend"
                                isBuyPanel
                                disabled={account === null}
                                balance={balance ? Number(formatEther(balance)).toFixed(4) : 0}
                                currency="FTM"
                                secondaryCurrency="CHONK"
                                valueUSD={buyAmount * EtherPriceUSD}
                                onChange={(value) => setBuyAmount(value)}
                                onMax={() => setBuyAmount((formatEther(balance) - 0.005).toString())}
                                value={buyAmount}
                                secondaryValue={buyPrice ? (Number(buyAmount)/Number(formatEther(buyPrice))).toFixed(4) : "0"}
                                handleApprove={() => buyChonk(buyAmount)}
                              />
                          </Grid>
                          <Grid item style={{width: "100%"}}>
                              <TradingPanel
                                label="Sell and Claim"
                                isBuyPanel={false}
                                disabled={account === null}
                                balance={chonkBalance ? Number(formatUnits(chonkBalance, 18)).toFixed(2) : 0}
                                currency="CHONK"
                                secondaryCurrency="FTM"
                                valueUSD={sellPrice ? Number((Number(sellAmount)*Number(formatEther(sellPrice))).toString()*EtherPriceUSD).toFixed(4) : "0"}
                                onChange={(value) => setSellAmount(value)}
                                onMax={() => setSellAmount(formatUnits(chonkBalance, 18))}
                                value={sellAmount}
                                secondaryValue={sellPrice ? (Number(sellAmount)*Number(formatEther(sellPrice))).toFixed(4) : "0"}
                                handleApprove={() => sellChonk(sellAmount)}
                              />
                          </Grid>
                      </Grid>
                  </Card>
              </Grid>
              <Grid item xs={12} sm={7} md={6}>
                  <Card>
                      <Grid container>
                          <Grid item style={{width: "100%"}}>
                              <Rewards
                                disabled={account === null}
                                rewards={Number(rewardsAmount).toFixed(8)}
                                rewardsInUsd={EtherPriceUSD ? (Number(rewardsAmount) * Number(EtherPriceUSD)).toFixed(4) : "0"}
                                onReinvest={() => reinvest()}
                                onClaim={() => withdraw()}
                              />
                          </Grid>
                          <Grid item style={{width: "100%"}}>
                              <MyHoldings
                                holdings={chonkBalance ? Number(formatUnits(chonkBalance, 18)).toFixed(2) : 0}
                                holdingsInBnb={chonkBalance && sellPrice ?(Number(formatUnits(chonkBalance, 18))*Number(formatEther(sellPrice))).toFixed(4) : "0"}
                                shareOfPool={getShareOfPool()}
                                reflink={`${window.location.protocol}//${window.location.host}/swap?ref=${account ? account : "-"}`}
                              />
                          </Grid>
                      </Grid>
                  </Card>
              </Grid>
              <Grid item xs={12} sm={7} md={12}>
                  <Card style={{padding: "5px"}}>
                      <RefSelection
                        checked={reflinkSelection}
                        showAllOptions={cookies.Refaddress !== undefined}
                        handleChange={handleChange}
                      />
                  </Card>
              </Grid>
          </Grid>
      </Page>
    );
};