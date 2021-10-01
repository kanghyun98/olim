import styled from '@emotion/styled';

export const ProfileHeadWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 0 auto 2rem;

  & > h3 {
    font-weight: 600;
  }
`;

export const MyUserInfo = styled.div`
  display: flex;
  align-items: center;

  & > h2 {
    font-weight: 300;
    font-size: 2rem;
    margin-right: 1.5rem;
  }
`;

export const MyPostInfo = styled.ul`
  display: flex;
  margin-bottom: 1.5rem;
  list-style: none;

  & > li {
    margin-right: 2.5rem;

    & > span {
      font-weight: 600;
    }
  }
`;
