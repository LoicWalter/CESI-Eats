'use client';

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface CarouselProps {
  children: React.ReactNode;
}

const responsive = {
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

export function CardCarousel({ children }: CarouselProps) {
  return (
    <Carousel
      responsive={responsive}
      swipeable
      draggable
      ssr
      infinite
      keyBoardControl
      transitionDuration={300}
      removeArrowOnDeviceType={['tablet', 'mobile']}
    >
      {children}
    </Carousel>
  );
}
