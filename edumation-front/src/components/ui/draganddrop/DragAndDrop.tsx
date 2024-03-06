import React, { useRef, useState } from 'react';

interface DragAndDropProps {
  onFileDrop: (file: File) => void;
  fileType: 'csv' | 'image' | 'ics';
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ onFileDrop, fileType }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<any>([]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileDrop(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
      setFiles([...e.dataTransfer.files]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileDrop(e.target.files[0]);
      setFiles([...e.target.files]);
    }
  };

  const openFileExplorer = () => {
    inputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_: any, idx: number) => idx !== index));
  };

  // Determine the accept attribute based on fileType prop
  const acceptTypes = {
    csv: '.xlsx,.xls,.csv',
    image: 'image/*',
    ics: '.ics',
  };

  return (
    <div
      className={`${
        dragActive
          ? 'bg-gray-400 border-gray-300 dark:bg-slate-700 dark:border-slate-500'
          : 'bg-gray-100 border-gray-300 dark:bg-slate-600 dark:border-slate-400'
      }  p-4 w-full rounded-lg border-2 border-dashed min-h-[8rem] text-center flex flex-col items-center justify-center mt-2`}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <input
        className="hidden"
        ref={inputRef}
        type="file"
        multiple
        onChange={handleChange}
        accept={acceptTypes[fileType]} // Use fileType to set accept attribute
      />
      {dragActive ? (
        <p>
          Drag & Drop files or{' '}
          <span
            className="font-bold text-gray-600 dark:text-white cursor-pointer"
            onClick={openFileExplorer}
          >
            <u>Select files</u>
          </span>{' '}
          to upload
        </p>
      ) : (
        <>
          <p>
            Drag & Drop files or{' '}
            <span
              className="font-bold text-gray-600 dark:text-white cursor-pointer"
              onClick={openFileExplorer}
            >
              <u>Select files</u>
            </span>{' '}
            to upload
          </p>
          <div className="flex flex-col items-center p-3">
            {files.map((file: File, idx: number) => (
              <div key={idx} className="flex flex-row space-x-5">
                <span>{file.name}</span>
                <span
                  className="text-red-500 cursor-pointer"
                  onClick={() => removeFile(idx)}
                >
                  remove
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DragAndDrop;
