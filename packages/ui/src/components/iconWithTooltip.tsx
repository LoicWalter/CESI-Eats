import React from 'react';
import { Tooltip } from '@mui/material';

interface IconWithTooltipProps {
  children?: React.ReactNode;
  tooltip: string;
}

export function IconWithTooltip({ children, tooltip }: IconWithTooltipProps) {
  return (
    <Tooltip
      title={tooltip}
      arrow
    >
      <>{children}</>
    </Tooltip>
  );
}
