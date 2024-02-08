import { useEffect, useState } from 'react';
import UsersService from '../../../../services/UsersService';
import { toast } from 'react-toastify';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { User } from '../../../../services/Types';

interface TeacherSelectProps {
  onChange: (event: SelectChangeEvent) => void;
  value: string;
  name: string;
}

const TeacherSelect: React.FC<TeacherSelectProps> = ({
  onChange,
  value,
  name,
}) => {
  const [teachers, setTeachers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await UsersService.getAllUsers();
        const filteredTeachers = response.data.filter(
          (user) => user.role === 'teacher'
        );
        setTeachers(filteredTeachers);
      } catch (error) {
        toast.error('Failed to fetch teachers');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="teacher-select-label">Teacher</InputLabel>
      <Select
        labelId="teacher-select-label"
        id="teacher-select"
        value={value}
        onChange={onChange}
        name={name}
      >
        {loading ? (
          <MenuItem value="" disabled>
            Loading...
          </MenuItem>
        ) : (
          teachers.map((teacher) => (
            <MenuItem key={teacher._id} value={teacher._id}>
              {teacher.name} - {teacher.email}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default TeacherSelect;
