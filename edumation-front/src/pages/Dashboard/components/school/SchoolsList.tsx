import { School } from '../../../../services/Types';
import SchoolCard from './SchoolCard';

interface SchoolsListProps {
  schools: School[];
}

const SchoolsList: React.FC<SchoolsListProps> = ({ schools }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {schools.map((school) => (
        <SchoolCard key={school._id} school={school} />
      ))}
    </div>
  );
};

export default SchoolsList;
