import styled from '@emotion/styled';
import { Input, Dropdown } from 'antd';

export const HeaderWrapper = styled.header`
  position: fixed;
  height: 3rem;
  top: 0;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fafafa;
  z-index: 10;
`;

export const HeaderList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  max-width: 975px;
  margin: 0 auto;
  padding: 0 1rem;

  & > div {
    display: flex;
  }
`;

export const HomeIcon = styled.div`
  font-size: 1.5rem;
`;

export const SearchBox = styled(Input.Search)``;

export const MenuBox = styled(Dropdown.Button)``;
