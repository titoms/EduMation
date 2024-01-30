import ClassesList from './classes/ClassesList';
import { ClassProvider } from '../../../context/ClassContext';
import { Button } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Classes = () => {
  return (
    <>
      <ClassProvider>
        <h1 className="text-2xl font-semibold">Classes</h1>
        <div className="flex my-4 justify-end gap-2">
          {' '}
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
        </div>
        <ClassesList />
      </ClassProvider>
    </>
  );
};

export default Classes;
