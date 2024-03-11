import React, { useEffect, useState } from 'react';
import { Course, User } from '../../../../services/Types';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import UsersService from '../../../../services/UsersService';

interface CourseCardProps {
  course: Course;
  onDelete: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onDelete }) => {
  const [teacher, setTeacher] = useState<User | null>(null);

  useEffect(() => {
    if (course.teacherId) {
      UsersService.getUserById(course.teacherId)
        .then((response) => {
          setTeacher(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch teacher details', error);
          toast.error('Failed to fetch teacher details');
        });
    }
  }, [course.teacherId]);

  const handleDelete = () => {
    if (course._id) {
      onDelete(course._id);
    } else {
      toast.error('Attempted to delete a course without an ID.');
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-8">
        <Link to={`${course._id}`}>
          <h3 className="text-xl text-center font-semibold">
            {course.title.toUpperCase()}
          </h3>
          <div className="my-2">
            {course.teacherId && (
              <>
                <div className="flex justify-around items-center">
                  <p className="font-semibold">Teacher:</p>
                  <div className="flex justify-evenly my-4 flex-col items-center text-center">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={
                        teacher?.profileImage ||
                        'https://via.placeholder.com/150'
                      }
                      alt="Teacher Pic"
                    />
                    <span className="my-2">{teacher?.name}</span>
                  </div>
                </div>
              </>
            )}

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
        </Link>

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
    </>
  );
};

export default CourseCard;
