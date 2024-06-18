'use client';

import styled from '@emotion/styled';
import React from 'react';
import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import flechegauche from '../assets/flechegauche.svg';
import flechedroite from '../assets/flechedroite.svg';

interface CarouselProps {
  children: React.ReactNode;
  responsive?: ResponsiveType;
}

const defaultResponsive = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1124 },
    items: 6,
  },
  smallDesktop: {
    breakpoint: { max: 1124, min: 700 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 700, min: 560 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 560, min: 0 },
    items: 2,
  },
};

const StyledCarousel = styled(Carousel)`
  .react-multiple-carousel__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border: none;
    background-color: #394d5933;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-size: 50%; /* Ajuste la taille de l'icône */
    background-repeat: no-repeat;
    background-position: center;

    &:hover {
      background-color: #dd231b;
    }
  }
`;

export function CardCarousel({ children, responsive }: CarouselProps) {
  return (
    <StyledCarousel
      responsive={responsive || defaultResponsive}
      swipeable
      draggable
      ssr
      infinite
      keyBoardControl
      transitionDuration={300}
      removeArrowOnDeviceType={['tablet', 'mobile']}
    >
      {children}
    </StyledCarousel>
  );
}
