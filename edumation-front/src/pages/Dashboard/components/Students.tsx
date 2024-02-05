// Students.tsx
import { useEffect, useState } from 'react';
import UserTable from './users/UserTable';
import UpdateUserModal from '../../../components/UpdateProfileModal';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';
import { useUserContext } from '../../../context/UserContext';
import { User } from '../../../services/Types';
import TableSkeleton from '../../../components/ui/skeletons/TableSkeleton';
import UsersService from '../../../services/UsersService';
import { toast } from 'react-toastify';

const Students = () => {
  const userContext = useUserContext();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [students, setStudents] = useState<User[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
    setIsDeleteModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
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
      </div>
    </>
  );
};

export default Students;
