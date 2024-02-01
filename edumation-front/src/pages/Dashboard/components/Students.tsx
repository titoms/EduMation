// Students.tsx
import { useEffect, useState } from 'react';
import UserTable from './users/UserTable';
import UpdateUserModal from '../../../components/ui/UpdateProfileModal';
import DeleteUserConfirmationModal from './users/DeleteUserConfirmationModal';
import { useUserContext } from '../../../context/UserContext';
import { User } from '../../../services/Types';
import { Grid, Skeleton } from '@mui/material';
import TableSkeleton from '../../../components/ui/skeletons/TableSkeleton';

const Students = () => {
  const userContext = useUserContext();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [students, setStudents] = useState<User[]>([]);

  useEffect(() => {
    if (userContext && userContext.users) {
      setStudents(userContext.users.filter((user) => user.role === 'student'));
    }
  }, [userContext]);

  if (!userContext) return <TableSkeleton />;

  const { users, setUsers } = userContext;

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
      <h1 className="text-2xl font-semibold">Students</h1>
      <div className="mt-4">
        <div className="grid grid-cols-1">
          {students.length > 0 && (
            <>
              <UserTable
                users={students}
                onShowUpdateModal={onShowUpdateModal}
                onShowDeleteModal={onShowDeleteModal}
              />
            </>
          )}

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

export default Students;
