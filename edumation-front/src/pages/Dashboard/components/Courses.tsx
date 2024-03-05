import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Edit from '@mui/icons-material/Edit';
import SearchBar from '../../../components/ui/SearchBar';
import CoursesList from './courses/CourseList';
import { CoursesProvider } from '../../../context/CourseContext';

const Courses: React.FC = () => {
  const [filter, setFilter] = useState('');

  return (
    <>
      <CoursesProvider>
        <div className="mt-4 flex justify-end gap-4">
          <SearchBar onFilterChange={setFilter} />
          <Link to="new">
            <Button startIcon={<Edit />} variant="contained">
              Create new Course
            </Button>
          </Link>
        </div>
        <CoursesList filter={filter} />
      </CoursesProvider>
    </>
  );
};

export default Courses;
