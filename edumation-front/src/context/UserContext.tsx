import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import UsersService from '../services/UsersService';
import { toast } from 'react-toastify';
import { User } from '../services/Types';

interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UsersService.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        toast.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const users = useContext(UserContext);

  if (users === undefined) {
    throw new Error('UseUserContext mush be used with a UserProvider');
  }
  return users;
}
