import React, { useRef, useState } from 'react';

interface DragAndDropProps {
  onFileDrop: (file: File) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ onFileDrop }) => {
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
    }
    for (let i = 0; i < e.dataTransfer.files['length']; i++) {
      setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileDrop(e.target.files[0]);
      for (let i = 0; i < e.target.files['length']; i++) {
        setFiles((prevState: any) => [...prevState, e.target.files[i]]);
      }
    }
  };

  const openFileExplorer = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  return (
    <div
      className={`${
        dragActive
          ? 'bg-blue-400 border-blue-300'
          : 'bg-blue-100 border-gray-300'
      }  p-4 w-full rounded-lg  border-2 border-dashed min-h-[8rem] text-center flex flex-col items-center justify-center mt-2`}
      onDragEnter={handleDragEnter}
      onSubmit={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <input
        id="profilePicture"
        name="profileImage"
        placeholder="fileInput"
        className="hidden"
        ref={inputRef}
        type="file"
        multiple={true}
        onChange={handleChange}
        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
      />
      {dragActive ? (
        <p>
          Drag & Drop files or{' '}
          <span
            className="font-bold text-blue-600 cursor-pointer"
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
              className="font-bold text-blue-600 cursor-pointer"
              onClick={openFileExplorer}
            >
              <u>Select files</u>
            </span>{' '}
            to upload
          </p>
          <div className="flex flex-col items-center p-3">
            {files.map((file: any, idx: any) => (
              <div key={idx} className="flex flex-row space-x-5">
                <span>{file.name}</span>
                <span
                  className="text-red-500 cursor-pointer"
                  onClick={() => removeFile(file.name, idx)}
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
