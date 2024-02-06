import React from 'react';
import { Course } from '../../../../services/Types';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

interface CourseCardProps {
  course: Course;
  onDelete: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onDelete }) => {
  const handleDelete = () => {
    if (course._id) {
      onDelete(course._id);
    } else {
      toast.error('Attempted to delete a course without an ID.');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <div className="mt-4">
        <p>School ID: {course.schoolId}</p>
        <p>Teacher ID: {course.teacherId}</p>
        <p>
          Student IDs:{' '}
          {course.studentIds ? course.studentIds.join(', ') : 'N/A'}
        </p>
        <p>Quiz IDs: {course.quizIds ? course.quizIds.join(', ') : 'N/A'}</p>
        <p>
          Duration:{' '}
          {course.courseDuration
            ? `${course.courseDuration} hours`
            : 'Not specified'}
        </p>
      </div>
      <hr />
      <p className="mt-4">{course.description}</p>
      <div className="flex justify-end gap-2 mt-4">
        <Button
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          <span className="hidden md:inline">Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
