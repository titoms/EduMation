import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CoursesService from '../../../../services/CoursesService';
import { Course } from '../../../../services/Types';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import BackButton from '../../../../components/ui/BackButton';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import CourseInformation from './CourseInformation';

const IndividualCourse: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | undefined>();
  const courseId = params.id || '';
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        toast.error('Course ID is undefined');
        setLoading(false);
        return;
      }
      try {
        const courseResponse = await CoursesService.getCoursesById(courseId);
        setCourse(courseResponse.data);
      } catch (error) {
        toast.error('Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleCourseDataChange = () => {};

  const handleUpdateCourse = () => {};

  if (loading) return <UserSkeleton />;

  if (!course) {
    return (
      <>
        <BackButton />
        <div className="text-center text-red-500 font-semibold">
          Course details not available.
        </div>
      </>
    );
  }

  return (
    <>
      <BackButton />
      <h1 className="text-2xl my-4 font-semibold">{course?.title}</h1>
      <div className="flex gap-8 justify-around">
        {/* FIRST COLUMN */}
        {course && <CourseInformation course={course} />}
        {/* SECOND COLUMN */}
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
      </div>
    </>
  );
};

export default IndividualCourse;
