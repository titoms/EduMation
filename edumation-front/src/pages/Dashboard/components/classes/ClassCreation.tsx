import Edit from '@mui/icons-material/Edit';
import { Box, Button, Modal } from '@mui/material';
import React, { useState } from 'react';
import ClassesService from '../../../../services/ClassesService';

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

const ClassCreation = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [groupData, setGroupData] = useState({
    _id: '',
    name: '',
    schoolId: '',
    studentsIds: ['', ''],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleCreateClass = async () => {
    try {
      const response = await ClassesService.createGroup(groupData);
      console.log('Class created successfully:', response.data);
      // Optionally update state or UI based on successful creation
    } catch (error) {
      console.error('Error creating class:', error);
      // Optionally handle error in UI
    }
  };

  return (
    <>
      <div className="my-4">
        <Button
          variant="contained"
          onClick={handleOpenCreate}
          startIcon={<Edit />}
        >
          Create new class
        </Button>
        <Modal
          open={openCreate}
          onClose={handleCloseCreate}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3 className="font-semibold">Create new class</h3>
            <form className="my-4" onSubmit={() => handleCreateClass()}>
              <input
                className="w-full p-2 border border-gray-300 rounded mt-2"
                type="text"
                value={groupData.name}
                onChange={handleChange}
                placeholder="Class name"
                name="groupName"
                id="groupName"
              />
              <div className="mt-4 flex gap-4">
                <Button variant="outlined">Create</Button>
                <Button variant="contained" onClick={handleCloseCreate}>
                  Cancel
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ClassCreation;
