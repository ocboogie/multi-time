import styled from "styled-components";

const Timer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 300px;
  height: 280px;
  @media (max-width: 620px) {
    width: 100%;
  }
  .card-image {
    flex-grow: 1;
  }
`;

export default Timer;
