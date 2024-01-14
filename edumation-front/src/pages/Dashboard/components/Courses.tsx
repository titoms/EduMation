import { useState, useEffect } from 'react';
import axios from 'axios';

type Course = {
  _id: string;
  title: string;
  description: string;
  schoolId: string;
  teacherId: string;
  studentIds: string[];
  quizIds: string[];
  scheduleId: string;
};

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1 className="text-2xl font-semibold">Courses</h1>
      <div className="h-screen mt-8">
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
