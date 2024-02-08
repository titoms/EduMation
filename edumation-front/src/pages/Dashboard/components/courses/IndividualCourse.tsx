import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CoursesService from '../../../../services/CoursesService';
import { Course, School, User } from '../../../../services/Types';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import BackButton from '../../../../components/ui/BackButton';
import CourseInformation from './CourseInformation';
import CourseUpdate from './CourseUpdate';
import SchoolsService from '../../../../services/SchoolsService';
import UsersService from '../../../../services/UsersService';

const IndividualCourse: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | undefined>();
  const [school, setSchool] = useState<School | undefined>();
  const [teacher, setTeacher] = useState<User>();
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
        if (fetchedCourse.schoolId) {
          SchoolsService.getSchoolsById(fetchedCourse.schoolId)
            .then((response) => {
              setSchool(response.data);
            })
            .catch((error) => {
              toast.error('Failed to fetch School details');
              console.log(error);
            });
        }
        if (fetchedCourse.teacherId) {
          UsersService.getUserById(fetchedCourse.teacherId)
            .then((response) => {
              if (response.data.role === 'teacher') {
                setTeacher(response.data);
              } else {
                toast.error('The user is not a teacher');
              }
            })
            .catch((error) => {
              toast.error('Failed to fetch teacher details');
              console.log(error);
            });
        }
      } catch (error) {
        toast.error('Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleCourseDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implement the logic to handle form data changes
  };

  const handleUpdateCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement the logic to update the course details
  };

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
        {course && (
          <CourseInformation
            course={course}
            school={school}
            teacher={teacher}
          />
        )}
        {/* SECOND COLUMN */}
        <CourseUpdate
          course={course}
          school={school}
          teacher={teacher}
          handleCourseDataChange={handleCourseDataChange}
          handleUpdateCourse={handleUpdateCourse}
        />
      </div>
    </>
  );
};

export default IndividualCourse;
