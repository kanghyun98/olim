import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SlideList = styled(Slider)`
  position: relative;

  & .slick-track {
    display: flex;
    align-items: center;
    background-color: #fafafa;
  }

  & .slick-slider {
    border: 1px solid #dbdbdb;
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
    height: 100%;
    max-height: 750px;
    margin: 0 auto;
  }
`;
