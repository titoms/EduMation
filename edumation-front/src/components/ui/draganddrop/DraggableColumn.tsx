import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { styled } from '@stitches/react';
import { DraggableItem } from './DraggableItem';
import { User } from '../../../services/Types';

interface ColumnProps {
  col: {
    id: string;
    list: User[];
  };
}

const StyledColumn = styled('div', {
  padding: '0',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 8,
  h2: {
    margin: 0,
    padding: '0 16px',
  },
});

const StyledList = styled('div', {
  borderRadius: 8,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  marginTop: 8,
});

const StyledSearch = styled('input', {
  marginBottom: '4px',
  padding: '4px',
  borderRadius: '4px',
  width: '100%',
  boxSizing: 'border-box',
});

export const DraggableColumn: React.FC<ColumnProps> = ({
  col: { list, id },
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };

  const filteredList = list.filter((student) =>
    student.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <StyledColumn>
          <h2>{id}</h2>

          <StyledList
            className="bg-gray-400 dark:bg-slate-600"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <StyledSearch
              type="text"
              className="bg-gray-100 dark:bg-slate-700 border-1 border-white"
              placeholder="Search students..."
              onChange={handleSearchChange}
            />
            {filteredList.map((student, index) => (
              <DraggableItem
                key={student._id}
                student={student}
                index={index}
              />
            ))}
            {provided.placeholder}
          </StyledList>
        </StyledColumn>
      )}
    </Droppable>
  );
};
