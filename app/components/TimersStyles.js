import styled from "styled-components";

const TimersContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  /* Set limit to 7 cards */
  max-width: 2170px;

  /* 6 cards */
  @media (max-width: 2210px) {
    max-width: 1860px;
  }

  /* 5 cards */
  @media (max-width: 1900px) {
    max-width: 1550px;
  }

  /* 4 cards */
  @media (max-width: 1590px) {
    max-width: 1240px;
  }

  /* 3 cards */
  @media (max-width: 1297px) {
    max-width: 930px;
  }

  /* 2 cards */
  @media (max-width: 987px) {
    max-width: 620px;
  }
  /* No need for 1 card ./Timer/indexStyles.js handles that */
`;

export default TimersContainer;

export const Item = styled.div`
  display: block;
  position: absolute;
  @media (max-width: 680px) {
    width: 100%;
  }
  margin: 5px;
  z-index: 1;
  &.muuri-item-dragging {
    z-index: 3;
  }
  &.muuri-item-releasing {
    z-index: 2;
  }
  &.muuri-item-hidden {
    z-index: 0;
  }
`;
