import styled from "styled-components";

const TimersContainer = styled.div`
  overflow: hidden;
  text-align: center;
`;

export const Item = styled.div`
  display: inline-block;
  /* Mobile */
  @media (max-width: 700px) {
    display: block;
  }
  margin: 10px;
`;

export default TimersContainer;
