import { useState, useEffect, useContext } from 'react';
import { Group } from '../../../../services/Types';
import { ClassContext } from '../../../../context/ClassContext';
import ClassesService from '../../../../services/ClassesService';
import axios from 'axios';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import ClassCard from './ClassCard';
import ClassActions from './ClassActions';
import DeleteConfirmationModal from '../../../../components/DeleteConfirmationModal';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ClassesList = () => {
  const [classes, setClasses] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedClassName, setSelectedClassName] = useState<string>('');
  const { refetchGroups } = useContext(ClassContext);
  const [filter, setFilter] = useState('');

  const [selectedClasses, setSelectedClasses] = useState<Set<string>>(
    new Set()
  );

  const toggleClassSelection = (classId: string) => {
    setSelectedClasses((prevSelectedClasses) => {
      const newSelection = new Set(prevSelectedClasses);
      if (newSelection.has(classId)) {
        newSelection.delete(classId);
      } else {
        newSelection.add(classId);
      }
      return newSelection;
    });
  };

  const deleteSelectedClasses = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete the selected classes?'
    );
    if (!confirmDelete) return;

    const promises = Array.from(selectedClasses).map((classId) =>
      ClassesService.deleteGroup(classId)
    );

    try {
      await Promise.all(promises);
      toast.success('Selected classes deleted successfully');
      setClasses((classes) =>
        classes.filter((group) => !selectedClasses.has(group._id))
      );
      setSelectedClasses(new Set());
    } catch (error) {
      toast.error('Failed to delete selected classes');
      console.error(error);
    }
  };

  const handleOpenDelete = (groupId: string, groupName: string) => {
    setSelectedClassId(groupId);
    setSelectedClassName(groupName);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const handleDeleteClassSuccess = async (itemId) => {
    setClasses(classes.filter((group) => group._id !== selectedClassId));
    setSelectedClassId(null);
    setOpenDelete(false);
    await ClassesService.deleteGroup(itemId);
    toast.success('Class succesfully deleted !');
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
      <div className="flex justify-end mt-4 gap-2">
        <ClassActions setFilter={setFilter} />
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={deleteSelectedClasses}
          disabled={selectedClasses.size === 0}
        >
          {' '}
          <span className="hidden md:inline">Delete Bulk</span>
        </Button>
      </div>

      <h3 className="text-2xl">Available Classes :</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
        {filteredClasses.map((group) => (
          <ClassCard
            onDelete={handleOpenDelete}
            key={group._id}
            group={group}
            onToggleSelection={toggleClassSelection}
            isSelected={selectedClasses.has(group._id)}
          />
        ))}
      </div>
      {selectedClassId && (
        <DeleteConfirmationModal
          open={openDelete}
          onClose={handleCloseDelete}
          onDelete={handleDeleteClassSuccess}
          itemId={selectedClassId}
          confirmationMessage={`Are you sure you want to delete the class ${selectedClassName}?`}
        />
      )}
    </>
  );
};

export default ClassesList;
