import { Checkbox, FormControlLabel } from '@mui/material';
import { useRef } from 'react';
import { User } from '../../../../services/Types';

interface StudentCheckboxProps {
  student: User;
  onChange: (isChecked: boolean, student: User) => void;
}

const StudentCheckbox: React.FC<StudentCheckboxProps> = ({
  student,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked, student);
  };

  const checkboxRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <p className="text-xl mt-2 font hover:text-blue-600 overflow-hidden">
        <FormControlLabel
          control={<Checkbox inputRef={checkboxRef} onChange={handleChange} />}
          label={student.name + ' - ' + student.email}
        />
      </p>
    </>
  );
};

export default StudentCheckbox;
