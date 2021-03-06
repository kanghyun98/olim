import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { RootState } from '../../reducers';
import useInput from '../../hooks/useInput';
import { FormWrapper, TextBox, PreviewImagesWrapper, ImageWrapper, ButtonsWrapper } from './styled';
import { addPost, uploadImages } from '../../actions/post';
import { removeImage } from '../../reducers/post';
import { imageUrl } from '../../config/config';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostLoading, addPostDone } = useSelector((state: RootState) => state.post);
  const imageInput = useRef<HTMLInputElement>(null);
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
      formData.append('image', img); // req.body.image
    });
    formData.append('text', text); // req.body.text
    return dispatch(addPost(formData));
  }, [dispatch, imagePaths, text]);

  // 이미지 업로드 클릭 시 (input tag 실행)
  const onClickAddImage = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, [imageInput.current]);

  // 이미지 업로드 클릭 시 (실제 동작)
  const onUploadImages = useCallback((e) => {
    const imagesFormData = new FormData();
    [].forEach.call(e.target.files, (img) => {
      imagesFormData.append('image', img);
    });
    dispatch(uploadImages(imagesFormData)); // 미리보기를 위해서는 이미지를 클라우드에 올려야함
  }, []);

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
              <img src={`${imageUrl}/${img}`} alt={img} />
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
