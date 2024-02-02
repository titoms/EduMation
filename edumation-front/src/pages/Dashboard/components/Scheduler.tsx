import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Edit from '@mui/icons-material/Edit';
import ScheduleList from './schedule/ScheduleList';

const Schedules = () => {
  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-semibold">Schedules</h1>
      <div className="mt-4 flex justify-end">
        <Link to="new">
          <Button startIcon={<Edit />} variant="contained">
            Create new Schedule
          </Button>
        </Link>
      </div>
      <ScheduleList />
    </div>
  );
};

export default Schedules;
