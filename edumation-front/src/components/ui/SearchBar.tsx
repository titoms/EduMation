import { InputBase, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onFilterChange: (filterValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilterChange }) => {
  return (
    <Paper
      component="form"
      sx={{
        bgcolor: '#fff',
        display: 'flex',
        alignItems: 'center',
        width: 300,
        height: 35,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'Search bar' }}
        onChange={(e) => onFilterChange(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
