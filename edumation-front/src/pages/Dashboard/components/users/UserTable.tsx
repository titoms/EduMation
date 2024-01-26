// UserTable.tsx
import React, { useEffect, useState } from 'react';
import UserRow from './UserRow';
import { User } from '../../../../services/Types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';

interface UserTableProps {
  users: User[];
  onShowUpdateModal: (user: User) => void;
  onShowDeleteModal: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onShowUpdateModal,
  onShowDeleteModal,
}) => {
  const [filter, setFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase()) ||
        user.role.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredUsers(result);
  }, [filter, users]);
  return (
    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden pt-2">
      <div className="ml-2">
        <IconButton aria-label="Search...">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </IconButton>
        <input
          type="text"
          placeholder="Filter users..."
          className="mb-4 px-3 py-2 border rounded-full"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

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
          {filteredUsers.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              onShowUpdateModal={onShowUpdateModal}
              onShowDeleteModal={onShowDeleteModal}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
