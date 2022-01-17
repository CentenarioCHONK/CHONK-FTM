import styled from 'styled-components';
import { TextColor, TextColorHighlighted } from './Colors';

const Text = styled.span`
font-size: ${props => props.fontSize ? `${props.fontSize}px` : "14px"};
color: ${props => props.highlighted ? TextColorHighlighted : TextColor};
font-weight: ${props => props.bold ? "bold" : "normal "};
font-family: Kanit, sans-serif;
`

export default Text;