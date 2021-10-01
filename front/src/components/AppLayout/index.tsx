import React from 'react';
import { Global } from '@emotion/react';

import { defaultStyle, Container } from './styled';
import Header from './Header';
import Footer from './Footer';

const AppLayout = ({ children }) => {
  return (
    <>
      <Global styles={defaultStyle} />
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default AppLayout;
