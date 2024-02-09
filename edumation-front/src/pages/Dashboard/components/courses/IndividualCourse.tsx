import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CoursesService from '../../../../services/CoursesService';
import { Course } from '../../../../services/Types';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import BackButton from '../../../../components/ui/BackButton';
import CourseInformation from './CourseInformation';
import CourseUpdate from './CourseUpdate';
import DeleteConfirmationModal from '../../../../components/DeleteConfirmationModal';

const IndividualCourse: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | undefined>();
  const courseId = params.id || '';
  const [loading, setLoading] = useState<boolean>(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState<number>(0); // Update trigger state
  const navigate = useNavigate();

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
  }, [courseId, updateTrigger]);

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
  const handleOpenDelete = () => setOpenDeleteModal(true);
  const handleCloseDelete = () => setOpenDeleteModal(false);

  const onCourseUpdate = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  const handleCourseDelete = async () => {
    if (!courseId) return;
    try {
      await CoursesService.deleteCourses(courseId);
      toast.success('Course deleted successfully');
      navigate('/dashboard/courses');
    } catch (error) {
      toast.error('Failed to delete course');
    } finally {
      setOpenDeleteModal(false);
    }
  };

  return (
    <>
      <BackButton />
      <h1 className="text-2xl my-4 font-semibold">{course?.title}</h1>
      <div className="flex gap-8 justify-around">
        {/* FIRST COLUMN */}
        {course && <CourseInformation course={course} />}
        {/* SECOND COLUMN */}
        <CourseUpdate
          courseId={courseId}
          onDelete={handleOpenDelete}
          onCourseUpdate={onCourseUpdate}
        />
        {courseId && (
          <DeleteConfirmationModal
            open={openDeleteModal}
            onClose={handleCloseDelete}
            onDelete={() => handleCourseDelete()}
            itemId={courseId}
            confirmationMessage="Are you sure you want to delete this course?"
          />
        )}
      </div>
    </>
  );
};

export default IndividualCourse;
