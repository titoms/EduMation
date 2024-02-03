import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import BackButton from '../../../../components/ui/BackButton';
import { useEffect, useState } from 'react';
import ClassesService from '../../../../services/ClassesService';
import axios from 'axios';
import { Group } from '../classes/ClassCreation';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FileDragAndDrop from '../../../../components/FileDragAndDrop';

const ScheduleCreation = () => {
  const [classes, setClasses] = useState<Group[]>([]);
  const [classSchedule, setClassSchedule] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [importCalendarCsv, setImportCalendarCsv] = useState<File | null>(null);
  const [calendarUploadLoading, setCalendarUploadLoading] = useState(false);

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

  const handleFileDrop = (file: File) => {
    setImportCalendarCsv(file);
    setCalendarUploadLoading(true);
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
        {/* FIRST COLUMN */}
        <div className="bg-gray-200 shadow-md w-full rounded-lg p-4">
          <div className="max-w-md w-full space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Import Schedule :</h1>
              <p className="text-gray-500">
                Please follow the instructions below to import your schedule.
              </p>
            </div>
            <div className="rounded-md bg-blue-300 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleOutlineIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-600">
                    Instructions
                  </h3>
                  <div className="mt-2 text-sm text-blue-600">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Download the template file and fill in your schedule
                        data.
                      </li>
                      <li>Save your file as a CSV.</li>
                      <li>Upload the CSV file using the form below.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <InputLabel>Upload CSV</InputLabel>
                  <FileDragAndDrop onFileDrop={handleFileDrop} />
                </div>
              </div>
              <div>
                <Button variant="outlined" fullWidth>
                  Import
                </Button>
              </div>
            </form>
            {calendarUploadLoading && (
              <div className="rounded-md bg-green-50 p-4 dark:bg-green-900 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircleOutlineIcon className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                      Import Status
                    </h3>
                    <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                      <p>Your file is being processed. Please wait...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* SECOND COLUMN  */}
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
            <div className="grid gap-4">
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
            <div className="flex flex-row items-center gap-2">
              <Checkbox id="recurring" name="recurring" />
              <InputLabel>Recurring Event</InputLabel>
            </div>
          </form>
        </div>
        {/* THIRD COLUMN  */}
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
