import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersService from '../../../services/UsersService';
import { User } from '../../../services/Types';

const Students: React.FC = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await UsersService.getAllUsers();
        setStudents(response.data);

        const studentData = response.data.filter(
          (user: User) => user.role === 'student'
        );
        setStudents(studentData);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data);
        } else {
          setError('An error occurred while fetching students.');
        }
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1 className="text-2xl font-semibold">Students</h1>
      <div className="h-screen mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <div key={student._id} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold">{student.name}</h3>
              <p>Email: {student.email}</p>
              <p>Role: {student.role}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Students;
