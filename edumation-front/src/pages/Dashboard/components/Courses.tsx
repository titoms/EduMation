import { useState, useEffect } from 'react';
import axios from 'axios';
import { Course } from '../../../services/Types';
import CoursesService from '../../../services/CoursesService';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Edit from '@mui/icons-material/Edit';
import SearchBar from '../../../components/ui/SearchBar';
import UserSkeleton from '../../../components/ui/skeletons/UserSkeleton';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await CoursesService.getAllCourses();
        setCourses(response.data);
        const result = courses.filter((course) =>
          course.title.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredCourses(result);
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
  }, [filter, courses]);

  if (loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-screen">
      <h1 className="text-2xl font-semibold">Courses</h1>
      <div className="mt-4 flex justify-end gap-4">
        <SearchBar onFilterChange={setFilter} />
        <Link to="new">
          <Button startIcon={<Edit />} variant="contained">
            Create new Course
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
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
    </div>
  );
};

export default Courses;
