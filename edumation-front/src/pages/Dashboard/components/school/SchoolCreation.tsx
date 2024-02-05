import { useState } from 'react';
import BackButton from '../../../../components/ui/BackButton';
import SchoolsService from '../../../../services/SchoolsService';
import { Button, TextField } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';

const SchoolCreation = () => {
  const [createSchoolData, setCreateSchoolData] = useState({
    name: '',
    address: '',
    contactInfo: {
      phone: '',
      email: '',
      website: '',
    },
  });

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' || name === 'email' || name === 'website') {
      setCreateSchoolData((prevState) => ({
        ...prevState,
        contactInfo: {
          ...prevState.contactInfo,
          [name]: value,
        },
      }));
    } else {
      setCreateSchoolData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCreateSchool = async (event) => {
    event.preventDefault();
    try {
      const response = await SchoolsService.createSchools(createSchoolData);
      console.log('School created successfully:', response.data);
    } catch (error) {
      console.error('Error creating school:', error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <BackButton />
      </div>
      <h1 className="text-2xl font-semibold">Create new School</h1>
      <form onSubmit={handleCreateSchool}>
        <div className="bg-gray-200 shadow-md w-full flex justify-center rounded-lg p-8">
          <div className="max-w-md w-full space-y-6">
            <div className="mx-auto max-w-md space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold">School Settings :</h2>
                <p className="text-gray-500">Enter the School details</p>
              </div>
              <TextField
                id="schoolName"
                label="School Name"
                variant="outlined"
                name="name"
                fullWidth
                onChange={handleDataChange}
              />
              <TextField
                id="schoolAddress"
                label="School Address"
                name="address"
                variant="outlined"
                fullWidth
                onChange={handleDataChange}
              />
              <MuiTelInput
                value={createSchoolData.contactInfo.phone}
                onChange={(value) =>
                  handleDataChange({ target: { name: 'phone', value } })
                }
                fullWidth
              />
              <TextField
                id="schoolEmail"
                label="School Email"
                name="email"
                variant="outlined"
                fullWidth
                onChange={handleDataChange}
              />
              <TextField
                id="schoolWebsite"
                label="School Website"
                name="website"
                variant="outlined"
                fullWidth
                onChange={handleDataChange}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-end mt-8">
          <Button type="submit" variant="contained">
            Create
          </Button>
          <BackButton title="Cancel" icon={false} />
        </div>
      </form>
    </>
  );
};

export default SchoolCreation;
