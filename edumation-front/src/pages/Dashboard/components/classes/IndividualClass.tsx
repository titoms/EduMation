import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClassesService from '../../../../services/ClassesService';
import { Group } from '../../../../services/Types';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import StudentTransfer from '../../../../components/ui/draganddrop/StudentTransfer';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import BackButton from '../../../../components/ui/BackButton';

const IndividualClass: React.FC = () => {
  const params = useParams();
  const groupId = params.id!;
  const [classInfo, setClassInfo] = useState<Group | null>(null);
  const [updatedStudents, setUpdatedStudents] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await ClassesService.getGroupById(groupId);
        setClassInfo(response.data);
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
    if (classInfo) {
      try {
        const updatedGroup = {
          ...classInfo,
          studentsIds: updatedStudents,
        };
        const response = await ClassesService.updateGroup(
          groupId,
          updatedGroup
        );
        console.log('Group updated successfully:', response.data);
        navigate('/dashboard/classes/' + groupId);
      } catch (error) {
        console.error('Error updating group:', error);
      }
    }
  };

  const mergeStudents = (newStudentIds: string[]) => {
    const existingStudentIds =
      classInfo?.studentsIds.map((student) => student._id) || [];
    const mergedStudentIds = Array.from(
      new Set([...existingStudentIds, ...newStudentIds])
    );
    return mergedStudentIds;
  };

  const handleNewClassStudentsChange = (newStudentIds: string[]) => {
    console.log('Already present Student IDs:', newStudentIds);
    const mergedIds = mergeStudents(newStudentIds);
    console.log('Merged Student IDs:', mergedIds);
    setUpdatedStudents(mergedIds);
  };

  if (!classInfo || loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <BackButton />
      <h2 className="text-2xl font-semibold my-4">{classInfo.name}</h2>

      <form onSubmit={handleUpdateGroup}>
        <div className="my-4">
          <TextField
            fullWidth
            margin="normal"
            label="Class Name"
            variant="outlined"
            name="name"
            value={classInfo?.name}
            onChange={(e) =>
              setClassInfo({ ...classInfo, name: e.target.value })
            }
          />
        </div>
        <h3 className="font-semibold my-4">Students : </h3>
        {classInfo.studentsIds.length > 0 ? (
          classInfo.studentsIds.map((student) => (
            <div key={student._id} className="my-8 border-b pb-2">
              <img
                className="w-12 h-12 rounded-full mr-2 inline"
                src={student.profileImage}
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

        <h3 className="font-semibold my-4">Edit Students : </h3>
        <StudentTransfer
          initialStudents={classInfo?.studentsIds}
          onNewClassStudentsChange={handleNewClassStudentsChange}
        />
        <div className="mt-4">
          {' '}
          <Button
            type="submit"
            size="small"
            variant="contained"
            startIcon={<Edit />}
          >
            <span className="hidden md:inline">Update</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IndividualClass;
