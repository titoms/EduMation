import { useState } from 'react';
import { School } from '../../../../services/Types';
import SchoolCard from './SchoolCard';
import DeleteConfirmationModal from '../../../../components/DeleteConfirmationModal';
import SchoolsService from '../../../../services/SchoolsService';
import { toast } from 'react-toastify';

interface SchoolsListProps {
  schools: School[];
}

const SchoolsList: React.FC<SchoolsListProps> = ({ schools }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const onShowDeleteModal = (school: School) => {
    setSelectedSchool(school);
    setDeleteModalOpen(true);
  };

  const handleDeleteSchool = async () => {
    if (selectedSchool && selectedSchool._id) {
      try {
        await SchoolsService.deleteSchools(selectedSchool._id);
        toast.success('School deleted successfully');
        setDeleteModalOpen(false);
      } catch (error) {
        console.error('Error deleting school:', error);
        toast.error('Failed to delete school');
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schools.map((school) => (
          <SchoolCard
            key={school._id}
            school={school}
            onShowDeleteModal={onShowDeleteModal}
          />
        ))}
      </div>
      {deleteModalOpen && selectedSchool && (
        <DeleteConfirmationModal
          itemId={selectedSchool._id} // selectedSchool is checked to be non-null here
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteSchool}
          confirmationMessage={`Are you sure you want to delete ${selectedSchool.name}?`}
        />
      )}
    </>
  );
};

export default SchoolsList;
