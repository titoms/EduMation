import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';

interface SearchBarProps {
  onFilterChange: (filterValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilterChange }) => {
  return (
    <div className="ml-2">
      <IconButton aria-label="Search...">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </IconButton>
      <input
        type="text"
        id="classSearchBar"
        placeholder="Filter users..."
        className="px-3 py-2 border rounded-full"
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
