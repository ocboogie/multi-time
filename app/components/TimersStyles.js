import styled from "styled-components";

const TimersContainer = styled.div`
  margin-left: 60px auto;
  margin-right: 60px auto;
  max-width: 940px;
  position: relative;
`;

export default TimersContainer;

export const Item = styled.div`
  display: block;
  position: absolute;
  @media (max-width: 620px) {
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
