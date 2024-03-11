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
      <h3 className="text-lg">Add Users to this schedule :</h3>
      <UserTransfer onNewClassUserChange={handleNewClassUsersChange} />
      <div className="my-4">
        <Button type="submit" onClick={updateSchedule} variant="outlined">
          Import
        </Button>
      </div>
    </>
  );
};

export default CalendarActions;
