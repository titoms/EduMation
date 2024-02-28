import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
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
import DragAndDrop from '../../../../components/ui/draganddrop/DragAndDrop';
import CoursesService from '../../../../services/CoursesService';
import { Course } from '../../../../services/Types';
import SchedulesService from '../../../../services/SchedulesService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ScheduleCreation = () => {
  const [classes, setClasses] = useState<Group[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [groupsList, setGroupsList] = useState<string[]>([]);
  const [classSchedule, setClassSchedule] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [importCalendarCsv, setImportCalendarCsv] = useState<File | null>(null);
  const [calendarUploadLoading, setCalendarUploadLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassesAndCourses = async () => {
      try {
        const responseClasses = await ClassesService.getAllGroups();
        setClasses(responseClasses.data);
        const responseCourses = await CoursesService.getAllCourses();
        setCourses(responseCourses.data);
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
    fetchClassesAndCourses();
  }, []);

  const handleClassSelectionChange = (event: SelectChangeEvent) => {
    setClassSchedule(event.target.value);
  };

  const handleCoursesSelectChange = (
    event: SelectChangeEvent<typeof groupsList>
  ) => {
    const {
      target: { value },
    } = event;
    setGroupsList(typeof value === 'string' ? value.split(',') : value);
  };

  const handleFileDrop = (file: File) => {
    setImportCalendarCsv(file);
    setCalendarUploadLoading(true);
  };

  const handleScheduleCreation = async () => {
    try {
      const response = await SchedulesService.createSchedule({});
      toast.success('Schedule created successfully');
      console.log(response.data);
      navigate('/dashboard/schedules');
    } catch (error) {
      console.error('Failed to create schedule:', error);
      toast.error('Failed to create schedule');
    }
  };

  if (loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="mb-4">
        <BackButton />
      </div>
      <h1 className="text-2xl font-semibold">Create new Schedule :</h1>{' '}
      <div className="flex justify-around flex-col lg:flex-row gap-4 mt-4">
        {/* FIRST COLUMN */}
        <div className="bg-gray-200 dark:bg-slate-800 shadow-md w-full flex justify-center rounded-lg p-8">
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
            <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <InputLabel>Upload CSV</InputLabel>
                  <DragAndDrop fileType="csv" onFileDrop={handleFileDrop} />
                </div>
              </div>
              <div>
                <Button variant="outlined" fullWidth>
                  Import
                </Button>
              </div>
            </div>
            {calendarUploadLoading && (
              <div className="rounded-md bg-green-50 p-4  mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircleOutlineIcon className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800 ">
                      Import Status
                    </h3>
                    <div className="mt-2 text-sm text-green-700 ">
                      <p>Your file is being processed. Please wait...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* SECOND COLUMN  */}
        <div className="bg-gray-200 dark:bg-slate-800 shadow-md w-full flex justify-center  rounded-lg p-8">
          <div className="max-w-md w-full space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Schedule Settings :</h2>
              <p className="text-gray-500">Enter the Schedule details</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="space-y-2">
                    <InputLabel>Start date :</InputLabel>
                    <DatePicker />
                  </div>
                  <div className="space-y-2">
                    <InputLabel>End date :</InputLabel>
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
                    onChange={handleClassSelectionChange}
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
            </div>
          </div>
        </div>
        {/* THIRD COLUMN  */}
        <div className="bg-gray-200 dark:bg-slate-800 shadow-md w-full flex justify-center  rounded-lg p-8">
          <div className="max-w-md w-full space-y-6">
            <div className="mx-auto max-w-md space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold">Schedule Settings :</h2>
                <p className="text-gray-500">Enter the Schedule details</p>
              </div>
              <FormControl sx={{ my: 2 }} fullWidth>
                <InputLabel>Courses :</InputLabel>
                <Select
                  labelId="course-selection-label"
                  id="course-selection"
                  multiple
                  value={[]}
                  label="Courses :"
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  onChange={handleCoursesSelectChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {courses.map((group) => (
                    <MenuItem key={group._id} value={group._id}>
                      <Checkbox />
                      <ListItemText primary={group.title} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ my: 2 }} fullWidth>
                <InputLabel>Classes :</InputLabel>
                <Select
                  labelId="classes-selection-label"
                  id="classes-selection"
                  multiple
                  value={[]}
                  label="Classes :"
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  onChange={handleCoursesSelectChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {classes.map((group) => (
                    <MenuItem key={group._id} value={group._id}>
                      <Checkbox />
                      <ListItemText primary={group.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-end mt-8">
        <Button
          type="submit"
          variant="contained"
          onClick={handleScheduleCreation}
        >
          Create
        </Button>
        <BackButton title="Cancel" icon={false} />
      </div>
    </>
  );
};

export default ScheduleCreation;
