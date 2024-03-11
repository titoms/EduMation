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

interface CreateEventModalProps {
  onClose: () => void;
  onSubmit: (createdEvent: MyEvent) => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [createdEvent, setCreatedEvent] = useState<MyEvent>({
    start: new Date(),
    end: new Date(),
    title: '',
    location: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreatedEvent({ ...createdEvent, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(createdEvent);
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
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="location"
              name="location"
              label="Location"
              type="text"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
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
