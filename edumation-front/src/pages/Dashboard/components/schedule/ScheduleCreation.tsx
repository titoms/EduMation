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
import CoursesService from '../../../../services/CoursesService';
import { Course, MyEvent } from '../../../../services/Types';
import SchedulesService from '../../../../services/SchedulesService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CalendarImport from './CalendarImport';

const ScheduleCreation = () => {
  const [classes, setClasses] = useState<Group[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [groupsList, setGroupsList] = useState<string[]>([]);
  const [classSchedule, setClassSchedule] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [events, setEvents] = useState<MyEvent[]>([]);
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

  const handleScheduleCreation = async () => {
    try {
      const scheduleData = {
        classSchedule,
        events,
      };
      const response = await SchedulesService.createSchedule(scheduleData);
      toast.success('Schedule created successfully');
      console.log(response.data);
      navigate('/dashboard/schedules');
    } catch (error) {
      console.error('Failed to create schedule:', error);
      toast.error('Failed to create schedule');
    }
  };

  const handleEventsImported = (importedEvents: MyEvent[]) => {
    setEvents((events) => [...events, ...importedEvents]);
    console.log(events);
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
        <CalendarImport onEventsImported={handleEventsImported} />
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
      </div>
      <div className="flex gap-4 justify-end mt-8">
        <BackButton title="Cancel" icon={false} />
        <Button
          type="submit"
          variant="contained"
          onClick={handleScheduleCreation}
        >
          Create
        </Button>
      </div>
    </>
  );
};

export default ScheduleCreation;
