import React from 'react';

import { SlideList, ImageWrapper } from './styled';
import { imageUrl } from '../../../config/config';
import { ImageType } from '../../../reducers/post';

interface Props {
  images: ImageType[];
}

const PostImages = ({ images }: Props) => {
  const settings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <SlideList {...settings}>
      {images.map((img) => (
        <ImageWrapper key={img.src}>
          <img src={`${imageUrl}/${img.src}`} alt={img.src} />
        </ImageWrapper>
      ))}
    </SlideList>
  );
};

export default PostImages;
