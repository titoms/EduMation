import { TextField } from '@mui/material';
import BackButton from '../../../../components/ui/BackButton';

const ClassImport = () => {
  return (
    <>
      <BackButton />
      <h2 className="text-lg font-semibold mt-4">Import a class</h2>
      <form>
        <label></label>
        <TextField
          fullWidth
          margin="normal"
          label="Class Name"
          variant="outlined"
          name="name"
        />
      </form>
    </>
  );
};

export default ClassImport;
