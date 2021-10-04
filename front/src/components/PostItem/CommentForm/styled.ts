import styled from '@emotion/styled';

export const CommentWrapper = styled.div`
  padding: 1.5rem;
  border: 1px solid #dbdbdb;
`;

export const CommentWriteFormWrapper = styled.div`
  padding-bottom: 1rem;

  & > form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;

    & > textarea {
      height: 3rem;
      max-height: 3rem;
      margin-right: 0.75rem;
    }
  }
`;
