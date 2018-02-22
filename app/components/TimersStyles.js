import styled from "styled-components";

const TimersContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
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
  touch-action: auto !important;
  user-select: auto !important;
  -webkit-user-drag: auto !important;
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
