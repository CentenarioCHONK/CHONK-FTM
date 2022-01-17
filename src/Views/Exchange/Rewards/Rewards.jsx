import { Stack } from "@mui/material";
import Card from "../../../Components/Card";
import Text from "../../../Components/Text";
import Button from "../../../Components/Button";

export default function Rewards({disabled, rewards, rewardsInUsd, onReinvest, onClaim}) {
    return(
        <Card>
            <Stack justifyContent="space-between" style={{padding: "20px", height:"160px"}}>
                <Text bold fontSize="20" style={{color:"#d8e6fe"}}>Rewards</Text>
                <Text><Text highlighted>{rewards}</Text> FTM (~ <Text highlighted>{rewardsInUsd}</Text> USD)</Text>
                <Stack direction="row" justifyContent="space-between">
                    <Button success disabled={disabled} onClick={onReinvest}>Reinvest</Button>
                    <Button danger disabled={disabled} onClick={onClaim}>Claim</Button>
                </Stack>
            </Stack>
        </Card>
    );
};