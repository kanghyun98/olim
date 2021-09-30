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

  & > div:nth-child(2) {
    margin-bottom: 0.75rem;
  }

  & button {
    width: 100%;
  }
`;
