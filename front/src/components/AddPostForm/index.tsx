import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import useInput from '../../hooks/useInput';
import { FormWrapper, TextBox, PreviewImagesWrapper, ImageWrapper, ButtonsWrapper } from './styled';
import { addPost, uploadImages, removeImage } from '../../actions/post';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);
  const imageInput = useRef();
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone, setText]);

  // 작성 완료 클릭 시
  const onSubmit = useCallback(() => {
    const formData = new FormData();
    imagePaths.forEach((img) => {
      formData.append('image', img);
    });
    formData.append('content', text);
    console.log(formData);
    return dispatch(addPost(formData));
  }, [dispatch, imagePaths, text]);

  // 이미지 업로드 클릭 시 (input tag 실행)
  const onClickAddImage = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  // 이미지 업로드 클릭 시 (실제 동작)
  const onUploadImages = useCallback(
    (e) => {
      const imagesFormData = new FormData();
      [].forEach.call(e.target.files, (img) => {
        imagesFormData.append('image', img);
      });
      dispatch(uploadImages(imagesFormData)); // 미리보기를 위해서는 이미지를 클라우드에 올려야함
    },
    [dispatch],
  );

  const onClickRemoveImage = useCallback(
    (index) => () => {
      dispatch(removeImage(index));
    },
    [dispatch],
  );

  return (
    <FormWrapper encType="multipart/form-data" onFinish={onSubmit}>
      <TextBox
        value={text}
        onChange={onChangeText}
        showCount
        maxLength={100}
        placeholder="100자 이내로 게시글을 작성해주세요"
      />
      <PreviewImagesWrapper>
        {imagePaths.map((img, i) => {
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
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onUploadImages} />
        <Button onClick={onClickAddImage}>이미지 업로드</Button>
        <Button htmlType="submit" loading={addPostLoading}>
          작성 완료
        </Button>
      </ButtonsWrapper>
    </FormWrapper>
  );
};

export default AddPostForm;
