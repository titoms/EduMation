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
      console.log(newSelection);
      if (newSelection.has(classId)) {
        newSelection.delete(classId);
      } else {
        newSelection.add(classId);
      }
      return newSelection;
    });
  };

  const deleteSelectedClasses = async () => {
    // Loop over selectedClasses and call API to delete
    // Reset selectedClasses state after deletion
    setSelectedClasses(new Set());
    // Refetch class list or remove deleted classes from state
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
      <ClassActions setFilter={setFilter} />
      <h2 className="text-xl my-2">Available Classes :</h2>
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
