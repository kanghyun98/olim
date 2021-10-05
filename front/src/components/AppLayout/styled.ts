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
    color: #00376b;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const Container = styled.main`
  position: relative;
  min-height: 100vh;
  max-width: 42rem;
  width: 100%;
  margin: 4rem auto;
  padding: 0 1rem;
`;
