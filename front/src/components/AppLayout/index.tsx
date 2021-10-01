import React from 'react';
import { Global } from '@emotion/react';

import { defaultStyle, Container } from './styled';
import Header from './Header';

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
