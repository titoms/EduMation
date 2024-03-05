import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Edit from '@mui/icons-material/Edit';
import ScheduleList from './schedule/ScheduleList';

const Schedules = () => {
  return (
    <>
      <div className="my-4 flex justify-end">
        <Link to="new">
          <Button startIcon={<Edit />} variant="contained">
            Create new Schedule
          </Button>
        </Link>
      </div>
      <h2 className="text-xl my-2">My Schedules :</h2>
      <ScheduleList />
    </>
  );
};

export default Schedules;
