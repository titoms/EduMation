// TeacherSelect.tsx
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';
import UsersService from '../../../../services/UsersService';
import { User } from '../../../../services/Types';

interface TeacherSelectProps {
  onChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
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
      <InputLabel id={`${name}-label`}>Teacher</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        value={value}
        onChange={onChange}
        name={name}
      >
        {loading ? (
          <MenuItem value="">
            <em>Loading...</em>
          </MenuItem>
        ) : (
          teachers.map((teacher) => (
            <MenuItem key={teacher._id} value={teacher._id}>
              {teacher.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default TeacherSelect;
