import React, { useContext, useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import ClassesService from '../../../../services/ClassesService';
import Edit from '@mui/icons-material/Edit';
import { ClassContext } from '../../../../context/ClassContext';

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
  const { refetchGroups } = useContext(ClassContext);

  const [groupData, setGroupData] = useState({
    name: '',
    studentsIds: [] as string[], // Update according to your data model
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleCreateClass = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await ClassesService.createGroup(groupData);
      console.log('Class created successfully:', response.data);
      handleCloseCreate();
      refetchGroups();
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <>
      <div className="flex my-4 justify-end">
        <Button
          startIcon={<Edit />}
          variant="contained"
          onClick={handleOpenCreate}
        >
          Create new class
        </Button>
        <Modal open={openCreate} onClose={handleCloseCreate}>
          <Box sx={style}>
            <h3 className="font-semibold">Create new class</h3>
            <form className="my-4" onSubmit={handleCreateClass}>
              <TextField
                fullWidth
                margin="normal"
                label="Class Name"
                variant="outlined"
                name="name"
                value={groupData.name}
                onChange={handleChange}
              />
              <div className="mt-4 flex gap-4">
                <Button type="submit" variant="outlined">
                  Create
                </Button>
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
