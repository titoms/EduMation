import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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

  const token = localStorage.getItem('token');
  let userId = '';
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken._id;
  }

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="container h-screen mt-8">
        {userProfile && (
          <div className="bg-white w-full shadow rounded-lg p-6">
            <div className="flex items-center space-x-6 mb-4">
              <div className="flex-shrink-0">
                {/* <img
                  className="h-16 w-16 object-cover rounded-full"
                  src={userProfile.pic}
                  alt="profile"
                /> */}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 my-4">
                  Name : {userProfile.name}
                </h2>
                <p className="text-sm text-gray-600 mt-4">
                  <b>Email : </b>
                  {userProfile.email}
                </p>
              </div>
            </div>
            {/* Add additional profile data here */}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
