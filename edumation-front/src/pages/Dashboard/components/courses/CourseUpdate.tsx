import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import BackButton from '../../../../components/ui/BackButton';
import { Course } from '../../../../services/Types';
import { toast } from 'react-toastify';
import CoursesService from '../../../../services/CoursesService';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import TeacherSelect from './TeacherSelect';

interface CourseUpdateProps {
  courseId: string;
}

const CourseUpdate: React.FC<CourseUpdateProps> = ({ courseId }) => {
  const [courseData, setCourseData] = useState<Course>({
    title: '',
    description: '',
    courseDuration: 0,
    teacherId: '',
  });
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await CoursesService.getCoursesById(courseId);
        setCourseData(response.data);
      } catch (error) {
        toast.error('Failed to fetch course details');
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleCourseDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value: string | number = e.target.value;

    if (e.target.type === 'number') {
      value = parseInt(e.target.value, 10);
    }

    setCourseData((courseData) => {
      if (!courseData) return null;
      return {
        ...courseData,
        [name]: value,
      };
    });
  };

  const handleUpdateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (courseData) {
      try {
        await CoursesService.updateCourses(courseId, courseData);
        toast.success('Course updated successfully');
        console.log(courseData);
      } catch (error) {
        console.error('Error updating course:', error);
        toast.error('Error updating course.');
      }
    }
  };

  if (!courseData) return <UserSkeleton />;

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
              value={courseData.title}
              fullWidth
              onChange={handleCourseDataChange}
            />
            <TextField
              id="courseDescriptionUpdate"
              label="Course Description"
              name="description"
              variant="outlined"
              value={courseData.description}
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
                  name="courseDuration"
                  value={courseData.courseDuration}
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
                    name="courseDurationType"
                  >
                    <MenuItem value="Day">Day</MenuItem>
                    <MenuItem value="Hours">Hours</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="space-y-2">
              {' '}
              <TeacherSelect
                value={courseData.teacherId}
                name="teacherId"
                onChange={handleCourseDataChange}
              />
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
