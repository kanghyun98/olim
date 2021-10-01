import React from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

import Header from './Header';

const defaultStyle = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Container = styled.main`
  position: relative;
  min-height: 100vh;
  margin: 3rem auto;
  width: 100%;
  max-width: 975px;
`;

const AppLayout = ({ children }) => {
  return (
    <>
      <Global styles={defaultStyle} />
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default AppLayout;
