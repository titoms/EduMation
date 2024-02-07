import React from 'react';
import { Course } from '../../../../services/Types';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

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
      <Link to={course._id}>
        <h3 className="text-lg font-semibold">{course.title}</h3>
      </Link>
      <div className="my-4">
        {course.schoolId && <p>School ID: {course.schoolId}</p>}
        {course.teacherId && <p>Teacher ID: {course.teacherId}</p>}
        {course.quizIds && course.quizIds.length > 0 && (
          <p>Quiz IDs: {course.quizIds.join(', ')}</p>
        )}
        <p>
          Duration:{' '}
          {course.courseDuration
            ? `${course.courseDuration} days`
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
