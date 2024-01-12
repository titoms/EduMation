import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedRole, setUpdatedRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(response.data);
      } catch (error) {
        toast.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateClick = (user: User) => {
    setSelectedUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    setUpdatedRole(user.role);
    setShowUpdateModal(true);
  };

  const handleUpdateUser = async () => {
    if (selectedUser) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/users/${selectedUser._id}`,
          { name: updatedName, email: updatedEmail, role: updatedRole },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.status === 200) {
          setUsers(
            users.map((user) =>
              user._id === selectedUser._id ? response.data : user
            )
          );
          toast.success('User updated successfully');
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(`Update failed: ${error.response.data}`);
        } else {
          toast.error('Update failed. Please try again.');
        }
      }
      setShowUpdateModal(false);
    }
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/users/${selectedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.status === 200) {
          setUsers(users.filter((user) => user._id !== selectedUser._id));
          toast.success('User deleted successfully');
          localStorage.removeItem('token'); // Remove the authentication token
          navigate('/'); // Redirect to home page
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(`Deletion failed: ${error.response.data}`);
        } else {
          toast.error('Deletion failed. Please try again.');
        }
      }
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">Users</h1>
      <div className="h-screen p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-gray-500">Email</th>
                <th className="px-4 py-2 text-left text-gray-500">Role</th>
                <th className="px-4 py-2 text-left text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleUpdateClick(user)}
                      className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && selectedUser && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          onClick={() => setShowUpdateModal(false)}
        >
          <div
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold">Update User</h3>
            <input
              className="w-full p-2 border border-gray-300 rounded mt-2"
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              placeholder="Name"
            />
            <input
              className="w-full p-2 border border-gray-300 rounded mt-2"
              type="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              className="w-full p-2 border border-gray-300 rounded mt-2"
              type="text"
              value={updatedRole}
              onChange={(e) => setUpdatedRole(e.target.value)}
              placeholder="Role"
            />
            <button
              onClick={handleUpdateUser}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
            >
              Update
            </button>
            <button
              onClick={() => setShowUpdateModal(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-4 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="relative top-20 text-center mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-semibold">
              Are you sure you want to delete this user?
            </h3>
            <button
              onClick={handleDeleteUser}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
