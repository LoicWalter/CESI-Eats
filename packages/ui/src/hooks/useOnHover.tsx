'use client';

import { useState } from 'react';

export function useOnHover(): [boolean, { onMouseEnter: () => void; onMouseLeave: () => void }] {
  const [hovered, setHovered] = useState(false);

  const bind = {
    onMouseEnter: () => {
      setHovered(true);
    },
    onMouseLeave: () => {
      setHovered(false);
    },
  };

  return [hovered, bind];
}
