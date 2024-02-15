import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TeacherSelect from '../courses/TeacherSelect';
import StudentTransfer from '../classes/StudentTransfer';

const CalendarActions = () => {
  const handleFormData = () => {};
  return (
    <>
      <Accordion className="p-2">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Edit Schedule
        </AccordionSummary>
        <AccordionDetails>
          {/* Add a form with possibility to import courses with the corresponding classTimes and add them to the calendar */}
          {/* Add a field to assign this schedule to users */}
          <TeacherSelect name="teacher" value={''} onChange={handleFormData} />
          {/* Instead of selecting user, maybe affect this schedule to a class */}
          <StudentTransfer onNewClassStudentsChange={handleFormData} />
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
