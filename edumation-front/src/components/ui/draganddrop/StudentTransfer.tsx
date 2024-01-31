import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { styled } from '@stitches/react';
import UsersService from '../../../services/UsersService';
import { User } from '../../../services/Types';
import { DroppableColumn } from './DraggableColumn';
import UserSkeleton from '../skeletons/UserSkeleton';

interface Columns {
  [key: string]: {
    id: string;
    list: User[];
  };
}

interface StudentTransferProps {
  onNewClassStudentsChange: (newClassStudents: User[]) => void;
}

const StyledColumns = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  width: '80%',
  height: '40vh',
  gap: '8px',
});

const StudentTransfer: React.FC<StudentTransferProps> = ({
  onNewClassStudentsChange,
}) => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [columns, setColumns] = useState<Columns>({
    AvailableStudents: { id: 'AvailableStudents', list: [] },
    NewClassStudents: { id: 'NewClassStudents', list: [] },
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await UsersService.getAllUsers();
        const studentData = response.data.filter(
          (user) => user.role === 'student'
        );
        setColumns({
          AvailableStudents: { id: 'AvailableStudents', list: studentData },
          NewClassStudents: { id: 'NewClassStudents', list: [] },
        });
        setLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(
          error.message
            ? error.message
            : 'An error occurred while fetching students.'
        );
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return;

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

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

      if (destination.droppableId === 'NewClassStudents') {
        onNewClassStudentsChange(newEndCol.list);
      }
    }
  };

  if (loading) {
    return <UserSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledColumns>
        {Object.values(columns).map((col) => (
          <DroppableColumn col={col} key={col.id} />
        ))}
      </StyledColumns>
    </DragDropContext>
  );
};

export default StudentTransfer;
