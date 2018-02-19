import styled from "styled-components";

const TimersContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  /* Set limit to 6 cards */
  max-width: 1899px;
  /* 5 cards */
  @media (max-width: 1899px) {
    max-width: 1592px;
  }

  /* 4 cards */
  @media (max-width: 1592px) {
    max-width: 1296px;
  }

  /* 3 cards */
  @media (max-width: 1296px) {
    max-width: 965px;
  }

  /* 2 cards */
  @media (max-width: 965px) {
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
