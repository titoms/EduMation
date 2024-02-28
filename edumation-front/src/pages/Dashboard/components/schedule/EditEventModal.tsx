import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { MyEvent } from '../../../../services/Types';

interface EditEventModalProps {
  event: MyEvent | null;
  onClose: () => void;
  onSubmit: (editedEvent: MyEvent) => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({
  event,
  onClose,
  onSubmit,
}) => {
  const [editedEvent, setEditedEvent] = useState<MyEvent>(
    event || { start: new Date(), end: new Date(), title: '', location: '' }
  );

  useEffect(() => {
    if (event) setEditedEvent(event);
  }, [event]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (event) {
      onSubmit({
        ...event,
        title: editedEvent.title,
        location: editedEvent.location,
      });
    }
    onClose();
  };

  if (!event) return null;

  return (
    <Dialog open={Boolean(event)} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Event Title"
            type="text"
            fullWidth
            variant="outlined"
            value={editedEvent.title}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            variant="outlined"
            value={editedEvent.location}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} type="submit" variant="contained">
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditEventModal;
