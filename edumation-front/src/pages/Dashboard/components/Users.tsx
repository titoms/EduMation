import { useEffect, useState } from 'react';
import UserTable from './users/UserTable';
import UpdateUserModal from '../../../components/UpdateProfileModal';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';
import { useUserContext } from '../../../context/UserContext';
import { User } from '../../../services/Types';
import TableSkeleton from '../../../components/ui/skeletons/TableSkeleton';
import UsersService from '../../../services/UsersService';
import { toast } from 'react-toastify';

const Users = () => {
  const userContext = useUserContext();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
    return <TableSkeleton />;
  }
  const { users, setUsers } = userContext;

  const handleDeleteUser = async (userId: string) => {
    try {
      await UsersService.deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
      toast.success('User deleted successfully');
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const onShowUpdateModal = (user: User) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const onShowDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  if (loading) return <TableSkeleton />;

  return (
    <>
      <div className="mt-4">
        {admins.length > 0 && (
          <>
            <h2 className="my-4 font-semibold text-xl">Admin Users</h2>
            <UserTable
              users={admins}
              onShowUpdateModal={onShowUpdateModal}
              onShowDeleteModal={onShowDeleteModal}
            />
          </>
        )}

        {schools.length > 0 && (
          <>
            <h2 className="my-4 font-semibold text-xl">Schools</h2>
            <UserTable
              users={schools}
              onShowUpdateModal={onShowUpdateModal}
              onShowDeleteModal={onShowDeleteModal}
            />
          </>
        )}

        {teachers.length > 0 && (
          <>
            <h2 className="my-4 font-semibold text-xl">Teachers</h2>
            <UserTable
              users={teachers}
              onShowUpdateModal={onShowUpdateModal}
              onShowDeleteModal={onShowDeleteModal}
            />
          </>
        )}

        {students.length > 0 && (
          <>
            <h2 className="my-4 font-semibold text-xl">Students</h2>
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

        {isDeleteModalOpen && selectedUser && (
          <DeleteConfirmationModal
            itemId={selectedUser._id}
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={handleDeleteUser}
            confirmationMessage={`Are you sure you want to delete ${selectedUser.name}?`}
          />
        )}
      </div>
    </>
  );
};

export default Users;
