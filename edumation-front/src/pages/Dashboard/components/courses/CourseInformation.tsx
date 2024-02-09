import React, { useEffect, useState } from 'react';
import { Course, School, User } from '../../../../services/Types';
import { toast } from 'react-toastify';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import SchoolsService from '../../../../services/SchoolsService';
import UsersService from '../../../../services/UsersService';

interface CourseInformationProps {
  course: Course;
}

const CourseInformation: React.FC<CourseInformationProps> = ({ course }) => {
  const [school, setSchool] = useState<School | undefined>();
  const [teacher, setTeacher] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const response = await SchoolsService.getSchoolsById(course.schoolId);
        setSchool(response.data);
      } catch (error) {
        toast.error('Failed to fetch School details');
      } finally {
        setLoading(false);
      }
    };
    const fetchTeacher = async () => {
      if (course.teacherId) {
        try {
          const response = await UsersService.getUserById(course.teacherId);
          if (response.data.role === 'teacher') {
            setTeacher(response.data);
          } else {
            toast.error('The user is not a teacher');
          }
        } catch (error) {
          toast.error('Failed to fetch teacher details');
        }
      } else {
        toast.error('Teacher ID is not defined');
      }
    };
    fetchTeacher();
    fetchSchool();
  }, [course]);

  if (loading) return <UserSkeleton />;

  return (
    <div className="bg-gray-200 shadow-md w-full flex justify-center rounded-lg p-8">
      <div className="max-w-md w-full space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Course information :</h2>
          <p className="text-gray-500">{course?.description}</p>
        </div>
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">
            {course?.courseDuration ? course.courseDuration : 0} Days
          </h2>
        </div>
        <div className="flex justify-evenly items-center text-center">
          <div className="space-y-4">
            <img
              className="w-32 h-32 m-auto rounded-full"
              src="https://via.placeholder.com/150"
              alt="School Pic"
            />
            <h3 className="mt-2">{school?.name || 'School not assigned'}</h3>
          </div>
          <div className="space-y-4">
            <img
              className="w-32 h-32 m-auto rounded-full"
              src={teacher?.profileImage || 'https://via.placeholder.com/150'}
              alt="Teacher Pic"
            />
            <h3 className="mt-2">{teacher?.name || 'Teacher not assigned'}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInformation;
