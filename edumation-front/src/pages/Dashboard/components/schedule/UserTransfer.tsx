import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { styled } from '@stitches/react';
import UsersService from '../../../../services/UsersService';
import { User } from '../../../../services/Types';
import { DraggableColumn } from '../../../../components/ui/draganddrop/DraggableColumn';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';

interface UserTransferProps {
  initialUser?: User[];
  onNewClassUserChange: (users: string[]) => void;
}

const StyledColumns = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  width: '100%',
  height: '80%',
  gap: '12px',
});

const UserTransfer: React.FC<UserTransferProps> = ({
  initialUser,
  onNewClassUserChange,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [columns, setColumns] = useState({
    AvailableUsers: {
      id: 'AvailableUsers',
      list: [] as User[],
    },
    NewClassUsers: {
      id: 'NewClassUsers',
      list: initialUser || [],
    },
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await UsersService.getAllUsers();
        const userData = response.data;
        let availableUsers;
        if (initialUser) {
          availableUsers = userData.filter(
            (student) => !initialUser.some((user) => user._id === student._id)
          );
        }

        setColumns({
          AvailableUsers: {
            id: 'AvailableUsers',
            list: availableUsers ? availableUsers : userData,
          },
          NewClassUsers: {
            id: 'NewClassUsers',
            list: initialUser ? initialUser : [],
          },
        });
        setLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(
          error.message
            ? error.message
            : 'An error occurred while fetching users.'
        );
        setLoading(false);
      }
    };

    fetchStudents();
  }, [initialUser]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const start = columns[source.droppableId as keyof typeof columns];
    const end = columns[destination.droppableId as keyof typeof columns];

    if (start === end) {
      const newList = Array.from(start.list);
      const [removed] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, removed);

      const newCol = { ...start, list: newList };
      setColumns({ ...columns, [source.droppableId]: newCol });
    } else {
      const startList = Array.from(start.list);
      const [removed] = startList.splice(source.index, 1);
      const endList = Array.from(end.list);
      endList.splice(destination.index, 0, removed);

      const newStartCol = { ...start, list: startList };
      const newEndCol = { ...end, list: endList };
      setColumns({
        ...columns,
        [source.droppableId]: newStartCol,
        [destination.droppableId]: newEndCol,
      });

      if (destination.droppableId === 'NewClassUsers') {
        const newClassUsersIds = newEndCol.list
          .map((user) => user._id)
          .filter((id): id is string => !!id);
        onNewClassUserChange(newClassUsersIds);
      } else if (
        source.droppableId === 'NewClassUsers' &&
        destination.droppableId === 'AvailableUsers'
      ) {
        const newClassUsersIds = newStartCol.list
          .map((user) => user._id)
          .filter((id): id is string => !!id);
        onNewClassUserChange(newClassUsersIds);
      }
    }
  };

  const handleRemoveUser = (userId: string) => {
    const newClassUsersList = columns.NewClassUsers.list.filter(
      (user) => user._id !== userId
    );
    const availableUsersList = [
      ...columns.AvailableUsers.list,
      columns.NewClassUsers.list.find((user) => user._id === userId)!,
    ].filter(Boolean);

    setColumns({
      ...columns,
      NewClassUsers: {
        ...columns.NewClassUsers,
        list: newClassUsersList,
      },
      AvailableUsers: {
        ...columns.AvailableUsers,
        list: availableUsersList,
      },
    });
    onNewClassUserChange(newClassUsersList.map((user) => user._id!));
  };

  const handleRemoveAllUsers = () => {
    const updatedAvailableUsersList = [
      ...columns.AvailableUsers.list,
      ...columns.NewClassUsers.list,
    ];

    const updatedNewClassUsersList: never[] = [];
    setColumns({
      ...columns,
      NewClassUsers: {
        ...columns.NewClassUsers,
        list: updatedNewClassUsersList,
      },
      AvailableUsers: {
        ...columns.AvailableUsers,
        list: updatedAvailableUsersList,
      },
    });
    onNewClassUserChange([]);
  };

  return (
    <>
      {loading ? (
        <UserSkeleton />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <StyledColumns>
            {Object.values(columns).map((col) => (
              <DraggableColumn
                col={col}
                key={col.id}
                onRemoveStudent={
                  col.id === 'NewClassUsers' ? handleRemoveUser : undefined
                }
                onRemoveAllStudents={handleRemoveAllUsers}
              />
            ))}
          </StyledColumns>
        </DragDropContext>
      )}
    </>
  );
};

export default UserTransfer;
