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
  const [updateTrigger, setUpdateTrigger] = useState(0);

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
  }, [groupId, updateTrigger]);

  const handleUpdateGroup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (classData) {
      try {
        const updatedGroup = {
          ...classData,
          studentsIds: updatedStudents,
        };
        const response = await ClassesService.updateGroup(
          groupId,
          updatedGroup
        );
        toast.success('Class updated successfully');
        setUpdateTrigger((prev) => prev + 1);
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
      <div className="bg-gray-200 dark:bg-slate-800 p-4 rounded-xl mt-4">
        <h2 className="text-2xl font-semibold">{classData.name}</h2>

        <form onSubmit={handleUpdateGroup}>
          <div className="my-2">
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
          <div className="flex flex-col md:flex-row justify-around gap-8">
            <div className="w-full">
              {' '}
              <h3 className="font-semibold my-4">Students:</h3>
              {classData.studentsIds.length > 0 ? (
                classData.studentsIds.map((student) => (
                  <div
                    key={student._id}
                    className="my-8 border-b border-b-gray-400 pb-2"
                  >
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
            </div>
            <div className="w-full">
              <h3 className="font-semibold my-4">Edit Students:</h3>
              <StudentTransfer
                initialStudents={classData?.studentsIds}
                onNewClassStudentsChange={handleNewClassStudentsChange}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <BackButton title="Cancel" icon={false} />
            <Button type="submit" variant="contained" startIcon={<Edit />}>
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default IndividualClass;
