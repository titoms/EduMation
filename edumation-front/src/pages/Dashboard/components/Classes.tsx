import { useState, useEffect } from 'react';
import axios from 'axios';
import { Group } from '../../../services/Types';
import ClassesService from '../../../services/ClassesService';
import { Grid, Skeleton } from '@mui/material';

const Classes = () => {
  const [classes, setClasses] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await ClassesService.getAllGroups();
        setClasses(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data);
        } else {
          setError('An error occurred while fetching classes.');
        }
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <>
        <Skeleton variant="text" height={60} />
        <Grid container spacing={2} className="mb-4 w-full">
          <Grid item xs={12} md={6} xl={4}>
            <Skeleton variant="rounded" height={300} />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Skeleton variant="rounded" height={300} />
          </Grid>
        </Grid>
      </>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      {classes.map((group) => (
        <div key={group._id} className="bg-white shadow rounded-lg p-6 mb-4">
          <h2 className="text-xl font-bold mb-4">{group.name}</h2>
          <div className="mb-4">
            <strong>Group ID:</strong> {group._id}
          </div>
          <div className="mb-4">
            <strong>School ID:</strong> {group.schoolId}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Students:</h3>
            {group.studentsIds.map((student) => (
              <div key={student._id} className="mb-2 border-b pb-2">
                <img
                  className="w-12 h-12 rounded-full mr-2 inline"
                  src={student.profileImage}
                  alt={student.name}
                />
                <div className="inline-block">
                  <div>
                    <strong>Name:</strong> {student.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {student.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Classes;
