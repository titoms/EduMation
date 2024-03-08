import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import CalendarImport from './CalendarImport';
import UserTransfer from './UserTransfer';

const ScheduleCreation = () => {
  const [classes, setClasses] = useState<Group[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesList, setCoursesList] = useState<string[]>([]);
  const [classesList, setClassesList] = useState<string[]>([]);
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

  const handleCoursesSelectChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setCoursesList(typeof value === 'string' ? value.split(',') : value);
  };

  const handleClassesSelectChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setClassesList(typeof value === 'string' ? value.split(',') : value);
  };

  const handleScheduleCreation = async () => {
    try {
      const scheduleData = {
        events,
        courses: coursesList,
        classes: classesList,
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

  const onScheduleUsersListChange = () => {};

  if (loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="mb-4">
        <BackButton />
      </div>
      <h1 className="text-2xl font-semibold">Create new Schedule :</h1>
      <div className="flex justify-around flex-col lg:flex-row gap-4 mt-4">
        <CalendarImport onEventsImported={handleEventsImported} />
        <div className="bg-gray-200 dark:bg-slate-800 shadow-md w-full flex justify-center rounded-lg p-8">
          <div className="max-w-md w-full space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Schedule Settings :</h2>
              <p className="text-gray-500">Enter the Schedule details</p>
            </div>
            <InputLabel>Add courses to this schedule :</InputLabel>
            <FormControl fullWidth>
              <Select
                labelId="course-selection-label"
                id="course-selection"
                multiple
                value={coursesList}
                label="Courses :"
                input={<OutlinedInput label="Tag" />}
                onChange={handleCoursesSelectChange}
              >
                {courses.map((course) => (
                  <MenuItem key={course._id} value={course._id}>
                    <Checkbox checked={coursesList.indexOf(course._id) > -1} />
                    <ListItemText primary={course.title} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <InputLabel>Add classes to this schedule :</InputLabel>
            <FormControl fullWidth>
              <Select
                labelId="classes-selection-label"
                id="classes-selection"
                multiple
                value={classesList}
                label="Classes :"
                input={<OutlinedInput label="Tag" />}
                onChange={handleClassesSelectChange}
              >
                {classes.map((group) => (
                  <MenuItem key={group._id} value={group._id}>
                    <Checkbox checked={classesList.indexOf(group._id) > -1} />
                    <ListItemText primary={group.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <InputLabel>Start date :</InputLabel>
                  <FormControl fullWidth>
                    <DatePicker />
                  </FormControl>
                </div>
                <div className="flex flex-col gap-4">
                  <InputLabel>End date :</InputLabel>
                  <FormControl fullWidth>
                    <DatePicker />
                  </FormControl>
                </div>
              </div>
            </LocalizationProvider>
            <div className="flex flex-row items-center gap-2">
              <Checkbox id="recurring" name="recurring" />
              <InputLabel htmlFor="recurring">Recurring Event</InputLabel>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 dark:bg-slate-800 shadow-md w-full flex justify-center rounded-lg p-8">
          <div className="max-w-md w-full space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Users Settings :</h2>
              <p className="text-gray-500">Link Schedule to Users</p>
            </div>
            <UserTransfer onNewClassUserChange={onScheduleUsersListChange} />
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
