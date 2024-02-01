import React from 'react';
import { Button, Checkbox } from '@mui/material';
import { Group } from '../../../../services/Types';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

interface ClassCardProps {
  group: Group;
  onDelete: (groupId: string, groupName: string) => void; // Function to handle delete
}

const ClassCard: React.FC<ClassCardProps> = ({ group, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between gap-4 flex-row flex-wrap md:flex-nowrap">
        <Checkbox />
        <Link to={group._id} className="pt-2">
          <span className="text-xl font-bold hover:text-blue-600 overflow-hidden">
            {group.name}
          </span>
        </Link>
        <div className="flex justify-start gap-2 md:mt-0">
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(group._id, group.name)}
          >
            <span className="hidden md:inline">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
