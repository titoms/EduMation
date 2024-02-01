import ClassesList from './classes/ClassesList';
import { ClassProvider } from '../../../context/ClassContext';

const Classes = () => {
  return (
    <div className="h-screen">
      <ClassProvider>
        <h1 className="text-2xl font-semibold">Classes</h1>
        <ClassesList />
      </ClassProvider>
    </div>
  );
};

export default Classes;
