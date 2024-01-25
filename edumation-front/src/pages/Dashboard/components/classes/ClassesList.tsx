import { useState, useEffect } from 'react';
import { Grid, Button, Skeleton } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClassesService from '../../../../services/ClassesService';
import { Group } from '../../../../services/Types';
import axios from 'axios';
import DeleteClassModal from './DeleteClassModal';
import UpdateClassModal from './UpdateClassModal';
import { Link } from 'react-router-dom';
import ClassCreation from './ClassCreation';

const ClassesList = () => {
  const [classes, setClasses] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedClassName, setSelectedClassName] = useState<string>('');

  const handleOpenDelete = (groupId: string, groupName: string) => {
    setSelectedClassId(groupId);
    setSelectedClassName(groupName);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const handleOpenUpdate = (groupId: string, groupName: string) => {
    setSelectedClassId(groupId);
    setSelectedClassName(groupName);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleDeleteClassSuccess = () => {
    setClasses(classes.filter((group) => group._id !== selectedClassId));
    setSelectedClassId(null);
    setOpenDelete(false);
  };

  const handleUpdateClassSuccess = () => {
    // Refresh the list or handle the updated class info
    setOpenUpdate(false);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await ClassesService.getAllGroups();
        setClasses(response.data);
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
      <ClassCreation />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {classes.map((group) => (
          <div key={group._id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between gap-4 flex-row md:flex-col flex-wrap md:flex-nowrap">
              <Link to={group._id}>
                <h2 className="text-xl font-bold hover:text-blue-600 overflow-hidden">
                  {group.name}
                </h2>
              </Link>

              <div className="flex justify-start gap-2 md:mt-0">
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => handleOpenUpdate(group._id, group.name)}
                >
                  Update
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleOpenDelete(group._id, group.name)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedClassId && (
        <DeleteClassModal
          open={openDelete}
          onClose={handleCloseDelete}
          groupId={selectedClassId}
          className={selectedClassName}
          onClassDeleted={handleDeleteClassSuccess}
        />
      )}
      {selectedClassId && (
        <UpdateClassModal
          open={openUpdate}
          onClose={handleCloseUpdate}
          groupId={selectedClassId}
          className={selectedClassName}
          onClassUpdated={handleUpdateClassSuccess}
        />
      )}
    </>
  );
};

export default ClassesList;
