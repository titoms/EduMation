import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Grid, Skeleton } from '@mui/material';

type UserProfile = {
  name: string;
  email: string;
  role: string;
  pic: string;
};

const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updatedName, setUpdatedName] = useState(
    userProfile ? userProfile.name : ''
  );
  const [updatedEmail, setUpdatedEmail] = useState(
    userProfile ? userProfile.email : ''
  );
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let userId = '';

  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken._id;
  }

  const isCurrentUser = userProfile && userProfile._id === userId;

  const handleUpdateClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        {
          name: updatedName,
          email: updatedEmail,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      console.log(response);

      if (response.status === 200) {
        toast.success('Updated successfully');
        setUpdatedName(updatedName);
        setUpdatedEmail(updatedEmail);
        // Update userProfile state here if needed
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Update failed: ${error.response.data}`);
      } else {
        toast.error('Update failed. Please try again.');
      }
    }
    setShowModal(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      if (response.status === 200) {
        toast.success('Account deleted successfully');
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
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Replace '/me' with the endpoint you use to retrieve the logged-in user's information
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserProfile(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data);
        } else {
          setError('An unexpected error occurred');
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <>
        <Skeleton variant="text" height={60} />
        <Skeleton variant="rounded" height={200} />
      </>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="h-screen mt-8">
        <div className="flex flex-col">
          {userProfile && (
            <div className="bg-white w-full shadow rounded-lg p-6">
              <div className="flex items-center justify-between space-x-6 mb-4">
                {/*<div className="flex-shrink-0">
                 <img
                  className="h-16 w-16 object-cover rounded-full"
                  src={userProfile.pic}
                  alt="profile"
                /> 
              </div>*/}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Name : {userProfile.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-4">
                    <b>Email : </b>
                    {userProfile.email}
                  </p>
                </div>
                <div className="flex space-x-4">
                  {isCurrentUser && (
                    <button
                      onClick={handleUpdateClick}
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      Update
                    </button>
                  )}
                  {showModal && (
                    <div
                      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                      onClick={handleModalClose}
                    >
                      <div
                        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="mt-3 text-center">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Update Profile
                          </h3>
                          <form
                            id="updateForm"
                            onSubmit={handleUpdateSubmit}
                            className="mt-8"
                          >
                            <div className="flex items-center mb-4">
                              <label className="block text-sm font-medium text-gray-700 mr-2">
                                Name:
                              </label>
                              <input
                                type="text"
                                className="flex-1 p-2 border border-gray-300 rounded"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                                name="updateProfileName"
                              />
                            </div>
                            <div className="flex items-center mb-4">
                              <label className="block text-sm font-medium text-gray-700 mr-2">
                                Email:
                              </label>
                              <input
                                type="email"
                                className="flex-1 p-2 border border-gray-300 rounded"
                                value={updatedEmail}
                                onChange={(e) =>
                                  setUpdatedEmail(e.target.value)
                                }
                                name="updateProfileEmail"
                              />
                            </div>
                            <div className="items-center px-4 py-3">
                              <button
                                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                                type="submit"
                              >
                                Update
                              </button>
                              <button
                                onClick={handleModalClose}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={handleDeleteClick}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete
                  </button>
                  {/* Delete Confirmation Modal */}
                  {showDeleteModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                      <div className="relative text-center top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="mb-4 text-lg font-semibold">
                          Are you sure you want to delete your account?
                        </h3>
                        <button
                          onClick={handleDeleteConfirm}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={handleCloseDeleteModal}
                          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Add additional profile data here */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
