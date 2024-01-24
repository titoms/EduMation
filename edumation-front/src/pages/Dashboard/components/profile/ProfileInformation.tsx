import React from 'react';
import { User } from '../../../../services/Types';

interface ProfileDetailsProps {
  userProfile: User | null;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userProfile }) => {
  if (!userProfile) return <div>No user profile data</div>;

  return (
    <div className="bg-white w-full shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row items-center gap-8">
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
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Name: {userProfile.name}
          </h2>
          <p className="text-sm text-gray-600 mt-4">
            <b>Email: </b>
            {userProfile.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
