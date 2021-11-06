import React, { useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

import { HeaderWrapper, HeaderList, HomeIcon, SearchBox, MenuBox } from './styled';
import { logout } from '../../../actions/user';

const Header = () => {
  const dispatch = useDispatch();
  const { myInfo } = useSelector((state) => state.user);

  const onSearch = useCallback((value) => {
    Router.push(`/tags/${value}`);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link href={`/profile/${myInfo.userName}`}>
          <a>프로필</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={onLogout} danger>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderWrapper>
      <HeaderList>
        <HomeIcon>
          <Link href="/">
            <a>olim</a>
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
