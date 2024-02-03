import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfilePicDragAndDrop from '../../components/ProfilePicDragAndDrop';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileDrop = (file: File) => {
    setProfileImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('role', formData.role);
    if (profileImage) {
      formDataToSend.append('profileImage', profileImage);
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/register',
        formDataToSend
      );
      toast.success('Registration successful');
      navigate('/login');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data);
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  };

  const RoleSelection = () => {
    const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, role: event.target.value as string });
    };

    return (
      <>
        <Box sx={{ minWidth: 120, marginTop: 2, marginBottom: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="roleSelectionInputLabel">Role</InputLabel>
            <Select
              labelId="roleSelectionInputLabel"
              id="roleSelectionInput"
              required
              fullWidth
              value={formData.role}
              label="Role"
              onChange={handleChangeRole}
            >
              <MenuItem value={'student'}>Student</MenuItem>
              <MenuItem value={'teacher'}>Teacher</MenuItem>
              <MenuItem value={'school'}>School</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </>
    );
  };

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={logo} className="h-40 m-auto" alt="Logo" />
            <Typography component="h1" variant="h5">
              Create a new account :
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {errorMessage && (
                <p className="text-red-500 text-sm text-center">
                  {errorMessage}
                </p>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <RoleSelection />
              <ProfilePicDragAndDrop onFileDrop={handleFileDrop} />
              <FormControlLabel
                className="mt-4"
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
