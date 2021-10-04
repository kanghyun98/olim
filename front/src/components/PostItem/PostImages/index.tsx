import React from 'react';

import { SlideList, ImageWrapper } from './styled';

const PostImages = ({ images }) => {
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <SlideList {...settings}>
      {images.map((img) => (
        <ImageWrapper key={img.src}>
          <img src={img.src} alt={img.src} />
        </ImageWrapper>
      ))}
    </SlideList>
  );
};

export default PostImages;
