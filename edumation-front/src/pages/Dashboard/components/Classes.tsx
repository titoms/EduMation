import ClassesList from './classes/ClassesList';
import ClassCreation from './classes/ClassCreation';

const Classes = () => {
  return (
    <div className="p-2">
      <h1 className="text-2xl font-semibold">Classes</h1>
      <ClassCreation />
      <ClassesList />
    </div>
  );
};

export default Classes;
