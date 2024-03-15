import React from 'react';
import QuizzList from './quizz/QuizzList';
import { Button } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const Quizz: React.FC = () => {
  return (
    <>
      <div className="mt-4 flex justify-end gap-2">
        <Link to="new">
          <Button startIcon={<Edit />} variant="contained">
            Create new Quizz
          </Button>
        </Link>
        <Link to="">
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            <span className="hidden md:inline">Delete Bulk</span>
          </Button>
        </Link>
      </div>
      <QuizzList />
    </>
  );
};

export default Quizz;
