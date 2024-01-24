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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Confirm Deletion
        </h3>
        <p className="mt-2">
          Are you sure you want to delete your profile? This action cannot be
          undone.
        </p>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-l"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-r"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
