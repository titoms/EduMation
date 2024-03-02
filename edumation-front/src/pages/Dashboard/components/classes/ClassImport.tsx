import { Button, TextField } from '@mui/material';
import BackButton from '../../../../components/ui/BackButton';
import DragAndDrop from '../../../../components/ui/draganddrop/DragAndDrop';
import { useState } from 'react';

const ClassImport = () => {
  const [excelFile, setExcelFile] = useState<File | null>(null);

  const handleFileDrop = (file: File) => {
    setExcelFile(file);
  };

  return (
    <>
      <BackButton />
      <h2 className="text-lg font-semibold mt-4">Import a class</h2>
      <form>
        <TextField
          fullWidth
          margin="normal"
          label="Class Name"
          variant="outlined"
          name="name"
        />
        <h2 className="text-lg font-semibold mt-4">Import Students</h2>
        <DragAndDrop fileType="csv" onFileDrop={handleFileDrop} />
      </form>
      <div className="flex gap-4 justify-end mt-8">
        <Button type="submit" variant="contained">
          Import
        </Button>
        <BackButton title="Cancel" icon={false} />
      </div>
    </>
  );
};

export default ClassImport;
