import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ScheduleSkeleton from '../../../../components/ui/skeletons/ScheduleSkeleton';
import { ClassTime, Schedule } from '../../../../services/Types';
import SchedulesService from '../../../../services/SchedulesService';
import CoursesService from '../../../../services/CoursesService';
import BackButton from '../../../../components/ui/BackButton';
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

  const getBoundaryDates = (classTimes: ClassTime[] = []) => {
    if (classTimes.length === 0) return { start: new Date(), end: new Date() };

    const sortedDates = classTimes
      .map((ct) => new Date(ct.date))
      .sort((a, b) => a.getTime() - b.getTime());
    return { start: sortedDates[0], end: sortedDates[sortedDates.length - 1] };
  };

  const boundaryDates = schedule
    ? getBoundaryDates(schedule.classTimes || [])
    : { start: new Date(), end: new Date() };

  const events = [
    {
      start: boundaryDates.start,
      end: boundaryDates.end,
      title: courseName,
    },
  ];

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
      <div className="h-screen">
        <DnDCalendar
          style={componentStyle}
          localizer={localizer}
          className="my-4"
          events={events}
          draggableAccessor={(event) => true}
        />
      </div>
    </>
  );
};

export default IndividualSchedule;
