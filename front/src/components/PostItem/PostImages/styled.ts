import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SlideWrapper = styled.div``;

export const SlideList = styled(Slider)`
  position: relative;

  & .slick-track {
    display: flex;
    align-items: center;
  }

  & .slick-arrow {
    z-index: 10;
    display: flex;
    justify
  }

  & .slick-prev {
    left: 0.5rem;
  }

  & .slick-next {
    right: 0.75rem;
  }

  & .slick-prev:before,
  .slick-next:before {
    font-size: 1.7rem;
  }
`;

export const ImageWrapper = styled.div`
  & img {
    width: 100%;
    max-height: 750px;
    margin: 0 auto;
  }
`;
