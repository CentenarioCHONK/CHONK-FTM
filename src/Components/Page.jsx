import styled from 'styled-components';

const Page = styled.div`
background: ${() => "linear-gradient(180deg, #304FAC, #000)"};
background-color: "blue";
display: flex;
flex-direction: column;
align-items: center;
padding-bottom: 0;
min-height: calc(100vh - 56px);
`;

export default Page;