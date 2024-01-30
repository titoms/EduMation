import { useState, useEffect, useContext } from 'react';
import { Grid, Button, Skeleton } from '@mui/material';
import { Group } from '../../../../services/Types';
import { Link } from 'react-router-dom';
import { ClassContext } from '../../../../context/ClassContext';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClassesService from '../../../../services/ClassesService';
import axios from 'axios';
import DeleteClassModal from './DeleteClassModal';
import UpdateClassModal from './UpdateClassModal';
import SearchBar from '../../../../components/ui/SearchBar';

const ClassesList = () => {
  const [classes, setClasses] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedClassName, setSelectedClassName] = useState<string>('');
  const { refetchGroups } = useContext(ClassContext);
  const [filter, setFilter] = useState('');
  const [filteredClasses, setFilteredClasses] = useState(classes);

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
        const result = classes.filter((classe) =>
          classe.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredClasses(result);
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
  }, [refetchGroups, filter, classes]);

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
      <div className="flex my-4 justify-end gap-2">
        {' '}
        <SearchBar onFilterChange={setFilter} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {filteredClasses.map((group) => (
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
                  <span className="hidden md:inline">Update</span>
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleOpenDelete(group._id, group.name)}
                >
                  <span className="hidden md:inline">Delete</span>
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
