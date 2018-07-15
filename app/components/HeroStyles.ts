import styled from "styled-components";

const Hero = styled.div`
  margin: 15px auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Mobile */
  @media (max-width: 700px) {
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

export const Login = styled.div`
  float: right;
`;
