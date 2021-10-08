import React from 'react';
import { Global } from '@emotion/react';
import { useSelector } from 'react-redux';

import { defaultStyle, Container } from './styled';
import Header from './Header';
import Footer from './Footer';

const AppLayout = ({ children }) => {
  const { myInfo } = useSelector((state) => state.user);

  return (
    <>
      <Global styles={defaultStyle} />
      {myInfo && <Header />}
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default AppLayout;
