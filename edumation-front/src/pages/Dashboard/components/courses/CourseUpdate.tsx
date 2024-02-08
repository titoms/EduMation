import React from 'react';
import { Course, School, User } from '../../../../services/Types';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import BackButton from '../../../../components/ui/BackButton';

interface CourseUpdateProps {
  course: Course;
  school: School | undefined;
  teacher: User | undefined;
  handleCourseDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateCourse: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CourseUpdate: React.FC<CourseUpdateProps> = ({
  course,
  teacher,
  school,
  handleCourseDataChange,
  handleUpdateCourse,
}) => {
  return (
    <div className="bg-gray-200 shadow-md w-full flex justify-center rounded-lg p-8">
      <form onSubmit={handleUpdateCourse} className="">
        <div className="max-w-md w-full space-y-6">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Course Update :</h2>
              <p className="text-gray-500">Enter the Courses details</p>
            </div>
            <TextField
              id="courseTitleUpdate"
              label="Course Title"
              variant="outlined"
              name="title"
              fullWidth
              onChange={handleCourseDataChange}
            />
            <TextField
              id="courseDescriptionUpdate"
              label="Course Description"
              name="description"
              variant="outlined"
              fullWidth
              onChange={handleCourseDataChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {' '}
                <TextField
                  id="courseDurationUpdate"
                  label="Course Duration"
                  type="number"
                  name="courseDurationUpdate"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleCourseDataChange}
                  fullWidth
                />
              </div>
              <div className="space-y-2">
                {' '}
                <FormControl fullWidth onChange={handleCourseDataChange}>
                  <InputLabel>Courses :</InputLabel>
                  <Select
                    labelId="course-duration-update-label"
                    id="course-duration-update"
                    label="Courses :"
                    defaultValue="Day"
                  >
                    <MenuItem value="Day">Day</MenuItem>
                    <MenuItem value="Hours">Hours</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="space-y-2">
              {' '}
              <FormControl fullWidth onChange={handleCourseDataChange}>
                <InputLabel>Teacher :</InputLabel>
                <Select
                  labelId="teacher-update-label"
                  id="teacher-update"
                  label="Courses :"
                  defaultValue="Day"
                >
                  <MenuItem value="Day">Teacher 1</MenuItem>
                  <MenuItem value="Hours">Teacher 2</MenuItem>
                  <MenuItem value="Hours">Teacher 3</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-end mt-8">
          <Button type="submit" variant="contained">
            Update
          </Button>
          <BackButton title="Cancel" icon={false} />
        </div>
      </form>
    </div>
  );
};

export default CourseUpdate;
