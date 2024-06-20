import React from 'react';
import { TaskAltRounded, HighlightOffRounded } from '@mui/icons-material';

export function DeliveryButtons() {
  return (
    <div className="ui-absolute ui-bottom-0 ui-right-0 ui-flex ui-flex-row ui-w-[5.15rem] ui-h-8 ui-m-2 ui-justify-between ui-items-center ui-rounded-full ui-bg-gray-5">
      <button className="ui-w-8 ui-h-full ui-ml-0.5">
        <TaskAltRounded className="ui-text-green-600 active:ui-text-green-900 ui-w-full ui-h-full" />
      </button>
      <button className="ui-w-8 ui-h-full ui-mr-0.5">
        <HighlightOffRounded className="ui-text-red-600 active:ui-text-red-900 ui-w-full ui-h-full" />
      </button>
    </div>
  );
}
