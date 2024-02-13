import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ScheduleSkeleton from '../../../../components/ui/skeletons/ScheduleSkeleton';
import { Schedule } from '../../../../services/Types';
import SchedulesService from '../../../../services/SchedulesService';
import CoursesService from '../../../../services/CoursesService';
import BackButton from '../../../../components/ui/BackButton';
import Calendar2 from './Calendar';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { useThemeContext } from '../../../../context/ThemeContext';
const DnDCalendar = withDragAndDrop(Calendar);

const IndividualSchedule = () => {
  const params = useParams<{ id: string }>();
  const scheduleId = params.id || '';
  const { mode } = useThemeContext();

  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [courseName, setCourseName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const localizer = dayjsLocalizer(dayjs);

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
  const events2 =
    schedule?.classTimes.map((classTime) => ({
      start: dayjs(classTime.date).toDate(),
      end: dayjs(classTime.date).toDate(),
      title: courseName,
    })) || [];
  console.log(events2);

  if (loading) return <ScheduleSkeleton />;

  const styles = {
    lightMode: {
      color: '#000',
      padding: '10px',
      borderRadius: '5px',
    },
    darkMode: {
      color: '#fff',
      padding: '10px',
      borderRadius: '5px',
    },
  };
  const componentStyle = mode === 'light' ? styles.lightMode : styles.darkMode;

  return (
    <>
      <BackButton />
      <h1 className="text-2xl my-4 font-semibold">Schedule for {courseName}</h1>
      <Calendar2 events={events} />
      <div className="h-screen">
        <DnDCalendar
          style={componentStyle}
          localizer={localizer}
          className="my-4"
          events={events2}
          draggableAccessor={(event) => true}
        />
      </div>
    </>
  );
};

export default IndividualSchedule;
