import { useState, useEffect, useContext } from 'react';
import { Button, Checkbox } from '@mui/material';
import { Group } from '../../../../services/Types';
import { Link } from 'react-router-dom';
import { ClassContext } from '../../../../context/ClassContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ClassesService from '../../../../services/ClassesService';
import axios from 'axios';
import DeleteClassModal from './DeleteClassModal';
import SearchBar from '../../../../components/ui/SearchBar';
import Edit from '@mui/icons-material/Edit';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';

const ClassesList = () => {
  const [classes, setClasses] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedClassName, setSelectedClassName] = useState<string>('');
  const { refetchGroups } = useContext(ClassContext);
  const [filter, setFilter] = useState('');

  const handleOpenDelete = (groupId: string, groupName: string) => {
    setSelectedClassId(groupId);
    setSelectedClassName(groupName);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const handleDeleteClassSuccess = () => {
    setClasses(classes.filter((group) => group._id !== selectedClassId));
    setSelectedClassId(null);
    setOpenDelete(false);
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
  }, [refetchGroups]);

  const filteredClasses = classes.filter((classe) =>
    classe.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex my-4 justify-end gap-2">
        {' '}
        <SearchBar onFilterChange={setFilter} />
        <Link to="new">
          <Button startIcon={<Edit />} variant="contained">
            Create new class
          </Button>
        </Link>
        <Link to="import">
          <Button startIcon={<ArrowUpwardIcon />} variant="outlined">
            Import
          </Button>
        </Link>
        <Link to="">
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            <span className="hidden md:inline">Delete Bulk</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {filteredClasses.map((group) => (
          <div key={group._id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between gap-4 flex-row flex-wrap md:flex-nowrap">
              <Checkbox />
              <Link to={group._id} className="pt-2">
                <span className="text-xl font-bold hover:text-blue-600 overflow-hidden">
                  {group.name}
                </span>
              </Link>

              <div className="flex justify-start gap-2 md:mt-0">
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
    </>
  );
};

export default ClassesList;
