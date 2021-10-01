import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const defaultStyle = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const Container = styled.main`
  position: relative;
  min-height: 100vh;
  margin: 3rem auto;
  width: 100%;
  max-width: 975px;
`;
