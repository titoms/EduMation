import ClassesList from './classes/ClassesList';
import { ClassProvider } from '../../../context/ClassContext';

const Classes = () => {
  return (
    <>
      <ClassProvider>
        <ClassesList />
      </ClassProvider>
    </>
  );
};

export default Classes;
