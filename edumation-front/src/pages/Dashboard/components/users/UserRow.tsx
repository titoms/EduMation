// UserRow.tsx
import React from 'react';
import { User } from '../../../../services/Types';
import { Button } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface UserRowProps {
  user: User;
  onShowUpdateModal: (user: User) => void;
  onShowDeleteModal: (user: User) => void;
}

const UserRow: React.FC<UserRowProps> = ({
  user,
  onShowUpdateModal,
  onShowDeleteModal,
}) => {
  return (
    <tr key={user._id}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={
                user.profileImage
                  ? user.profileImage
                  : 'https://via.placeholder.com/150'
              }
              alt="User profile Pic"
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
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
        <div className="flex gap-4">
          <Button
            size="small"
            variant="contained"
            startIcon={<Edit />}
            onClick={() => onShowUpdateModal(user)}
          >
            Update
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onShowDeleteModal(user)}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
