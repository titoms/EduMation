import { useState, useEffect } from 'react';
import { User } from '../../../../services/Types';
import UsersService from '../../../../services/UsersService';
import UpdateProfileModal from './UpdateProfileModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Button } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProfileInformations = (user) => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = user.userProfile._id;
      try {
        const { data } = await UsersService.getUserById(userId);
        setUserProfile(data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdate = (name: string, email: string) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, name, email });
    }
  };

  const handleDelete = () => {
    // Logic after deletion, like redirecting the user
    console.log('User profile deleted');
  };

  if (!userProfile) return <div>Loading...</div>;

  return (
    <div className="bg-white w-full shadow rounded-lg p-6">
      <div className="flex flex-col justify-between md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <img
            className="w-40 h-40 rounded-full"
            src={
              userProfile.profileImage
                ? userProfile.profileImage
                : 'https://via.placeholder.com/150'
            }
            alt="User profile"
          />
        </div>
        <div className="">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Name: {userProfile.name}
          </h2>
          <p className="text-sm text-gray-600 mt-4">
            <b>Email: </b>
            {userProfile.email}
          </p>
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            size="large"
            variant="contained"
            startIcon={<Edit />}
            onClick={() => setShowUpdateModal(true)}
          >
            Update
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      {showUpdateModal && (
        <UpdateProfileModal
          user={userProfile}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdate}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          userId={userProfile._id}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ProfileInformations;
