import { Stack } from "@mui/material";

import Input from "../../../Components/Input.jsx";
import Text from "../../../Components/Text";
import Card from "../../../Components/Card";
import Button from "../../../Components/Button.jsx";

export default function TradingPanel({
    label, 
    isBuyPanel, 
    disabled, 
    balance, 
    currency, 
    secondaryCurrency, 
    valueUSD, 
    onChange, 
    onMax, 
    value, 
    secondaryValue, 
    handleApprove
}) {

    return (
        <Card>
            <Stack spacing={2.5} style={{padding: "20px", height:"160px"}}>
                <Text bold fontSize="20" style={{color:"#d8e6fe"}}>{label} {currency}</Text>
                <Text fontSize="14">Balance: <Text highlighted fontSize="14">{balance}</Text> {currency}</Text>
                <Stack spacing={3} direction="row" justifyContent="space-between" alignItems="center">
                    <Stack spacing={1} direction="row" alignItems="center">
                        <Stack spacing={2} direction="row" style={{borderWidth: "1px", borderColor: "white", borderStyle: "solid", borderRadius: "7px", paddingInline: "7px", width: "100%"}}>
                            <Input value={value} onUserInput={onChange}/>
                            <Button text onClick={onMax} disabled={disabled}>Max</Button>
                        </Stack>
                        <Text>{currency}</Text>
                    </Stack>
                    {
                    isBuyPanel ? 
                    <Button success disabled={disabled} onClick={handleApprove} style={{width: "81px", cursor: "pointer"}}>Spend</Button>
                    :
                    <Button danger disabled={disabled} onClick={handleApprove} style={{width: "81px", cursor: "pointer"}}>Sell</Button>
                    }
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Text fontSize="14">~ <Text highlighted fontSize="14">{secondaryValue}</Text> {secondaryCurrency}</Text>
                    <Text fontSize="14">~ <Text highlighted fontSize="14">{valueUSD}</Text> USD</Text>
                </Stack>
            </Stack>
        </Card>
    );
};