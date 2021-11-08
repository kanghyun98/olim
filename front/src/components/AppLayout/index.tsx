import React from 'react';
import { Global } from '@emotion/react';
import { useSelector } from 'react-redux';

import { RootState } from '../../reducers';
import { defaultStyle, Container } from './styled';
import Header from './Header';
import Footer from './Footer';

const AppLayout = ({ children }: any) => {
  const { myInfo } = useSelector((state: RootState) => state.user);

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
