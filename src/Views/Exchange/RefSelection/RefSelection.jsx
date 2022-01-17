import { Grid, Stack } from "@mui/material";
import Card from "../../../Components/Card";
import { Orange } from "../../../Components/Colors";
import RadioButton from "../../../Components/RadioButton";
import Text from "../../../Components/Text";

function Referal({name, value, checked, onChange}) {
    return (
        <Stack spacing={1} style={{ alignItems: "center", width: "100%"}}>
            <RadioButton type="radio" value={value} checked={checked} onChange={(e) => onChange(e.target.value)}/>
            <Text>{name}</Text>
        </Stack>
    );
};

export default function RefSelection({checked, handleChange, showAllOptions}) {
    return(
        <Card>
            <Grid container spacin={1} style={{padding: "20px", margin: "0px"}}>
                <Grid item xs={12} style={{marginBottom: "16px"}}>
                    <div style={{textAlign: "center", width: "100%", color: "white", fontFamily: "Kanit, sans-serif"}}>Select below, if and which referral you want to use:</div>
                </Grid>
                <Grid item xs={6} md={showAllOptions === true ? 4 : 6}>
                    <Referal name="No Referral" value="one" checked={checked === "one"} onChange={handleChange}/>
                </Grid>
                {showAllOptions === true ? <Grid item xs={6} md={4}>
                    <Referal name="Origin Referral" value="two" checked={checked === "two"} onChange={handleChange}/>
                </Grid> : null}
                <Grid item xs={showAllOptions === true ? 12 : 6} md={showAllOptions === true ? 4 : 6}>
                    <Referal name="Support CHONK" value="four" checked={checked === "four"} onChange={handleChange}/>
                </Grid>
            </Grid>
        </Card>
    );
};