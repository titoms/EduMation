import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CoursesService from '../../../../services/CoursesService';
import { Course } from '../../../../services/Types';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import BackButton from '../../../../components/ui/BackButton';

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
      <div className="bg-white shadow rounded-lg p-4 mt-4">
        <h1 className="text-2xl my-4 font-semibold">{course?.title}</h1>
        <div className="my-4">
          <p className="text-gray-600">School ID: {course.schoolId}</p>
          {course.teacherId && (
            <p className="text-gray-600">Teacher ID: {course.teacherId}</p>
          )}
          {course.quizIds && course.quizIds.length > 0 && (
            <p className="text-gray-600">
              Quiz IDs: {course.quizIds.join(', ')}
            </p>
          )}
          <p className="text-gray-600">
            Duration:{' '}
            {course.courseDuration
              ? `${course.courseDuration} days`
              : 'Not specified'}
          </p>
        </div>
      </div>
    </>
  );
};

export default IndividualCourse;
