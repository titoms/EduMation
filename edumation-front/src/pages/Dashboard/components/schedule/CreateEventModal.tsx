import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { MyEvent } from '../../../../services/Types';
import { SlotInfo } from 'react-big-calendar';

interface CreateEventModalProps {
  onClose: () => void;
  onSubmit: (createdEvent: MyEvent) => void;
  slotInfo: SlotInfo;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  onClose,
  onSubmit,
  slotInfo,
}) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    const newEvent: MyEvent = {
      start: slotInfo.start,
      end: slotInfo.end,
      title,
      location,
    };
    onSubmit(newEvent);
    onClose();
  };

  return (
    <>
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>Create Event</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              name="title"
              label="Event Title"
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              id="location"
              name="location"
              label="Location"
              type="text"
              fullWidth
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateEventModal;
