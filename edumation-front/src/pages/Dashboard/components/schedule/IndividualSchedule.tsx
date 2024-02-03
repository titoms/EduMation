import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ScheduleSkeleton from '../../../../components/ui/skeletons/ScheduleSkeleton';
import Calendar from './Calendar';
import { Schedule } from '../../../../services/Types';
import SchedulesService from '../../../../services/SchedulesService';
import CoursesService from '../../../../services/CoursesService';
import BackButton from '../../../../components/ui/BackButton';

const IndividualSchedule = () => {
  const params = useParams<{ id: string }>();
  const scheduleId = params.id || '';
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [courseName, setCourseName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchScheduleAndCourse = async () => {
      if (!scheduleId) {
        toast.error('Schedule ID is undefined');
        setLoading(false);
        return;
      }

      try {
        const scheduleResponse = await SchedulesService.getScheduleById(
          scheduleId
        );
        setSchedule(scheduleResponse.data);

        if (scheduleResponse.data.courseId) {
          const courseResponse = await CoursesService.getCoursesById(
            scheduleResponse.data.courseId
          );
          setCourseName(courseResponse.data.title);
        }
      } catch (error) {
        toast.error('Failed to fetch schedule or course details');
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleAndCourse();
  }, [scheduleId]);

  const events =
    schedule?.classTimes.map((classTime) => ({
      date: new Date(classTime.date),
      title: courseName,
      eventType: 'availableEvent' as
        | 'availableEvent'
        | 'notAvailableEvent'
        | 'otherEvent',
    })) || [];

  if (loading) return <ScheduleSkeleton />;

  return (
    <>
      <BackButton />
      <h1 className="text-2xl my-4 font-semibold">Schedule for {courseName}</h1>
      <Calendar events={events} />
    </>
  );
};

export default IndividualSchedule;
