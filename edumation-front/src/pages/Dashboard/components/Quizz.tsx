import React from 'react';
import QuizzList from './quizz/QuizzList';
import { Button } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const Quizz: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Quizz</h1>

      <div className="mt-4 flex justify-end">
        <Link to="new">
          <Button startIcon={<Edit />} variant="contained">
            Create new Quizz
          </Button>
        </Link>
      </div>
      <QuizzList />
    </>
  );
};

export default Quizz;
