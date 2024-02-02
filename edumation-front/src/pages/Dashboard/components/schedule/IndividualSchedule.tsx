import Calendar from './Calendar';
import ScheduleSkeleton from '../../../../components/ui/skeletons/ScheduleSkeleton';
import { useEffect, useState } from 'react';
import { Schedule } from '../../../../services/Types';
import SchedulesService from '../../../../services/SchedulesService';
import { toast } from 'react-toastify';
import BackButton from '../../../../components/ui/BackButton';

const IndividualSchedule = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        //Change this to get individual schedule
        const response = await SchedulesService.getAllSchedules();
        setSchedules(response.data);
      } catch (error) {
        toast.error('Failed to fetch schedules');
      }
      setLoading(false);
    };

    fetchSchedule();
  }, []);
  const events: Event[] = [];

  const fromAPItoDates = () => {
    {
      schedules.map((schedule) => {
        {
          schedule.classTimes.map((classTime) => {
            events.push({ date: classTime.date, title: schedule.courseId });
          });
        }
      });
    }
  };
  fromAPItoDates();

  if (loading) return <ScheduleSkeleton />;

  return (
    <>
      <BackButton />
      <h1 className="text-2xl my-4 font-semibold">Schedule</h1>
      <Calendar events={events} />
    </>
  );
};

export default IndividualSchedule;
