import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ImportButton = ({ title = 'Import' }) => {
  return (
    <Button startIcon={<ArrowUpwardIcon />} variant="outlined">
      {title}
    </Button>
  );
};

export default ImportButton;
