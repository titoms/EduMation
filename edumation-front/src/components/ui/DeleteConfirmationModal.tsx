import React from 'react';
import { Modal, Box } from '@mui/material';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: (itemId: string) => Promise<void>;
  itemId: string;
  confirmationMessage: string;
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

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onDelete,
  itemId,
  confirmationMessage,
}) => {
  const handleDelete = async () => {
    try {
      await onDelete(itemId);
    } catch (error) {
      console.error('Error during deletion:', error);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <h3 className="text-center">{confirmationMessage}</h3>
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

export default DeleteConfirmationModal;
