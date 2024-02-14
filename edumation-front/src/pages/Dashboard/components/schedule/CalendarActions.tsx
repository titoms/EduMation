import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CalendarActions = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Edit Schedule
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
        <AccordionActions>
          <Button variant="contained">Update</Button>
          <Button>Cancel</Button>
        </AccordionActions>
      </Accordion>
    </>
  );
};

export default CalendarActions;
