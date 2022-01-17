import { Link, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { ReactComponent as TelegramIcon } from "../../images/telegram.svg";
import { ReactComponent as DiscordIcon } from "../../images/discord.svg";
import { ReactComponent as FantomScanIcon } from "../../images/fantom.svg";
import styles from "./Header.Styles";
import { ReactComponent as Logo } from "../../images/logoWithText.svg";
import Button from "../../Components/Button";
import { Contract, Discord, GitBook, Telegram } from "../../Socials";
import Text from "../../Components/Text";
import { useEthers, shortenAddress, useLookupAddress } from "@usedapp/core";
import { formatEther } from '@ethersproject/units'
import { useBuyPrice, useHolder, useTvl } from "../../SmartContract/interaction";

export default function Header() {
    const { activateBrowserWallet, account } = useEthers();
    const ens = useLookupAddress();
    const holder = useHolder();
    const tvl = useTvl();
    const buyPrice = useBuyPrice();

    return (
        <Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" style={styles.header}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Link to="/"><Logo style={styles.logo}/></Link>
                    <Link to="/swap" style={styles.buttonLink}>Exchange</Link>
                    <a href={GitBook} target="_blank" rel="noopener noreferrer" style={styles.buttonLink}>Wiki</a>
                </Stack>
                <Stack direction="row" spacing={4}>
                    <Text fontSize="16" style={{color: '#d8e6fe'}}>Hodler: <Text fontSize="16" highlighted>{holder ? holder.toString() : 0}</Text></Text>
                    <Text fontSize="16" style={{color: '#d8e6fe'}}>TVL: <Text fontSize="16" highlighted>{tvl ? Number(formatEther(tvl)).toFixed(2) : 0}</Text> FTM</Text>
                    <Text fontSize="16" style={{color: '#d8e6fe'}}>Price: <Text fontSize="16" highlighted>{buyPrice ? Number(formatEther(buyPrice)).toFixed(5) : 0}</Text> FTM</Text>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                    <a href={Discord} target="_blank" rel="noopener noreferrer"><DiscordIcon style={styles.socialIcon}/></a>
                    <a href={Telegram} target="_blank" rel="noopener noreferrer"><TelegramIcon style={styles.socialIcon}/></a>
                    <a href={Contract} target="_blank" rel="noopener noreferrer"><FantomScanIcon style={styles.socialIcon}/></a>
                    <Button style={styles.button} onClick={() => activateBrowserWallet()}>{account ? ens ? ens : shortenAddress(account) : "Connect Wallet"}</Button>
                </Stack>
            </Stack>
            <Outlet/>
        </Stack>
    );
};