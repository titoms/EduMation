import React from 'react';
import UsersService from '../../../../services/UsersService';
import { toast } from 'react-toastify';

interface DeleteConfirmationModalProps {
  userId: string;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  userId,
  onClose,
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      const response = await UsersService.deleteUser(userId);

      if (response.status === 200) {
        toast.success('Profile deleted successfully');
        onDelete();
      }
    } catch (error) {
      toast.error('Failed to delete profile');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg bg-white">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Confirm Deletion
        </h3>
        <p className="mt-2">
          Are you sure you want to delete your profile? This action cannot be
          undone.
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
