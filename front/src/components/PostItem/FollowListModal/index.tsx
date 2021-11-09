import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, List } from 'antd';

import { RootState } from '../../../reducers';
import { loadFollowings, loadFollowers, unfollow, removeFollower } from '../../../actions/user';

import { ModalWrapper, ModalContent, ModalOverlay, MoreButton } from './styled';

interface Props {
  userId: number;
  userName: string;
  tabName: string | string[];
}

const FollowListModal = ({ userId, userName, tabName }: Props) => {
  const dispatch = useDispatch();

  const { dataList, loadFollowingsLoading, loadFollowersLoading, unfollowLoading, removeFollowerLoading } = useSelector(
    (state: RootState) => state.user,
  );
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (tabName === 'followers') {
      dispatch(loadFollowers({ userId, limit }));
    }
    if (tabName === 'followings') {
      dispatch(loadFollowings({ userId, limit }));
    }
  }, [limit, tabName, userId]);

  const loadMore = useCallback(() => {
    setLimit((prev) => prev + 3);
  }, []);

  const onCancel = (id: number) => () => {
    if (tabName === 'followings') {
      dispatch(unfollow({ id }));
    }
    dispatch(removeFollower({ id }));
  };

  const onCloseModal = useCallback(() => {
    Router.push(`/profile/${userName}`);
  }, [userName]);

  return (
    <ModalWrapper>
      <ModalContent>
        <div className="modal-header">
          <h1>{tabName}</h1>
          <CloseOutlined onClick={onCloseModal} />
        </div>
        <div className="modal-main">
          {dataList && (
            <List
              loadMore={
                <MoreButton className="more-button-wrapper">
                  <Button onClick={loadMore} loading={loadFollowingsLoading || loadFollowersLoading}>
                    more
                  </Button>
                </MoreButton>
              }
              bordered
              dataSource={dataList}
              renderItem={(item: any) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <Link href={`/profile/${item.userName}`}>
                        <a>{item.userName}</a>
                      </Link>
                    }
                    description={item.name}
                  />
                  <div>
                    <Button onClick={onCancel(item.id)} loading={unfollowLoading || removeFollowerLoading}>
                      삭제
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          )}
        </div>
      </ModalContent>
      <Link href={`/profile/${userName}`}>
        <ModalOverlay />
      </Link>
    </ModalWrapper>
  );
};

export default FollowListModal;
