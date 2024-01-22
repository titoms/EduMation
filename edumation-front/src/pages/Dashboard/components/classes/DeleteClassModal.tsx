import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import ClassesService from '../../../../services/ClassesService';

interface DeleteClassModalProps {
  open: boolean;
  onClose: () => void;
  groupId: string;
  className: string;
  onClassDeleted: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DeleteClassModal: React.FC<DeleteClassModalProps> = ({
  open,
  onClose,
  groupId,
  className,
  onClassDeleted,
}) => {
  const handleDelete = async () => {
    try {
      await ClassesService.deleteGroup(groupId);
      onClassDeleted();
      console.log('Group deleted with ID:', groupId);
    } catch (error) {
      console.error('Error deleting group:', error);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <h3>Are you sure to delete class {className}?</h3>
        <div className="mt-4 flex gap-4">
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteClassModal;
