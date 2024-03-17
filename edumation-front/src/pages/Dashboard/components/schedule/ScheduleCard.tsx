// ScheduleCard.tsx
import React from 'react';
import { Schedule } from '../../../../services/Types';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

interface ScheduleCardProps {
  schedule: Schedule;
  onDelete: (scheduleId: string) => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-4">
      <div className="flex justify-between gap-4 items-center">
        {schedule._id ? (
          <Link to={schedule._id}>
            <span className="text-xl font-bold hover:text-blue-600 overflow-hidden">
              Schedule : {schedule._id}
            </span>
          </Link>
        ) : (
          <span className="text-xl font-bold overflow-hidden">
            Undefined ID
          </span>
        )}
      </div>
      <div className="mt-4 flex justify-end align-bottom">
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
        <Link to={schedule._id}>
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
          onClick={() => schedule._id && onDelete(schedule._id)}
        >
          <DeleteIcon sx={{ color: '#e63535' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ScheduleCard;
