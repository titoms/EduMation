import { useEffect, useState } from 'react';
import SearchBar from '../../../../components/ui/SearchBar';
import { User } from '../../../../services/Types';
import UsersService from '../../../../services/UsersService';
import {
  FormControl,
  FormGroup,
  FormHelperText,
  Grid,
  Skeleton,
} from '@mui/material';
import StudentCheckbox from './StudentCheckbox';

interface StudentTransferProps {
  onSelectedStudentsChange: (selectedStudents: User[]) => void;
}

const StudentTransfer: React.FC<StudentTransferProps> = ({
  onSelectedStudentsChange,
}) => {
  const [filter, setFilter] = useState('');
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkedStatus, setCheckedStatus] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await UsersService.getAllUsers();
        const studentData = response.data.filter(
          (user) => user.role === 'student'
        );
        setStudents(studentData);
        setLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(
          error.message
            ? error.message
            : 'An error occurred while fetching students.'
        );
        setLoading(false);
      }
    };

    fetchStudents();
  }, [filter]);

  const handleStudentChange = (isChecked: boolean, student: User) => {
    setCheckedStatus((prev) => ({ ...prev, [student._id]: isChecked }));
  };

  const filteredStudents = filter
    ? students.filter((student) =>
        student.name.toLowerCase().includes(filter.toLowerCase())
      )
    : students;

  useEffect(() => {
    const selectedStudents = students.filter(
      (student) => checkedStatus[student._id]
    );
    onSelectedStudentsChange(selectedStudents);
  }, [checkedStatus, students, onSelectedStudentsChange]);

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
    <>
      <div className="w-full rounded-lg bg-blue-100 pt-4 mt-4">
        <SearchBar onFilterChange={setFilter} />
        <div className="p-4 pt-0 mx-2 mt-2">
          <FormControl component="fieldset" error={true} variant="standard">
            <FormGroup>
              {filteredStudents.map((student) => (
                <StudentCheckbox
                  key={student._id}
                  student={student}
                  onChange={handleStudentChange}
                />
              ))}
            </FormGroup>
            <FormHelperText>Please select at least 1 student</FormHelperText>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default StudentTransfer;
