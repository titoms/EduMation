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
    <div className="bg-white dark:bg-slate-800 h-24 flex justify-around align-middle items-center shadow rounded-lg p-6">
      <Checkbox />
      <Link to={group._id}>
        <span className="text-xl font-bold hover:text-slate-300 overflow-hidden">
          {group.name}
        </span>
      </Link>
      <div className="flex justify-start gap-2 md:mt-0">
        <Button
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon fontSize="inherit" />}
          onClick={() => onDelete(group._id, group.name)}
        >
          <span className="">Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default ClassCard;
