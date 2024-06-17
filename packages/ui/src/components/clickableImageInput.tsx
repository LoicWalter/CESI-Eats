'use client';

import { AccountCircleOutlined, Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ChangeEvent, MouseEvent, useRef, useState } from 'react';

interface ClickableImageInputProps {
  handleFile: (file: File) => void;
  name: string;
  defaultValue?: React.ReactNode;
  smallIcon?: boolean;
}

export function ClickableImageInput({
  name,
  handleFile,
  defaultValue,
  smallIcon,
}: ClickableImageInputProps) {
  const [file, setFile] = useState<File | null>(null);
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) return;
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
    handleFile(fileUploaded);
  };

  return (
    <div className="ui-relative ui-px-2">
      <IconButton onClick={handleClick}>
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="profile"
            className={`${smallIcon ? 'ui-w-8 ui-h-8' : 'ui-w-48 ui-h-48'} ui-rounded-full ui-object-cover ui-aspect-square ui-object-center`}
          />
        ) : defaultValue ? (
          defaultValue
        ) : (
          <AccountCircleOutlined className="ui-w-40 ui-h-40 ui-text-primary" />
        )}
      </IconButton>
      {file && (
        <IconButton
          onClick={() => setFile(null)}
          className="ui-absolute ui-right-0 ui-bottom-0 ui-bg-white ui-rounded-full ui-p-1 ui-m-1"
        >
          <Delete />
        </IconButton>
      )}
      <input
        name={name}
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: 'none' }} // Make the file input element invisible
      />
    </div>
  );
}
