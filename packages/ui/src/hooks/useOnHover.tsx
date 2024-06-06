'use client';

import { useState } from 'react';

function useOnHover(): [boolean, { onMouseEnter: () => void; onMouseLeave: () => void }] {
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

export default useOnHover;
