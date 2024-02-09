import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import CoursesService from '../services/CoursesService';
import { toast } from 'react-toastify';
import { Course } from '../services/Types';

interface CourseContextType {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}
export const CoursesContext = createContext<CourseContextType | null>(null);

export const CoursesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await CoursesService.getAllCourses();
        setCourses(response.data);
      } catch (error) {
        toast.error('Failed to fetch Courses');
      }
    };

    fetchCourses();
  }, []);

  return (
    <CoursesContext.Provider value={{ courses, setCourses }}>
      {children}
    </CoursesContext.Provider>
  );
};

export function useCoursesContext() {
  const users = useContext(CoursesContext);

  if (users === undefined) {
    throw new Error('UseCoursesContext mush be used with a UserProvider');
  }
  return users;
}
