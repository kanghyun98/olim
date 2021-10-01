import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'antd/dist/antd.css';

import AppLayout from '../components/AppLayout';

const App = ({ Component }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>noname</title>
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  );
};

export default App;
