import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { School } from '../../../services/Types';
import SchoolsService from '../../../services/SchoolsService';
import { Button } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import SearchBar from '../../../components/ui/SearchBar';
import SchoolsList from './school/SchoolsList';
import UserSkeleton from '../../../components/ui/skeletons/UserSkeleton';

const Schools: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [filteredSchools, setFilteredSchools] = useState(schools);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await SchoolsService.getAllSchools();
        setSchools(response.data);
        const result = schools.filter((school) =>
          school.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredSchools(result);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data);
        } else {
          setError('An error occurred while fetching schools.');
        }
        setLoading(false);
      }
    };
    fetchSchools();
  }, [filter, schools]);

  if (loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="mt-4 flex justify-end gap-2">
        <SearchBar onFilterChange={setFilter} />
        <Link to="new">
          <Button startIcon={<Edit />} variant="contained">
            Create new School
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        <SchoolsList schools={filteredSchools} />
      </div>
    </>
  );
};

export default Schools;
