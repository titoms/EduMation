import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

interface MyEvent {
  start: Date;
  end: Date;
  title: string;
}

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
  const [title, setTitle] = useState(event?.title || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (event) {
      onSubmit({
        ...event,
        title: title,
      });
    }
    onClose();
  };

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditEventModal;
