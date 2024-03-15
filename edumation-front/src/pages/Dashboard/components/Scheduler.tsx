import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Edit from '@mui/icons-material/Edit';
import ScheduleList from './schedule/ScheduleList';
import DeleteIcon from '@mui/icons-material/Delete';

const Schedules = () => {
  return (
    <>
      <div className="my-4 flex justify-end gap-2">
        <Link to="new">
          <Button startIcon={<Edit />} variant="contained">
            Create new Schedule
          </Button>
        </Link>
        <Link to="">
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            <span className="hidden md:inline">Delete Bulk</span>
          </Button>
        </Link>
      </div>
      <h2 className="text-xl my-4">My Schedules :</h2>
      <ScheduleList />
    </>
  );
};

export default Schedules;
