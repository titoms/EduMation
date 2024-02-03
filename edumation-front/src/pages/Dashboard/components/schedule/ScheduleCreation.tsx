import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BackButton from '../../../../components/ui/BackButton';
import { useEffect, useState } from 'react';
import ClassesService from '../../../../services/ClassesService';
import axios from 'axios';
import { Group } from '../classes/ClassCreation';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const ScheduleCreation = () => {
  const [classes, setClasses] = useState<Group[]>([]);
  const [classSchedule, setClassSchedule] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await ClassesService.getAllGroups();
        setClasses(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data);
        } else {
          setError('An error occurred while fetching classes.');
        }
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setClassSchedule(event.target.value);
  };

  if (loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen">
      <div className="mb-4">
        <BackButton />
      </div>
      <h1 className="text-2xl font-semibold">Create new Schedule :</h1>{' '}
      <div className="flex justify-around flex-col md:flex-row gap-4 mt-4">
        <div className="bg-gray-200 shadow-md w-full rounded-lg p-4">
          {' '}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Import Calendars :</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Import the different calendars to create a schedule
            </p>
          </div>{' '}
          <FormControl sx={{ my: 2 }}>
            <Button
              startIcon={<ArrowUpwardIcon />}
              size="large"
              variant="outlined"
            >
              Import
            </Button>
          </FormControl>
        </div>
        <div className="bg-gray-200 shadow-md w-full rounded-lg p-4">
          {' '}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Schedule Settings :</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter the Schedule details
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <TextField
                fullWidth
                margin="normal"
                label="Enter event name"
                variant="outlined"
                name="name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="space-y-2">
                  <InputLabel>Start time :</InputLabel>
                  <DatePicker />
                </div>
                <div className="space-y-2">
                  <InputLabel>End time :</InputLabel>
                  <DatePicker />
                </div>
              </LocalizationProvider>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormControl sx={{ my: 2 }} fullWidth>
                  <InputLabel>Class name :</InputLabel>
                  <Select
                    labelId="class-selection-label"
                    id="class-selection"
                    value={classSchedule}
                    label="Class name :"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {classes.map((group) => (
                      <MenuItem key={group._id} value={group._id}>
                        {group.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Checkbox id="recurring" name="recurring" />
              <InputLabel>Recurring Event</InputLabel>
            </div>
          </form>
        </div>
        <div className="bg-gray-200 shadow-md w-full rounded-lg p-4">
          {' '}
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Event Settings :</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter the event details
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-end mt-8">
        <Button type="submit" variant="contained">
          Create
        </Button>
        <BackButton title="Cancel" icon={false} />
      </div>
    </div>
  );
};

export default ScheduleCreation;
