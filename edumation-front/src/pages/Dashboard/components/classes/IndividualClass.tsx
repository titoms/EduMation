import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClassesService from '../../../../services/ClassesService';
import { Group } from '../../../../services/Types';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import StudentTransfer from './StudentTransfer';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import BackButton from '../../../../components/ui/BackButton';
import { toast } from 'react-toastify';

const IndividualClass: React.FC = () => {
  const params = useParams();
  const groupId = params.id!;
  const [classData, setClassData] = useState<Group | null>(null);
  const [updatedStudents, setUpdatedStudents] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await ClassesService.getGroupById(groupId);
        setClassData(response.data);
        setUpdatedStudents(
          response.data.studentsIds.map((student) => student._id)
        );
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
  }, [groupId]);

  const handleUpdateGroup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (classData) {
      try {
        const updatedGroup = {
          ...classData,
          studentsIds: updatedStudents,
        };
        console.log(updatedGroup);
        const response = await ClassesService.updateGroup(
          groupId,
          updatedGroup
        );
        console.log('Group updated successfully:', response.data);
        toast.success('Class updated successfully');
        //Rerender component instead of navigate
      } catch (error) {
        toast.error('Error updating group:', error);
      }
    }
  };

  const handleNewClassStudentsChange = (newStudentIds: string[]) => {
    setUpdatedStudents(newStudentIds);
  };

  if (!classData || loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <BackButton />
      <h2 className="text-2xl font-semibold my-4">{classData.name}</h2>

      <form onSubmit={handleUpdateGroup} className="mb-12">
        <div className="my-4">
          <TextField
            fullWidth
            margin="normal"
            label="Class Name"
            variant="outlined"
            name="name"
            value={classData?.name}
            onChange={(e) =>
              setClassData({ ...classData, name: e.target.value })
            }
          />
        </div>
        <h3 className="font-semibold my-4">Students:</h3>
        {classData.studentsIds.length > 0 ? (
          classData.studentsIds.map((student) => (
            <div key={student._id} className="my-8 border-b pb-2">
              <img
                className="w-12 h-12 rounded-full mr-2 inline"
                src={
                  student.profileImage
                    ? student.profileImage
                    : 'https://via.placeholder.com/150'
                }
                alt={student.name}
              />
              <div className="inline-block">
                <div className="ml-4 flex justify-around gap-8">
                  <p>
                    <strong>Name:</strong> {student.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {student.email}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center text-2xl text-gray-600 bg-gray-200 rounded-lg p-4">
            No students in this class...
          </h3>
        )}
        <h3 className="font-semibold my-4">Edit Students:</h3>
        <StudentTransfer
          initialStudents={classData?.studentsIds}
          onNewClassStudentsChange={handleNewClassStudentsChange}
        />
        <div className="mt-4">
          <Button
            type="submit"
            size="small"
            variant="contained"
            startIcon={<Edit />}
          >
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default IndividualClass;
