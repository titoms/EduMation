import { Button, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Schedule } from '../../../../services/Types';

interface ScheduleCardProps {
  schedule: Schedule;
  onDelete: (scheduleId: string) => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between gap-4 flex-row flex-wrap md:flex-nowrap">
        <Checkbox />
        <Link to={schedule._id} className="pt-2">
          <span className="text-xl font-bold hover:text-blue-600 overflow-hidden">
            {schedule.courseId}
          </span>
        </Link>
        <div className="flex justify-start gap-2 md:mt-0">
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(schedule._id)}
          >
            <span className="hidden md:inline">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
