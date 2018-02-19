import styled from "styled-components";

const Hero = styled.div`
  margin: 15px auto;
  padding: 0 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  /* Mobile */
  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

export default Hero;

export const Logo = styled.h2`
  margin: 0;
  margin-bottom: 15px;
  font-size: 4.5rem;
  font-weight: 300;
  line-height: 1.1;
`;
