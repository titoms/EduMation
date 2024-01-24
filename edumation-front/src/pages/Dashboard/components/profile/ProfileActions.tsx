import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProfileActions = ({ isCurrentUser, onEdit, onDelete }) => {
  return (
    <div className="flex space-x-4 mt-4">
      {isCurrentUser && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faEdit} />}
          onClick={onEdit}
        >
          Edit
        </Button>
      )}
      {isCurrentUser && (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<FontAwesomeIcon icon={faTrash} />}
          onClick={onDelete}
        >
          Delete
        </Button>
      )}
    </div>
  );
};

export default ProfileActions;
