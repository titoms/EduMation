import BackButton from '../../../../components/ui/BackButton';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
const CourseCreation = () => {
  return (
    <>
      <div className="mb-4">
        <BackButton />
      </div>
      <h1 className="text-2xl font-semibold">Create new Course</h1>
      <div className="bg-gray-200 shadow-md w-full flex justify-center rounded-lg p-8">
        <div className="max-w-md w-full space-y-6">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Courses Settings :</h2>
              <p className="text-gray-500">Enter the Courses details</p>
            </div>
            <TextField
              id="courseTitle"
              label="Course Title"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="courseDescription"
              label="Course Description"
              variant="outlined"
              fullWidth
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {' '}
                <TextField
                  id="courseDuration"
                  label="Course Duration"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </div>
              <div className="space-y-2">
                {' '}
                <FormControl fullWidth>
                  <InputLabel>Courses :</InputLabel>
                  <Select
                    labelId="course-duration-label"
                    id="course-duration"
                    label="Courses :"
                    defaultValue="Day"
                  >
                    <MenuItem value="Day">Day</MenuItem>
                    <MenuItem value="Hours">Hours</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-end mt-8">
        <Button type="submit" variant="contained">
          Create
        </Button>
        <BackButton title="Cancel" icon={false} />
      </div>
    </>
  );
};

export default CourseCreation;
