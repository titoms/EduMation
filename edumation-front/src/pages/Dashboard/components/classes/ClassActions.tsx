import SearchBar from '../../../../components/ui/SearchBar';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

export interface ClassActionsProps {
  setFilter: (searchValue: string) => void;
}

const ClassActions: React.FC<ClassActionsProps> = ({ setFilter }) => {
  return (
    <div className="flex my-4 justify-end gap-2">
      {' '}
      <SearchBar onFilterChange={setFilter} />
      <Link to="new">
        <Button startIcon={<Edit />} variant="contained">
          Create new class
        </Button>
      </Link>
      <Link to="import">
        <Button startIcon={<ArrowUpwardIcon />} variant="outlined">
          Import
        </Button>
      </Link>
      <Link to="">
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
          <span className="hidden md:inline">Delete Bulk</span>
        </Button>
      </Link>
    </div>
  );
};

export default ClassActions;
