// ScheduleCard.tsx
import React from 'react';
import { Schedule } from '../../../../services/Types';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

interface ScheduleCardProps {
  schedule: Schedule & { courseName?: string };
  onDelete: (scheduleId: string) => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between gap-4 items-center">
        <Link to={schedule._id}>
          <span className="text-xl font-bold hover:text-blue-600 overflow-hidden">
            {schedule.courseName || 'Unknown Course'}
          </span>
        </Link>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(schedule._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ScheduleCard;
