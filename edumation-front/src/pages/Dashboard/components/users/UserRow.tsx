// UserRow.tsx
import React from 'react';
import { User } from '../../../../services/Types';

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
              src="https://via.placeholder.com/150"
              alt={user.name}
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
        <button
          onClick={() => onShowUpdateModal(user)}
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
        <button
          onClick={() => onShowDeleteModal(user)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
