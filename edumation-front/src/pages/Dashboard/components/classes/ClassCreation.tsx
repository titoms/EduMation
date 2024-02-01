import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import ClassesService from '../../../../services/ClassesService';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../../components/ui/BackButton';
import StudentTransfer from '../../../../components/ui/draganddrop/StudentTransfer';
import { User } from '../../../../services/Types';

export interface Group {
  name: string;
  studentsIds: string[];
  schoolId?: string;
}

const ClassCreation = () => {
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState({
    name: '',
    studentsIds: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleCreateClass = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await ClassesService.createGroup(groupData);
      console.log('GroupData after change:', groupData);
      console.log('Class created successfully:', response.data);
      navigate('/dashboard/classes');
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  const handleNewClassStudentsChange = (students: User[]) => {
    const studentIds = students.map((student) => student._id); // Extracting IDs
    setGroupData({ ...groupData, studentsIds: studentIds });
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
        <h3 className="font-semibold my-4">Select Students : </h3>
        <StudentTransfer
          onNewClassStudentsChange={handleNewClassStudentsChange}
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
