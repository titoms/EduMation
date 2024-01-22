import ClassesList from './classes/ClassesList';
import ClassCreation from './classes/ClassCreation';

const Classes = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Classes</h1>
      <ClassCreation />
      <ClassesList />
    </>
  );
};

export default Classes;
