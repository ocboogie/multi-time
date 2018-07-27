import styled from "styled-components";

const LoginModal = styled.div`
  hr {
    margin: 3rem 1rem;
    opacity: 0.3;
  }
  .tabs .tab a {
    font-size: 1.3rem;
  }
  .tabs {
    background-color: #fafafa;
  }
  .finish-form-btn {
    /* width: 200px; */
  }
  .input-field > label {
    width: 100%;
  }
  .error-row {
    margin-bottom: 10px;
    .error {
      position: relative;
      transition: opacity 0.2s ease-in-out 0.2s, font-size 0.2s ease-in-out;
      opacity: 0;
      color: #f44336;
      font-size: 0;
      &.active {
        font-size: inherit;
        opacity: 1;
      }
    }
  }
`;

export default LoginModal;
