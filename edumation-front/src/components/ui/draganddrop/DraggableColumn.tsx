import React from 'react';
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

export const DroppableColumn: React.FC<ColumnProps> = ({
  col: { list, id },
}) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <StyledColumn>
          <h2>{id}</h2>
          <StyledList {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((student, index) => (
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
