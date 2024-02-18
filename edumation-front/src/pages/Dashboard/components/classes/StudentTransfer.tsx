import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { styled } from '@stitches/react';
import UsersService from '../../../../services/UsersService';
import { User } from '../../../../services/Types';
import { DraggableColumn } from '../../../../components/ui/draganddrop/DraggableColumn';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';

interface StudentTransferProps {
  initialStudents?: User[];
  onNewClassStudentsChange: (students: string[]) => void;
}

const StyledColumns = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  width: '100%',
  height: '80%',
  gap: '12px',
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
        const newClassStudentIds = newEndCol.list
          .map((student) => student._id)
          .filter((id): id is string => !!id);
        onNewClassStudentsChange(newClassStudentIds);
      } else if (
        source.droppableId === 'NewClassStudents' &&
        destination.droppableId === 'AvailableStudents'
      ) {
        const newClassStudentIds = newStartCol.list
          .map((student) => student._id)
          .filter((id): id is string => !!id);
        onNewClassStudentsChange(newClassStudentIds);
      }
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    const newClassStudentsList = columns.NewClassStudents.list.filter(
      (student) => student._id !== studentId
    );
    const availableStudentsList = [
      ...columns.AvailableStudents.list,
      columns.NewClassStudents.list.find(
        (student) => student._id === studentId
      )!,
    ].filter(Boolean);

    setColumns({
      ...columns,
      NewClassStudents: {
        ...columns.NewClassStudents,
        list: newClassStudentsList,
      },
      AvailableStudents: {
        ...columns.AvailableStudents,
        list: availableStudentsList,
      },
    });
    onNewClassStudentsChange(
      newClassStudentsList.map((student) => student._id!)
    );
  };

  const handleRemoveAllUsers = () => {
    const updatedAvailableUsersList = [
      ...columns.AvailableStudents.list,
      ...columns.NewClassStudents.list,
    ];

    // Clear the NewClassUsers list
    const updatedNewClassUsersList = [];

    setColumns({
      ...columns,
      NewClassStudents: {
        ...columns.NewClassStudents,
        list: updatedNewClassUsersList,
      },
      AvailableStudents: {
        ...columns.AvailableStudents,
        list: updatedAvailableUsersList,
      },
    });

    // Since NewClassUsers list is now empty, update accordingly
    onNewClassStudentsChange([]);
  };

  if (loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledColumns>
        {Object.values(columns).map((col) => (
          <DraggableColumn
            col={col}
            key={col.id}
            onRemoveStudent={
              col.id === 'NewClassStudents' ? handleRemoveStudent : undefined
            }
            onRemoveAllStudents={handleRemoveAllUsers}
          />
        ))}
      </StyledColumns>
    </DragDropContext>
  );
};

export default StudentTransfer;
