import React, { useState } from 'react';
import UsersService from '../../../../services/UsersService';
import { User } from '../../../../services/Types';
import { toast } from 'react-toastify';

interface UpdateProfileModalProps {
  user: User;
  onClose: () => void;
  onUpdate: (name: string, email: string) => void;
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
  user,
  onClose,
  onUpdate,
}) => {
  const [updatedName, setUpdatedName] = useState(user.name);
  const [updatedEmail, setUpdatedEmail] = useState(user.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await UsersService.updateUser(user._id, {
        name: updatedName,
        email: updatedEmail,
      });

      if (response.status === 200) {
        toast.success('Profile updated successfully');
        onUpdate(updatedName, updatedEmail);
        onClose();
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Update Profile
        </h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-l"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-r"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
