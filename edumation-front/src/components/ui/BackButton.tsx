import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const BackButton = ({ title = 'Back', icon = true }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <>
      <Button
        startIcon={icon ? <ArrowBackIosIcon /> : null}
        onClick={goBack}
        variant="outlined"
        color="primary"
        className=""
      >
        {title}
      </Button>
    </>
  );
};

export default BackButton;
