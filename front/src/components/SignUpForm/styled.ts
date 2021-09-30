import styled from '@emotion/styled';
import { Form } from 'antd';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled(Form)`
  width: 400px;

  & > h1 {
    text-align: center;
    font-size: 2.5rem;
    margin: 1.5rem auto 0.75rem;
  }

  & > div {
    position: relative;
    margin-top: 0.75rem;
  }

  & div:nth-child(6) {
    margin-bottom: 1.5rem;
    background-color: black;
  }

  & button {
    width: 100%;
  }
`;

export const ErrorMessage = styled.span`
  z-index: 10;
  position: absolute;
  display: inline-flex;
  align-items: center;
  height: 100%;
  right: 10px;
  color: red;
`;
