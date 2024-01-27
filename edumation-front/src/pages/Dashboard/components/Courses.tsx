import { useState, useEffect } from 'react';
import axios from 'axios';
import { Course } from '../../../services/Types';
import CoursesService from '../../../services/CoursesService';
import { Button, Grid, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import Edit from '@mui/icons-material/Edit';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await CoursesService.getAllCourses();
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data);
        } else {
          setError('An error occurred while fetching courses.');
        }
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <>
        <Skeleton variant="text" height={60} />
        <Grid container spacing={2} className="mb-4 w-full">
          <Grid item xs={12} md={6} xl={4}>
            <Skeleton variant="rounded" height={300} />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Skeleton variant="rounded" height={300} />
          </Grid>
        </Grid>
      </>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1 className="text-2xl font-semibold">Courses</h1>
      <div className="mt-4 flex justify-end">
        <Link to="new">
          <Button startIcon={<Edit />} variant="contained">
            Create new Course
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course._id} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <div className="text-bold mt-4">
                <p className="mt-2">School ID: {course.schoolId}</p>
                <p className="mt-2">Teacher ID: {course.teacherId}</p>
                <p className="mt-2">
                  Student IDs: {course.studentIds.join(', ')}
                </p>
                <p className="mt-2">Quiz IDs: {course.quizIds.join(', ')}</p>
                <p className="mt-2">Schedule ID: {course.scheduleId}</p>
              </div>
              <hr />
              <p className="mt-4">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
