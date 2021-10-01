import styled from '@emotion/styled';

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 3rem 5rem;
  margin: 0 auto;
  font-size: 1rem;

  & > div {
    display: flex;

    & > a {
      font-size: 1.5rem;
      color: gray;
      margin-right: 1rem;
    }
  }
`;

export default FooterWrapper;
