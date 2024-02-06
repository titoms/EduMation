// Courses.tsx
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Edit from '@mui/icons-material/Edit';
import SearchBar from '../../../components/ui/SearchBar';
import CoursesList from './courses/CourseList';

const Courses: React.FC = () => {
  const [filter, setFilter] = useState('');

  return (
    <>
      <h1 className="text-2xl font-semibold">Courses</h1>
      <div className="mt-4 flex justify-end gap-4">
        <SearchBar onFilterChange={setFilter} />
        <Link to="new">
          <Button startIcon={<Edit />} variant="contained">
            Create new Course
          </Button>
        </Link>
      </div>
      <CoursesList filter={filter} />
    </>
  );
};

export default Courses;
