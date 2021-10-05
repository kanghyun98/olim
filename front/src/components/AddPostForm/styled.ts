import styled from '@emotion/styled';
import { Form, Input } from 'antd';

export const FormWrapper = styled(Form)`
  padding: 1rem 0.5rem;
  margin-bottom: 1.75rem;
  border: 1px solid #dbdbdb;
`;

export const TextBox = styled(Input.TextArea)`
  margin-bottom: 1rem;

  & > textarea {
    height: 6rem;
    max-height: 6rem;
  }
`;

export const PreviewImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

export const ImageWrapper = styled.div`
  position: relative;
  margin-right: 1rem;

  & > div {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 0;
  }

  & > img {
    width: 150px;
    height: 150px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
