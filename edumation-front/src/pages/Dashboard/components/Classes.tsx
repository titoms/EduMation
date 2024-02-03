import ClassesList from './classes/ClassesList';
import { ClassProvider } from '../../../context/ClassContext';

const Classes = () => {
  return (
    <>
      <ClassProvider>
        <h1 className="text-2xl font-semibold">Classes</h1>
        <ClassesList />
      </ClassProvider>
    </>
  );
};

export default Classes;
