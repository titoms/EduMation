// UserTable.tsx
import React, { useEffect, useState } from 'react';
import UserRow from './UserRow';
import { User } from '../../../../services/Types';
import SearchBar from '../../../../components/ui/SearchBar';

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
    <div className="inline-block min-w-full shadow rounded-lg bg-slate-200 dark:bg-gray-800 overflow-hidden">
      <div className="my-2 ml-2">
        <SearchBar onFilterChange={setFilter} />
      </div>

      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-800 bg-slate-100 dark:bg-slate-600 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
              Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-800 bg-slate-100 dark:bg-slate-600 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
              Email
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-800 bg-slate-100 dark:bg-slate-600 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
              Role
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-800 bg-slate-100 dark:bg-slate-600 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
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
