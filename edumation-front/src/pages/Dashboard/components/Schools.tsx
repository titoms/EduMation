import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

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
            <div key={school._id} className="w-full px-4">
              <div className="bg-white rounded-lg overflow-hidden mb-10">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-01.jpg"
                  alt="image"
                  className="w-full"
                />
                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3>
                    <NavLink
                      to="#"
                      className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                    >
                      {school.name}
                    </NavLink>
                  </h3>
                  <p className="text-base text-body-color leading-relaxed mb-7">
                    {school.address}
                  </p>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Schools;
