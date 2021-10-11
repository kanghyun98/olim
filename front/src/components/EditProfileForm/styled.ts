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

  & .ant-form-item-label {
    width: 8rem;
  }

  & button {
    width: 100%;
  }
`;
