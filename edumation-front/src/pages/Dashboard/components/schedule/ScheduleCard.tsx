// ScheduleCard.tsx
import React from 'react';
import { Schedule } from '../../../../services/Types';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

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
              {schedule._id}
            </span>
          </Link>
        ) : (
          <span className="text-xl font-bold overflow-hidden">
            Undefined ID
          </span>
        )}
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => schedule._id && onDelete(schedule._id)} // Ensure schedule._id is defined before invoking onDelete
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ScheduleCard;
