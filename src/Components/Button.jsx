import styled from 'styled-components';
import { Orange, Green, Red, ButtonShaddow, Disabled } from './Colors';

const Button = styled.button`
color: ${props => props.text ? props.disabled ? Disabled : Orange : "white"};
background: ${props => props.text ? "transparent" : props.success ? Green :  props.danger ? Red : Orange};
background: ${props => props.disabled ? props.text ? "" : Disabled : ""};
border: none;
border-radius: 16px;
font-weight: 600;
height: 32px;
font-size: 16px;
padding: 0px ${props => props.text ? "0" : "16"}px 0px ${props => props.text ? "0" : "16"}px;
box-shadow: ${props => props.text ? "none" : ButtonShaddow};
font-family: Kanit, sans-serif;
`

export default Button;