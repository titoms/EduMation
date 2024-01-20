import { useState, useEffect } from 'react';
import axios from 'axios';
import { Group } from '../../../services/Types';
import ClassesService from '../../../services/ClassesService';
import { Box, Button, Grid, Modal, Skeleton } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolsService from '../../../services/SchoolsService';
// import DeleteClassesConfirmationModal from './classes/DeleteClassesConfirmationModal';

const Classes = () => {
  const [classes, setClasses] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [groupData, setGroupData] = useState({
    name: '',
    schoolId: '',
    studentIds: ['', ''],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

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

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await ClassesService.getAllGroups();
        const groupsWithSchoolNames = await Promise.all(
          response.data.map(async (group: Group) => {
            const school = await SchoolsService.getSchoolsById(group.schoolId);
            return { ...group, schoolName: school.data.name };
          })
        );
        setClasses(groupsWithSchoolNames);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data);
        } else {
          setError('An error occurred while fetching classes.');
        }
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

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

  const handleUpdateClass = async (groupId: string) => {
    // API call to update group
    // Example: await ClassesService.updateGroup(groupId, updateData);
    console.log('Update group with ID:', groupId);
  };

  const handleDeleteClass = async (groupId: string) => {
    try {
      await ClassesService.deleteGroup(groupId);
      setClasses(classes.filter((group) => group._id !== groupId));
      console.log('Group deleted with ID:', groupId);
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  if (loading) {
    return (
      <>
        <Skeleton variant="text" height={60} />
        <Grid container spacing={2} className="mb-4 w-full">
          <Grid item xs={12} md={6} xl={4}>
            <Skeleton variant="rounded" height={300} />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Skeleton variant="rounded" height={300} />
          </Grid>
        </Grid>
      </>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-2">
      <h1 className="text-2xl font-semibold">Classes</h1>
      <div className="my-4">
        <Button variant="contained" onClick={handleOpen} startIcon={<Edit />}>
          Create new class
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
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
                <Button variant="contained" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>

      {classes.map((group) => (
        <div key={group._id} className="bg-white shadow rounded-lg p-6 mb-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">{group.name}</h2>
            <div className="flex justify-end gap-4">
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => handleUpdateClick(group._id)}
              >
                Update
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteClick(group._id)}
              >
                Delete
              </Button>
            </div>
          </div>

          <div className="mb-4 font-semibold">
            School ID: {group.schoolName}
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Students:</h3>
            {group.studentsIds.map((student) => (
              <div key={student._id} className="mb-2 border-b pb-2">
                <img
                  className="w-12 h-12 rounded-full mr-2 inline"
                  src={student.profileImage}
                  alt={student.name}
                />
                <div className="inline-block">
                  <div>
                    <strong>Name:</strong> {student.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {student.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Classes;
