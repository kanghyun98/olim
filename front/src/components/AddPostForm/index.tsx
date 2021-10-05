import React, { useRef, useCallback } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import useInput from '../../hooks/useInput';
import { FormWrapper, TextBox, PreviewImagesWrapper, ImageWrapper, ButtonsWrapper } from './styled';

const dummy = {
  imgPaths: [
    'https://res.cloudinary.com/du2sma6fw/image/upload/v1629943639/default_image.jpg',
    'https://res.cloudinary.com/du2sma6fw/image/upload/v1629941392/home_image.jpg',
  ],
};

const AddPostForm = () => {
  const imageInput = useRef();
  const [text, onChangeText, setText] = useInput('');

  const onSubmit = useCallback(() => {
    console.log('test');
    setText('');
  }, [setText]);

  const onChangeImage = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    console.log(imageFormData); // 미리보기를 위해서는 이미지를 클라우드에 올려야함
  }, []);

  const onClickRemoveImage = useCallback(
    (index) => () => {
      console.log(`${index}번째 이미지 제거`);
    },
    [],
  );

  const onClickAddImage = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <FormWrapper onFinish={onSubmit}>
      <TextBox
        value={text}
        onChange={onChangeText}
        showCount
        maxLength={100}
        placeholder="100자 이내로 게시글을 작성해주세요"
      />
      <PreviewImagesWrapper>
        {dummy.imgPaths.map((img, i) => {
          return (
            <ImageWrapper key={img}>
              <div>
                <CloseOutlined onClick={onClickRemoveImage(i)} />
              </div>
              <img src={img} alt={img} />
            </ImageWrapper>
          );
        })}
      </PreviewImagesWrapper>
      <ButtonsWrapper>
        <input type="file" multiple hidden ref={imageInput} onChange={onChangeImage} />
        <Button onClick={onClickAddImage}>이미지 업로드</Button>
        <Button htmlType="submit">작성 완료</Button>
      </ButtonsWrapper>
    </FormWrapper>
  );
};

export default AddPostForm;
