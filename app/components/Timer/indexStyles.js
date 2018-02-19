import styled from "styled-components";

const Timer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 300px;
  height: 280px;
  margin: 0.5rem 0 0rem 0 !important;
  /* Mobile */
  @media (max-width: 680px) {
    width: 100%;
  }
  .card-image {
    flex-grow: 1;
  }
`;

export default Timer;
