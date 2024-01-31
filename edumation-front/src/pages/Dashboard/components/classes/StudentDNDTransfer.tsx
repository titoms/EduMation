import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { styled } from '@stitches/react';
import UsersService from '../../../../services/UsersService';
import { Grid, Skeleton } from '@mui/material';
import { User } from '../../../../services/Types';

interface ColumnProps {
  col: {
    id: string;
    list: string[];
  };
}

interface ItemProps {
  text: string;
  index: number;
}

interface Column {
  id: string;
  list: string[]; // or whatever the type of the items in the list is
}

interface Columns {
  [key: string]: Column;
}

const StyledColumns = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  width: '80%',
  height: '80vh',
  gap: '8px',
});

const StyledColumn = styled('div', {
  padding: '0 16px',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 8,
  h2: {
    margin: 0,
    padding: '0 16px',
  },
});

const StyledList = styled('div', {
  backgroundColor: '#ddd',
  borderRadius: 8,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  marginTop: 8,
});

const StyledItem = styled('div', {
  backgroundColor: '#eee',
  borderRadius: 4,
  padding: '4px 8px',
  transition: 'background-color .8s ease-out',
  marginTop: 8,

  ':hover': {
    backgroundColor: '#fff',
    transition: 'background-color .1s ease-in',
  },
});

export const Item: React.FC<ItemProps> = ({ text, index }) => {
  return (
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <StyledItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </StyledItem>
      )}
    </Draggable>
  );
};

export const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <StyledColumn>
          <h2>{id}</h2>
          <StyledList {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((text, index) => (
              <Item key={text} text={text} index={index} />
            ))}
            {provided.placeholder}
          </StyledList>
        </StyledColumn>
      )}
    </Droppable>
  );
};

const StudentDNDTransfer = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [columns, setColumns] = useState<Columns>({
    AvailableStudents: {
      id: 'AvailableStudents',
      list: [],
    },
    NewClassStudents: {
      id: 'NewClassStudents',
      list: [],
    },
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await UsersService.getAllUsers();
        const studentData = response.data.filter(
          (user) => user.role === 'student'
        );
        setStudents(studentData);

        // Update the AvailableStudents list with student names
        setColumns((prevColumns) => ({
          ...prevColumns,
          AvailableStudents: {
            ...prevColumns.AvailableStudents,
            list: studentData.map((student) => student.name),
          },
        }));

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
    // Make sure we have a valid destination
    if (!destination) return;
    console.log('Source ID:', source.droppableId);
    console.log('Destination ID:', destination.droppableId);
    console.log('Columns State:', columns);
    console.log(students);

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start: Column = columns[source.droppableId];
    const end: Column = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  if (loading) {
    return (
      <>
        <Skeleton variant="text" height={60} />
        <Grid container spacing={2} className="mb-4 w-full">
          <Grid item xs={12} md={6} xl={4}>
            <Skeleton variant="rounded" height={300} />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Skeleton variant="rounded" height={300} />
          </Grid>
        </Grid>
      </>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledColumns>
        {Object.values(columns).map((col) => (
          <Column col={col} key={col.id} />
        ))}
      </StyledColumns>
    </DragDropContext>
  );
};

export default StudentDNDTransfer;
