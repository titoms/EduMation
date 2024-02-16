import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserTransfer from './UserTransfer';

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
          Edit Schedule information
        </AccordionSummary>
        <AccordionDetails>
          {/* Add a form with possibility to import courses with the corresponding classTimes and add them to the calendar */}
          {/* Add a field to assign this schedule to users */}
          <h3>Add schedule to Users</h3>
          <UserTransfer onNewClassUserChange={handleFormData} />
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
