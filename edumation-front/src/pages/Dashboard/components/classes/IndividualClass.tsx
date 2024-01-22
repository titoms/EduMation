// ClassInfo.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClassesService from '../../../../services/ClassesService';
import { Group } from '../../../../services/Types';
import axios from 'axios';
import { Button, Grid, Skeleton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ClassInfo: React.FC = () => {
  const params = useParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [classInfo, setClassInfo] = useState<Group | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await ClassesService.getGroupById(params.id!);
        setClassInfo(response.data);
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
  }, [params.id]);

  if (!classInfo) return <p>Loading...</p>;
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
    <div>
      <h2 className="font-semibold text-2xl">{classInfo.name}</h2>
      <div className="mt-4">
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button>
        <h3 className="text-lg font-bold my-4">Students:</h3>
        {classInfo.studentsIds.map((student) => (
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
  );
};

export default ClassInfo;
