import React, { useEffect, useState } from 'react';
import { Course, User } from '../../../../services/Types';
import { Button, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import UsersService from '../../../../services/UsersService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

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
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-4">
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
            <p className="text-center">
              Duration:{' '}
              {course.courseDuration
                ? `${course.courseDuration} days`
                : 'Not specified'}
            </p>
          </div>
          <hr />
          <p className="mt-4 text-center">{course.description}</p>
        </Link>

        <div className="mt-4 flex justify-end gap-4 items-end">
          <IconButton
            className="text-black dark:text-gray-200"
            aria-label="add to favorites"
          >
            <FavoriteIcon sx={{ color: '#3c70c9' }} />
          </IconButton>
          <IconButton
            className="text-black dark:text-gray-200"
            aria-label="share"
          >
            <ShareIcon sx={{ color: '#3c96c9' }} />
          </IconButton>
          <Link to={course._id}>
            <IconButton
              className="text-black dark:text-gray-200"
              aria-label="share"
            >
              <EditIcon sx={{ color: '#3dc8eb' }} />
            </IconButton>
          </Link>
          <IconButton
            className="text-black dark:text-gray-200"
            aria-label="share"
            onClick={handleDelete}
          >
            <DeleteIcon sx={{ color: '#e63535' }} />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
