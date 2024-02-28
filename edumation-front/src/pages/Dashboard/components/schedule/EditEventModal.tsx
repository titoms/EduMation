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
  const [editedEvent, setEditedEvent] = useState<MyEvent>({
    start: event?.start ?? new Date(),
    end: event?.end ?? new Date(),
    title: event?.title ?? '',
    location: event?.location ?? '',
  });

  useEffect(() => {
    setEditedEvent({
      start: event?.start ?? new Date(),
      end: event?.end ?? new Date(),
      title: event?.title ?? '',
      location: event?.location ?? '',
    });
  }, [event]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(editedEvent);
    onClose();
  };

  return (
    <Dialog open={!!event} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
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
            value={editedEvent.title}
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
            value={editedEvent.location}
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
  );
};

export default EditEventModal;
