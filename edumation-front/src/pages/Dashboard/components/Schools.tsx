import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { School } from '../../../services/Types';
import SchoolsService from '../../../services/SchoolsService';
import { Button, Grid, IconButton, Skeleton } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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

  if (loading) {
    return (
      <>
        <Skeleton variant="text" height={60} />
        <Grid container spacing={2} className="mb-4 w-full">
          <Grid item xs={12} md={6} xl={4}>
            <Skeleton variant="rounded" height={250} />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Skeleton variant="rounded" height={250} />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Skeleton variant="rounded" height={250} />
          </Grid>
        </Grid>
      </>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1 className="text-2xl font-semibold">Schools</h1>
      <div className="mt-4 flex justify-end">
        <div className="ml-2">
          <IconButton aria-label="Search...">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </IconButton>
          <input
            type="text"
            placeholder="Filter users..."
            className="px-3 py-2 mr-4 border rounded-full"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <Link to="new">
          <Button startIcon={<Edit />} variant="contained">
            Create new School
          </Button>
        </Link>
      </div>
      <div className="h-screen mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchools.map((school) => (
            <div key={school._id} className="w-full">
              <div className="bg-white rounded-lg overflow-hidden mb-10">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-01.jpg"
                  alt="image"
                  className="w-full"
                />
                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3>
                    <NavLink
                      to="#"
                      className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                    >
                      {school.name}
                    </NavLink>
                  </h3>
                  <p className="text-base text-body-color leading-relaxed mb-7">
                    {school.address}
                  </p>
                  <div className="text-sm">
                    <p className="mt-2">{school.contactInfo.phone}</p>
                    <p className="mt-2">{school.contactInfo.email}</p>
                    <p className="mt-2">
                      <a href={school.contactInfo.website}>
                        {school.contactInfo.website}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Schools;
