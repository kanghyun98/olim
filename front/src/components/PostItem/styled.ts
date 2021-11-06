import styled from '@emotion/styled';

export const CardWrapper = styled.div`
  border: 1px solid #dbdbdb;
  margin-bottom: 20px;

  & .ant-card-head {
    padding-left: 0.75rem;

    & .ant-card-head-title {
      padding: 0.75rem 0;
    }

    & .ant-card-body {
      padding: 1rem;
    }

    & .ant-card-actions {
      & > li {
        margin: 0.5rem 0;
      }
    }
  }
`;

export const HeaderLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    & > span {
      margin-right: 0.5rem;
    }
  }

  & > .date {
    font-size: 0.5rem;
    color: darkgray;
  }
`;
