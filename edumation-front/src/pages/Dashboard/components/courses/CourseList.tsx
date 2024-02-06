// Adjusted CoursesList component
import React, { useEffect, useState } from 'react';
import CoursesService from '../../../../services/CoursesService';
import { Course } from '../../../../services/Types';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import { toast } from 'react-toastify';
import CourseCard from './CourseCard';
import DeleteConfirmationModal from '../../../../components/DeleteConfirmationModal';

interface CoursesListProps {
  filter: string;
}

const CoursesList: React.FC<CoursesListProps> = ({ filter }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenDelete = (courseId: string) => {
    setSelectedCourseId(courseId);
    setOpenDeleteModal(true);
  };

  const handleCloseDelete = () => setOpenDeleteModal(false);

  const handleCourseDelete = async () => {
    if (!selectedCourseId) return;

    try {
      await CoursesService.deleteCourses(selectedCourseId);
      toast.success('Course deleted successfully');
      setRefreshKey((prevKey) => prevKey + 1);
      setCourses(courses.filter((course) => course._id !== selectedCourseId));
    } catch (error) {
      toast.error('Failed to delete course');
    } finally {
      setSelectedCourseId(undefined);
      setOpenDeleteModal(false);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await CoursesService.getAllCourses();
        const filteredCourses = response.data.filter((course) =>
          course.title.toLowerCase().includes(filter.toLowerCase())
        );
        setCourses(filteredCourses);
      } catch (err) {
        toast.error('An error occurred while fetching courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [filter, refreshKey]);

  if (loading) return <UserSkeleton />;
  if (!courses.length) return <div>No courses available.</div>;

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            onDelete={handleOpenDelete}
          />
        ))}
      </div>
      {selectedCourseId && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          onClose={handleCloseDelete}
          onDelete={() => handleCourseDelete()}
          itemId={selectedCourseId}
          confirmationMessage="Are you sure you want to delete this course?"
        />
      )}
    </div>
  );
};

export default CoursesList;
