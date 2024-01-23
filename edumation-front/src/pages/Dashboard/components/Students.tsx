// Students.tsx
import { useEffect, useState } from 'react';
import UserTable from './users/UserTable';
import UpdateUserModal from './users/UpdateUserModal';
import DeleteUserConfirmationModal from './users/DeleteUserConfirmationModal';
import { useUserContext } from '../../../context/UserContext';
import { User } from '../../../services/Types';
import { Grid, Skeleton } from '@mui/material';

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

  if (!userContext) {
    return (
      <>
        <Grid container className="mb-4 w-full">
          <Grid item xs={12} md={12} xl={12}>
            <Skeleton variant="rounded" height={50} />
            <div className="mt-4 rounded-t-lg h-10 px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></div>
            <Skeleton variant="rectangular" height={250} />
            <Skeleton variant="rounded" height={100} />
          </Grid>
        </Grid>
      </>
    );
  }
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
      <div className="h-screen mt-4">
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
