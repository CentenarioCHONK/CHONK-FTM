import { useState, useEffect } from 'react'
import { Stack } from "@mui/material";
import styled, { keyframes } from 'styled-components'
import Page from "../../Components/Page"
import { ReactComponent as Background } from "../../images/home.svg";
import { ReactComponent as LazyChonk } from "../../images/chonk-sleep.svg";
import Text from "../../Components/Text";
import Button from "../../Components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { GetAddress, cookieExpirationDate } from '../../vipReflinks';

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }  
`

const ChonkWrapper = styled.div`
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
`


export default function Home() {
    const navigate = useNavigate();
    const [location] = useState(useLocation());
    const [cookies, setCookie] = useCookies(['Refaddress', 'Refselection']);

    useEffect(() => {
        const reflink = location.pathname.slice(1);
        const vIPAddress = GetAddress(reflink);
        if (vIPAddress !== undefined) {
            setCookie('Refaddress', vIPAddress, { path: '/', expires: cookieExpirationDate })
            setCookie('Refselection', "two", { path: '/', expires: cookieExpirationDate })
        }
    }, [location, setCookie]);

    return (
      <Page>
          <Stack alignItems="center" style={{width: "100%", paddingTop: "100px"}}>
              <Stack direction="row" justifyContent="space-evenly" style={{maxWidth: "1200px", paddingLeft: "50px", paddingRight: "50px"}}>
                  <Stack spacing={4} style={{width: "50%", lineHeight: 1.1}}>
                      <Text fontSize="64" bold style={{color: "#5977d1"}}>Finance is made of lazy chonks.</Text>
                      <Text fontSize="20" bold style={{zIndex: 1, color: "#F4EEFF"}}>Earn FTM while being lazy.</Text>
                      <Button style={{zIndex: 1, width: "150px", height: "50px"}} onClick={() => navigate("/swap")}>Launch App</Button>
                  </Stack>
                  <LazyChonk style={{zIndex: 1, width: "50%"}}/>
              </Stack>
              <Background style={{marginTop: "-150px"}}/>
              <div style={{width: "100%", height: "50vh", backgroundColor: "black", marginTop: "-1px"}}/>
          </Stack>
      </Page>
    );
};