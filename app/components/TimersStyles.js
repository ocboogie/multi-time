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

export const Empty = styled.div`
  text-align: center;
  margin-top: 25px;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.5);
`;

export default TimersContainer;
