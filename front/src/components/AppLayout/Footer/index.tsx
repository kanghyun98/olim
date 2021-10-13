import React from 'react';
import Link from 'next/link';
import { UserOutlined, GithubOutlined } from '@ant-design/icons';

import FooterWrapper from './styled';

const Footer = () => {
  return (
    <FooterWrapper>
      <span>© 2021 kanghyun</span>
      <div>
        <Link href="https://github.com/kanghyun98">
          <a title="github">
            <GithubOutlined />
          </a>
        </Link>
        <Link href="https://kanghyun.netlify.app/">
          <a title="blog">
            <UserOutlined />
          </a>
        </Link>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
