import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Grid, Modal, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import ClassesService from '../../../../services/ClassesService';
import SchoolsService from '../../../../services/SchoolsService';
import { Group } from '../../../../services/Types';
import axios from 'axios';

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

const ClassesList = () => {
  const [classes, setClasses] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

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
    <>
      {classes.map((group) => (
        <div key={group._id} className="bg-white shadow rounded-lg p-6 mb-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">{group.name}</h2>
            <div className="flex justify-end gap-4">
              <Button
                size="small"
                variant="contained"
                startIcon={<Edit />}
                onClick={() => handleUpdateClass(group._id)}
              >
                Update
              </Button>

              <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleOpenDelete}
              >
                Delete
              </Button>
              <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h3 className="font-semibold">
                    Are you sure to delete class {group.name} ?{' '}
                  </h3>
                  <form
                    className="my-4"
                    onSubmit={() => handleDeleteClass(group._id)}
                  >
                    <div className="mt-4 flex gap-4">
                      <Button variant="outlined" color="error">
                        Delete
                      </Button>
                      <Button variant="contained" onClick={handleCloseDelete}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Box>
              </Modal>
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
    </>
  );
};

export default ClassesList;
