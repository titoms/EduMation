// UpdateUserModal.tsx
import React, { useState } from 'react';
import { User } from '../services/Types';
import UsersService from '../services/UsersService';
import { toast } from 'react-toastify';
import DragAndDrop from './ui/draganddrop/DragAndDrop';
import { Button, Modal } from '@mui/material';

interface UpdateUserModalProps {
  user: User;
  onClose: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  user,
  onClose,
  setUsers,
}) => {
  const [updatedName, setUpdatedName] = useState(user.name);
  const [updatedEmail, setUpdatedEmail] = useState(user.email);
  const [updatedRole, setUpdatedRole] = useState(user.role);
  const [updatedPassword, setUpdatedPassword] = useState(user.password);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleFileDrop = (file: File) => {
    setProfileImage(file);
  };
  const handleUpdateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedUser = new FormData();
      updatedUser.append('name', updatedName);
      updatedUser.append('email', updatedEmail);
      updatedUser.append('role', updatedRole);
      if (updatedPassword) {
        updatedUser.append('password', updatedPassword);
      }
      if (profileImage) {
        updatedUser.append('profileImage', profileImage);
      }

      const response = await UsersService.updateUser(user._id, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === user._id ? response.data : u))
      );
      toast.success('User updated successfully');
      onClose();
    } catch (error) {
      toast.error('Update failed. Please try again.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="fixed inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full dark:text-slate-200"
        onClick={onClose}
      >
        <div
          className="relative  dark:bg-slate-800 dark:border-slate-900 top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-semibold">Update User</h3>
          <form onSubmit={handleUpdateUser}>
            <label
              htmlFor="updateUserName"
              className="block font-semibold mt-2"
            >
              New Name
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded mt-2 dark:text-slate-700"
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              placeholder="Name"
              name="updateUserName"
              id="updateUserName"
            />
            <label
              htmlFor="updateUserEmail"
              className="block font-semibold mt-2"
            >
              New Email
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded mt-2 dark:text-slate-700"
              type="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              placeholder="Email"
              name="updateUserEmail"
              id="updateUserEmail"
            />
            <label
              htmlFor="updateUserPassword"
              className="block font-semibold mt-2"
            >
              New Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded mt-2 dark:text-slate-700"
              type="password"
              value={updatedPassword}
              onChange={(e) => setUpdatedPassword(e.target.value)}
              placeholder="Password"
              name="updateUserPassword"
              id="updateUserPassword"
            />
            <label
              htmlFor="updateUserRole"
              className="block font-semibold mt-2"
            >
              New Role
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded dark:text-slate-700"
              name="updateUserRole"
              id="updateUserRole"
              value={updatedRole}
              onChange={(e) => setUpdatedRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>

            <p className="font-semibold mt-2">New Profile Picture</p>
            <DragAndDrop fileType="image" onFileDrop={handleFileDrop} />
            <div className="flex gap-4 justify-end mt-8">
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
