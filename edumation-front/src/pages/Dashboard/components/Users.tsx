import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../services/Types';
import UsersService from '../../../services/UsersService';
import { useUserContext } from '../../../context/UserContext';

const Users = () => {
  const userContext = useUserContext();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedRole, setUpdatedRole] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  if (!userContext) {
    return <div>Loading...</div>;
  }
  const { users } = userContext;

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
        const response = await UsersService.getUserById(selectedUser._id);

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

  if (userContext && userContext.users) {
    return (
      <>
        <h1 className="text-2xl font-semibold">Users</h1>
        <div className="h-screen mt-8 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.email}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.role}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleUpdateClick(user)}
                        className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Update
                      </button>
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
                            <h3 className="text-lg font-semibold">
                              Update User
                            </h3>
                            <form>
                              <input
                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                type="text"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                                placeholder="Name"
                                name="updateUserName"
                              />
                              <input
                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                type="email"
                                value={updatedEmail}
                                onChange={(e) =>
                                  setUpdatedEmail(e.target.value)
                                }
                                placeholder="Email"
                                name="updateUserEmail"
                              />
                              <input
                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                type="text"
                                value={updatedRole}
                                onChange={(e) => setUpdatedRole(e.target.value)}
                                placeholder="Role"
                                name="updateUserRole"
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
                            </form>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                  Prev
                </button>
                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div>No users found.</div>;
  }
};

export default Users;
