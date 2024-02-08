import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CoursesService from '../../../../services/CoursesService';
import { Course } from '../../../../services/Types';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import BackButton from '../../../../components/ui/BackButton';
import CourseInformation from './CourseInformation';
import CourseUpdate from './CourseUpdate';

const IndividualCourse: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | undefined>();
  const courseId = params.id || '';
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) {
        toast.error('Course ID is undefined');
        setLoading(false);
        return;
      }
      try {
        const courseResponse = await CoursesService.getCoursesById(courseId);
        const fetchedCourse = courseResponse.data;
        setCourse(fetchedCourse);
      } catch (error) {
        toast.error('Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
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
      <h1 className="text-2xl my-4 font-semibold">{course?.title}</h1>
      <div className="flex gap-8 justify-around">
        {/* FIRST COLUMN */}
        {course && <CourseInformation course={course} />}
        {/* SECOND COLUMN */}
        <CourseUpdate />
      </div>
    </>
  );
};

export default IndividualCourse;
