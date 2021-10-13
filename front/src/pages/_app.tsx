import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'antd/dist/antd.css';

import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';

const App = ({ Component }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>olim</title>
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  );
};

export default wrapper.withRedux(App);
