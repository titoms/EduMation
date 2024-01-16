// Users.tsx
import { useState } from 'react';
import UserTable from './users/UserTable';
import UpdateUserModal from './users/UpdateUserModal';
import DeleteUserConfirmationModal from './users/DeleteUserConfirmationModal';
import { useUserContext } from '../../../context/UserContext';
import { User } from '../../../services/Types';

const Users = () => {
  const userContext = useUserContext();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!userContext) {
    return <div>Loading...</div>;
  }
  const { users, setUsers } = userContext;
  console.log(users);

  const onShowUpdateModal = (user: User) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const onShowDeleteModal = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">Users</h1>
      <div className="h-screen mt-8">
        <div className="grid grid-cols-1">
          <UserTable
            users={users}
            onShowUpdateModal={onShowUpdateModal}
            onShowDeleteModal={onShowDeleteModal}
          />
          {showUpdateModal && selectedUser && (
            <UpdateUserModal
              user={selectedUser}
              onClose={() => setShowUpdateModal(false)}
              setUsers={setUsers}
            />
          )}
          {showDeleteModal && selectedUser && (
            <DeleteUserConfirmationModal
              user={selectedUser}
              onClose={() => setShowDeleteModal(false)}
              setUsers={setUsers}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
