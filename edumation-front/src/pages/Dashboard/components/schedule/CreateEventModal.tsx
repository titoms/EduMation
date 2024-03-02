import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { MyEvent } from '../../../../services/Types';

interface CreateEventModalProps {
  event: MyEvent | null;
  onClose: () => void;
  onSubmit: (editedEvent: MyEvent) => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  event,
  onClose,
  onSubmit,
}) => {
  const [editedEvent, setEditedEvent] = useState<MyEvent>({
    id: event?.id ?? '',
    start: event?.start ?? new Date(),
    end: event?.end ?? new Date(),
    title: event?.title ?? '',
    location: event?.location ?? '',
  });

  useEffect(() => {
    if (event) {
      setEditedEvent(event);
    }
  }, [event]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(editedEvent);
    onClose();
  };

  return (
    <>
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
            <div className="mt-4">
              {' '}
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setShowDeleteConfirmation(true)}
              >
                Erase Event
              </Button>
            </div>
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
