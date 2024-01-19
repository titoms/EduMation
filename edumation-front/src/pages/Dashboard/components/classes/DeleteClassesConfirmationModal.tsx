// DeleteClassesConfirmationModal.tsx
import React from 'react';
import { Group } from '../../../../services/Types';
import ClassesService from '../../../../services/ClassesService';
import { toast } from 'react-toastify';

interface DeleteClassesConfirmationModalProps {
  group: Group;
  onClose: () => void;
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}

const DeleteClassesConfirmationModal: React.FC<
  DeleteClassesConfirmationModalProps
> = ({ group, onClose, setGroups }) => {
  const handleDeleteGroup = async () => {
    try {
      await ClassesService.deleteGroup(group._id);
      setGroups((prevUsers) => prevUsers.filter((u) => u._id !== group._id));
      toast.success('Group deleted successfully');
      onClose();
    } catch (error) {
      console.log(error);
      toast.error('Deletion failed. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      <div
        className="relative top-20 text-center mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-4 text-lg font-semibold">
          Are you sure you want to delete this group?
        </h3>
        <button
          onClick={handleDeleteGroup}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
        >
          Yes, Delete
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteClassesConfirmationModal;
