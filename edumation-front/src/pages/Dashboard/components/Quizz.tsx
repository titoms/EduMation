import React, { useState } from 'react';
import QuizzList from './quizz/QuizzList';
import { Button } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from '../../../components/ui/SearchBar';

const Quizz: React.FC = () => {
  const [filter, setFilter] = useState('');

  return (
    <>
      <div className="mt-4 flex justify-end gap-2">
        <SearchBar onFilterChange={setFilter} />
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
      <QuizzList filter={filter} />
    </>
  );
};

export default Quizz;
