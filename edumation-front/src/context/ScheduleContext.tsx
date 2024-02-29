import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import SchedulesService from '../services/SchedulesService';
import { toast } from 'react-toastify';
import { Schedule } from '../services/Types';

interface ScheduleContextType {
  schedules: Schedule[];
  setSchedule: React.Dispatch<React.SetStateAction<Schedule[]>>;
}
export const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const ScheduleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [schedules, setSchedule] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await SchedulesService.getAllSchedules();
        setSchedule(response.data);
      } catch (error) {
        toast.error('Failed to fetch schedules');
      }
    };

    fetchSchedules();
  }, []);

  return (
    <ScheduleContext.Provider value={{ schedules, setSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export function useScheduleContext() {
  const schedules = useContext(ScheduleContext);

  if (schedules === undefined) {
    throw new Error('UseScheduleContext mush be used with a ScheduleProvider');
  }
  return schedules;
}
