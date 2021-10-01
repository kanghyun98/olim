import React from 'react';
import { Global, css } from '@emotion/react';

// header, footer 만들기
const defaultStyle = css`
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

const AppLayout = ({ children }) => {
  return (
    <div>
      <Global styles={defaultStyle} />
      {children}
    </div>
  );
};

export default AppLayout;
