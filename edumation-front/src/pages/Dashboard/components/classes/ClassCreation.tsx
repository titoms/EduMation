import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import ClassesService from '../../../../services/ClassesService';
// import { ClassContext } from '../../../../context/ClassContext';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../../components/ui/BackButton';

const ClassCreation = () => {
  // const { refetchGroups } = useContext(ClassContext);
  const navigate = useNavigate();
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
      navigate('new');
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <>
      <BackButton />
      <h2 className="text-lg font-semibold mt-4">Create new class</h2>
      <form onSubmit={handleCreateClass}>
        <TextField
          fullWidth
          margin="normal"
          label="Class Name"
          variant="outlined"
          name="name"
          value={groupData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Students"
          variant="outlined"
          name="name"
        />

        <div className="mt-4 flex gap-4">
          <Button type="submit" variant="contained">
            Create
          </Button>
          <BackButton title="Cancel" icon={false} />
        </div>
      </form>
    </>
  );
};

export default ClassCreation;
