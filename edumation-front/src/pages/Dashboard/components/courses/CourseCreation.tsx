import { useState } from 'react';
import BackButton from '../../../../components/ui/BackButton';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Course } from '../../../../services/Types';
import { useNavigate } from 'react-router-dom';
import CoursesService from '../../../../services/CoursesService';

const CourseCreation = () => {
  const navigate = useNavigate();
  const [createCourseData, setCreateCourseData] = useState<Course>({
    title: '',
    description: '',
    courseDuration: 0,
  });

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateCourseData({
      ...createCourseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateCourse = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await CoursesService.createCourses(createCourseData);
      console.log('Course created successfully:', response.data);
      navigate('/dashboard/courses');
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <BackButton />
      </div>
      <h1 className="text-2xl font-semibold">Create new Course</h1>
      <div className="bg-gray-200 shadow-md w-full flex justify-center rounded-lg p-8">
        <form onSubmit={handleCreateCourse}>
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
                name="title"
                fullWidth
                onChange={handleDataChange}
              />
              <TextField
                id="courseDescription"
                label="Course Description"
                name="description"
                variant="outlined"
                fullWidth
                onChange={handleDataChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  {' '}
                  <TextField
                    id="courseDuration"
                    label="Course Duration"
                    type="number"
                    name="courseDuration"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleDataChange}
                    fullWidth
                  />
                </div>
                <div className="space-y-2">
                  {' '}
                  <FormControl fullWidth onChange={handleDataChange}>
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
          <div className="flex gap-4 justify-end mt-8">
            <Button type="submit" variant="contained">
              Create
            </Button>
            <BackButton title="Cancel" icon={false} />
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseCreation;
