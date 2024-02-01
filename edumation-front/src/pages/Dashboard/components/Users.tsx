// Users.tsx
import { useEffect, useState } from 'react';
import UserTable from './users/UserTable';
import UpdateUserModal from '../../../components/ui/UpdateProfileModal';
import DeleteUserConfirmationModal from './users/DeleteUserConfirmationModal';
import { useUserContext } from '../../../context/UserContext';
import { User } from '../../../services/Types';
import { Grid, Skeleton } from '@mui/material';
import TableSkeleton from '../../../components/ui/skeletons/TableSkeleton';

const Users = () => {
  const userContext = useUserContext();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [admins, setAdmins] = useState<User[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [schools, setSchools] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userContext && userContext.users) {
      setAdmins(userContext.users.filter((user) => user.role === 'admin'));
      setStudents(userContext.users.filter((user) => user.role === 'student'));
      setTeachers(userContext.users.filter((user) => user.role === 'teacher'));
      setSchools(userContext.users.filter((user) => user.role === 'school'));
    }
    setLoading(false);
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

  if (loading) return <TableSkeleton />;

  return (
    <>
      <h1 className="text-2xl font-semibold">Users</h1>
      <div className="mt-4">
        <div className="grid grid-cols-1">
          {admins.length > 0 && (
            <>
              <h3 className="my-4 font-semibold text-xl">Admin Users</h3>
              <UserTable
                users={admins}
                onShowUpdateModal={onShowUpdateModal}
                onShowDeleteModal={onShowDeleteModal}
              />
            </>
          )}

          {schools.length > 0 && (
            <>
              <h3 className="my-4 font-semibold text-xl">Schools</h3>
              <UserTable
                users={schools}
                onShowUpdateModal={onShowUpdateModal}
                onShowDeleteModal={onShowDeleteModal}
              />
            </>
          )}

          {teachers.length > 0 && (
            <>
              <h3 className="my-4 font-semibold text-xl">Teachers</h3>
              <UserTable
                users={teachers}
                onShowUpdateModal={onShowUpdateModal}
                onShowDeleteModal={onShowDeleteModal}
              />
            </>
          )}

          {students.length > 0 && (
            <>
              <h3 className="my-4 font-semibold text-xl">Students</h3>
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

export default Users;
