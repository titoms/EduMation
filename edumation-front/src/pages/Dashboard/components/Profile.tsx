import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Corrected import for jwt-decode
import { Skeleton } from '@mui/material';
import UsersService from '../../../services/UsersService';
import { User } from '../../../services/Types';
import ProfileInformation from './profile/ProfileInformation';

const Profile = () => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found');
      setLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
      const response = await UsersService.getUserById(userId);
      setUserProfile(response.data);
      setLoading(false);
    } catch (err) {
      handleAxiosError(
        err,
        'An unexpected error occurred while fetching user profile'
      );
    }
  };

  const handleAxiosError = (err, defaultErrorMessage) => {
    if (axios.isAxiosError(err) && err.response) {
      setError(err.response.data);
    } else {
      setError(defaultErrorMessage);
    }
    setLoading(false);
  };

  if (loading) return <SkeletonComponent />;
  if (error) return <ErrorComponent errorMessage={error} />;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Profile</h1>
      <ProfileInformation userProfile={userProfile} />
    </div>
  );
};

const SkeletonComponent = () => (
  <>
    <Skeleton variant="text" height={60} />
    <Skeleton variant="rounded" height={200} />
  </>
);

const ErrorComponent = ({ errorMessage }) => <div>Error: {errorMessage}</div>;

export default Profile;
