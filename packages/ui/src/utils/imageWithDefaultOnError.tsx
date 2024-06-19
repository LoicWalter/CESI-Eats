'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageWithDefaultOnErrorProps
  extends Omit<React.ComponentProps<typeof Image>, 'onError' | 'src'> {
  defaultReactNode: React.ReactNode;
  src: string;
  forceDefault?: boolean;
}

export const ImageWithDefaultOnError = ({
  forceDefault,
  defaultReactNode,
  ...rest
}: ImageWithDefaultOnErrorProps) => {
  const [defaultImage, setDefaultImage] = useState(false);

  if (forceDefault) {
    return <div className={rest.className}>{defaultReactNode}</div>;
  }

  return !defaultImage ? (
    <Image
      {...rest}
      unoptimized={true}
      loader={() => rest.src}
      onError={() => {
        setDefaultImage(true);
      }}
    />
  ) : (
    <div className={rest.className}>{defaultReactNode}</div>
  );
};
