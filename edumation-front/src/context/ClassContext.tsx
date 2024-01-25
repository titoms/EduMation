import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import ClassesService from '../services/ClassesService';
import { toast } from 'react-toastify';
import { Group } from '../services/Types';

interface ClassContextType {
  groups: Group[];
  refetchGroups: () => void;
}

export const ClassContext = createContext<ClassContextType | null>(null);

export const ClassProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const fetchGroups = async () => {
    try {
      const response = await ClassesService.getAllGroups();
      setGroups(response.data);
    } catch (error) {
      toast.error('Failed to fetch classes');
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const refetchGroups = () => {
    fetchGroups();
  };

  return (
    <ClassContext.Provider value={{ groups, refetchGroups }}>
      {children}
    </ClassContext.Provider>
  );
};

export function useClassContext() {
  const context = useContext(ClassContext);

  if (context === null) {
    throw new Error('useClassContext must be used within a ClassProvider');
  }

  return context;
}
