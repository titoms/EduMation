import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { styled } from '@stitches/react';
import UsersService from '../../../services/UsersService';
import { User } from '../../../services/Types';
import { DraggableColumn } from './DraggableColumn';
import UserSkeleton from '../skeletons/UserSkeleton';

interface StudentTransferProps {
  initialStudents?: User[];
  onNewClassStudentsChange: (students: string[]) => void;
}

const StyledColumns = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  width: '80%',
  height: '80%',
  gap: '8px',
});

const StudentTransfer: React.FC<StudentTransferProps> = ({
  initialStudents,
  onNewClassStudentsChange,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [columns, setColumns] = useState({
    AvailableStudents: {
      id: 'AvailableStudents',
      list: [] as User[],
    },
    NewClassStudents: {
      id: 'NewClassStudents',
      list: initialStudents || [],
    },
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await UsersService.getAllUsers();
        const studentData = response.data.filter(
          (user) => user.role === 'student'
        );
        let availableStudents;
        if (initialStudents) {
          availableStudents = studentData.filter(
            (student) =>
              !initialStudents.some(
                (initialStudent) => initialStudent._id === student._id
              )
          );
        }

        setColumns({
          AvailableStudents: {
            id: 'AvailableStudents',
            list: availableStudents ? availableStudents : studentData,
          },
          NewClassStudents: {
            id: 'NewClassStudents',
            list: initialStudents ? initialStudents : [],
          },
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
  }, [initialStudents]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return;

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

      if (destination.droppableId === 'NewClassStudents') {
        const newClassStudentIds = newEndCol.list.map((student) => student._id);
        onNewClassStudentsChange(newClassStudentIds);
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
          <DraggableColumn col={col} key={col.id} />
        ))}
      </StyledColumns>
    </DragDropContext>
  );
};

export default StudentTransfer;
