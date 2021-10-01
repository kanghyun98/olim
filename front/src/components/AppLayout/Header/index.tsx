import React, { useCallback } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

import { HeaderWrapper, HeaderList, HomeIcon, SearchBox, MenuBox } from './styled';

const Header = () => {
  const onSearch = useCallback((value) => {
    console.log(value);
  }, []);

  // header 버튼 구현하기
  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        프로필
      </Menu.Item>
      <Menu.Item key="logout" danger>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderWrapper>
      <HeaderList>
        <HomeIcon>
          <Link href="/">
            <a>NONAME</a>
          </Link>
        </HomeIcon>
        <div>
          <SearchBox placeholder="검색" onSearch={onSearch} />
          <MenuBox overlay={menu} placement="bottomCenter" icon={<MenuOutlined />} />
        </div>
      </HeaderList>
    </HeaderWrapper>
  );
};

export default Header;
