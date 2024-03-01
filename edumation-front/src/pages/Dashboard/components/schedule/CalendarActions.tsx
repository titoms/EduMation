import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserTransfer from './UserTransfer';
import { useEffect, useState } from 'react';
import { Course } from '../../../../services/Types';
import axios from 'axios';
import CoursesService from '../../../../services/CoursesService';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';

const CalendarActions = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [groupsList, setGroupsList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
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
    fetchCourses();
  }, []);

  const handleFormData = () => {};

  const handleCoursesSelectChange = (
    event: SelectChangeEvent<typeof groupsList>
  ) => {
    const {
      target: { value },
    } = event;
    setGroupsList(typeof value === 'string' ? value.split(',') : value);
  };

  if (loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Accordion className="p-2">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Edit Schedule information
        </AccordionSummary>
        <AccordionDetails>
          {/* Add a form with possibility to import courses with the corresponding classTimes and add them to the calendar */}
          {/* Add a field to assign this schedule to users */}
          <div className="flex justify-around gap-4">
            <div className="">
              <h3 className="text-2xl">Add Courses to this schedule :</h3>
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
            </div>
            <div className="">
              <h3 className="text-2xl">Add Users to this schedule :</h3>
              <UserTransfer onNewClassUserChange={handleFormData} />
            </div>
          </div>
        </AccordionDetails>
        <AccordionActions>
          <Button variant="contained">Update</Button>
          <Button>Cancel</Button>
        </AccordionActions>
      </Accordion>
    </>
  );
};

export default CalendarActions;
