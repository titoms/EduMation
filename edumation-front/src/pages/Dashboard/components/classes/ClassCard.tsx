import React from 'react';
import { IconButton } from '@mui/material';
import { Group } from '../../../../services/Types';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

interface ClassCardProps {
  group: Group;
  onDelete: (groupId: string, groupName: string) => void;
  onToggleSelection: (groupId: string) => void; // Function to toggle selection
  isSelected: boolean; // Is this card selected
}

const ClassCard: React.FC<ClassCardProps> = ({
  group,
  onDelete,
  onToggleSelection,
  isSelected,
}) => {
  const cardClasses = `bg-white dark:bg-slate-800 gap-4 shadow rounded-lg p-2 ${
    isSelected ? 'bg-blue-900 dark:bg-blue-900' : ''
  }`;

  return (
    <>
      <div className={cardClasses} onClick={() => onToggleSelection(group._id)}>
        <div className="flex justify-center gap-8 align-middle items-center my-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => {}}
            className="sr-only"
          />
          <Link to={group._id}>
            <span className="text-xl font-bold hover:text-blue-600 overflow-hidden">
              {group.name}
            </span>
          </Link>
        </div>
        <div className="flex justify-center gap-2 md:mt-0">
          <IconButton
            className="text-black dark:text-gray-200"
            aria-label="add to favorites"
          >
            <FavoriteIcon sx={{ color: '#e678f0' }} />
          </IconButton>
          <IconButton
            className="text-black dark:text-gray-200"
            aria-label="share"
          >
            <ShareIcon sx={{ color: '#3c96c9' }} />
          </IconButton>
          <Link to={group._id}>
            <IconButton
              className="text-black dark:text-gray-200"
              aria-label="share"
            >
              <EditIcon sx={{ color: '#2fcc70' }} />
            </IconButton>
          </Link>
          <IconButton
            className="text-black dark:text-gray-200"
            aria-label="share"
            onClick={() => onDelete(group._id, group.name)}
          >
            <DeleteIcon sx={{ color: '#e63535' }} />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
