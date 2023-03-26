import styled from "styled-components";

const Wrapper = styled.main`
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-1000);
    }
  }
  h4 {
    font-weight: 700;
    color: var(--primary-1000);
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
  .dark {
    background-color: #333;
    color: #fff;
  }
  .light {
    background-color: #fff;
    color: #333;
  }
`;
export default Wrapper;
