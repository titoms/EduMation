import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import UserTransfer from './UserTransfer';
import { useEffect, useState } from 'react';
import { Course, MyEvent } from '../../../../services/Types';
import CoursesService from '../../../../services/CoursesService';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';

const CalendarActions = ({ onCalendarActionsUpdate }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [linkedUsers, setLinkedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await CoursesService.getAllCourses();
        setCourses(response.data);
      } catch (error) {
        setError('An error occurred while fetching courses.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleCoursesSelectChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedCourses(typeof value === 'string' ? value.split(',') : value);
  };

  const handleNewClassUsersChange = (newLinkedUsers: string[]) => {
    setLinkedUsers(newLinkedUsers);
  };

  const updateSchedule = async () => {
    console.log('Updating schedule with:', selectedCourses, linkedUsers);
    onCalendarActionsUpdate(selectedCourses, linkedUsers);
    // Example: await updateScheduleOnBackend({ linkedUsers, selectedCourses });
  };

  if (loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="bg-gray-200 dark:bg-slate-800 shadow-md w-full rounded-lg p-8">
        <div className="p-2">
          <h3 className="text-lg">Add Courses to this schedule :</h3>
          <FormControl sx={{ my: 2 }} fullWidth>
            {/* <div className="flex justify-around gap-4">
          {courses.map((group) => (
            <MenuItem key={group._id} value={group._id}>
              <Checkbox />
              <ListItemText primary={group.title} />
            </MenuItem>
          ))}
        </div> */}

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
          {/* <h3 className="text-lg">Current Users on this schedule :</h3>
        {linkedUsers.length > 0 ? (
          linkedUsers.map((user) => (
            <div
              key={user._id}
              className="my-8 border-b border-b-gray-400 pb-2"
            >
              <img
                className="w-12 h-12 rounded-full mr-2 inline"
                src={
                  user.profileImage
                    ? user.profileImage
                    : 'https://via.placeholder.com/150'
                }
                alt={user.name}
              />
              <div className="inline-block">
                <div className="ml-4 flex justify-around gap-8">
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center text-2xl text-slate-600 bg-gray-300 dark:text-slate-200 dark:bg-slate-600 my-4 rounded-lg p-4">
            No students in this class...
          </h3>
        )} */}
          <h3 className="text-lg">Add Users to this schedule :</h3>
          <UserTransfer
            // initialUser={linkedUsers}
            onNewClassUserChange={handleNewClassUsersChange}
          />
          <div className="my-4">
            <Button type="submit" onClick={updateSchedule} variant="outlined">
              Import Users to this schedule
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarActions;
