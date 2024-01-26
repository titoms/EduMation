import React from 'react';
import { Modal, Box, TextField } from '@mui/material';
import ClassesService from '../../../../services/ClassesService';

interface UpdateClassModalProps {
  open: boolean;
  onClose: () => void;
  groupId: string;
  className: string;
  onClassUpdated: () => void;
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

const UpdateClassModal: React.FC<UpdateClassModalProps> = ({
  open,
  onClose,
  groupId,
  className,
  onClassUpdated,
}) => {
  const [newClassName, setNewClassName] = React.useState(className);

  const handleUpdate = async () => {
    try {
      // Update logic here. Replace with your actual update logic.
      // Example: await ClassesService.updateGroup(groupId, { name: newClassName });
      console.log('Class updated with ID:', groupId);
      onClassUpdated();
    } catch (error) {
      console.error('Error updating class:', error);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: 500 }}>
        <h3 className="text-center">
          Update Class <span className="font-bold">{className}</span> ?
        </h3>
        <TextField
          label="Class Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
        />
        <div className=" flex gap-4">
          <button
            type="submit"
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-4 ml-2"
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default UpdateClassModal;
