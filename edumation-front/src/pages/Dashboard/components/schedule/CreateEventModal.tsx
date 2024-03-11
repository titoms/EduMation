import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Modal,
} from '@mui/material';
import { MyEvent } from '../../../../services/Types';

interface CreateEventModalProps {
  open: boolean;
  event: MyEvent | null;
  onClose: () => void;
  onSubmit: (createdEvent: MyEvent) => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  open,
  event,
  onClose,
  onSubmit,
}) => {
  const [createdEvent, setCreatedEvent] = useState<MyEvent>({
    id: event?.id ?? '',
    start: event?.start ?? new Date(),
    end: event?.end ?? new Date(),
    title: event?.title ?? '',
    location: event?.location ?? '',
  });

  useEffect(() => {
    if (event) {
      setCreatedEvent(event);
    }
  }, [event]);

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
      <Modal open={open} onClose={onClose}>
        <Dialog open={!!event} onClose={onClose}>
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
      </Modal>
    </>
  );
};

export default CreateEventModal;
