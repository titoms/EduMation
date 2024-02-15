import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { styled } from '@stitches/react';
import { User } from '../../../services/Types';

interface ItemProps {
  student: User;
  index: number;
  onRemove: () => void;
  showRemoveIcon: boolean;
}

const StyledItem = styled('div', {
  borderRadius: 4,
  padding: '4px 8px',
  transition: 'background-color .6s ease-out',
  marginTop: 8,

  ':hover': {
    transition: 'background-color .1s ease-in',
  },
});

export const DraggableItem: React.FC<ItemProps> = ({
  student,
  index,
  onRemove,
  showRemoveIcon,
}) => {
  return (
    <Draggable draggableId={student._id!} index={index}>
      {(provided) => (
        <StyledItem
          className="bg-slate-300 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-800"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between">
            {student.name} - {student.email}
            {showRemoveIcon && (
              <span className="cursor-pointer" onClick={onRemove}>
                X
              </span>
            )}{' '}
          </div>
        </StyledItem>
      )}
    </Draggable>
  );
};
