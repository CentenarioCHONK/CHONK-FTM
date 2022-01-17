import { Stack } from "@mui/material";
import Card from "../../../Components/Card";
import { Orange } from "../../../Components/Colors";
import Input from "../../../Components/Input";
import Text from "../../../Components/Text";
import { ReactComponent as Copy } from "../../../images/copy.svg";
import styled from 'styled-components';

const Address = styled.div`
  flex: 1;
  position: relative;

  & > input {
    background: transparent;
    border: 0;
    color: white;
    display: block;
    font-size: 16px;
    padding: 0;
    width: 100%;

    &:focus {
      outline: 0;
    }
  }

  &:after {
    background: linear-gradient(
      to right,
      #00000000,
      #000000E6
    );
    content: '';
    height: 100%;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
  }
`

export default function MyHoldings({holdings, holdingsInBnb, shareOfPool, reflink}) {
    return(
        <Card>
            <Stack justifyContent="space-between" style={{padding: "20px", height:"160px"}}>
                <Text bold fontSize="20" style={{color:"#d8e6fe"}}>My Holdings</Text>
                <Stack spacing={1}>
                    <Text><Text highlighted>{holdings}</Text> CHONK (~ <Text highlighted>{holdingsInBnb}</Text> FTM)</Text>
                    <Text><Text highlighted>{shareOfPool}</Text>% of pool size</Text>
                </Stack>
                <Text>Earn <Text highlighted>3</Text>% with your reflink:</Text>
                <Stack spacing={1} direction="row" justifyContent="space-between">
                    <Address ><Input readOnly value={reflink}/></Address>
                    <Copy style={{fill: Orange}} onClick={() => navigator.clipboard.writeText(reflink)}/>
                </Stack>
            </Stack>
        </Card>
    );
};