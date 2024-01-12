import React, { useState, useEffect } from 'react';
import axios from 'axios';

type School = {
  _id: string;
  name: string;
  address: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
};

const Schools: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schools', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSchools(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data);
        } else {
          setError('An error occurred while fetching schools.');
        }
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1 className="text-2xl font-semibold">Schools</h1>
      <div className="h-screen mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schools.map((school) => (
            <div key={school._id} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold">{school.name}</h3>
              <p className="text-bold mt-4">{school.address}</p>
              <div className="text-sm">
                <p className="mt-2">{school.contactInfo.phone}</p>
                <p className="mt-2">{school.contactInfo.email}</p>
                <p className="mt-2">
                  <a href={school.contactInfo.website}>
                    {school.contactInfo.website}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Schools;
