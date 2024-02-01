import React from 'react';
import { Modal, Box } from '@mui/material';
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
        <h3 className="text-center">
          Are you sure to delete class{' '}
          <span className="font-bold">{className}</span> ?
        </h3>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteClassModal;
