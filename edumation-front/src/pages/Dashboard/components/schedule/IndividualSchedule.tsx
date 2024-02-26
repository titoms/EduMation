import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ScheduleSkeleton from '../../../../components/ui/skeletons/ScheduleSkeleton';
import { ClassTime, Schedule } from '../../../../services/Types';
import SchedulesService from '../../../../services/SchedulesService';
import CoursesService from '../../../../services/CoursesService';
import BackButton from '../../../../components/ui/BackButton';
import {
  Calendar,
  dayjsLocalizer,
  Event as CalendarEvent,
  SlotInfo,
  EventInteractionArgs,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { useThemeContext } from '../../../../context/ThemeContext';
import CalendarActions from './CalendarActions';
import EditEventModal from './EditEventModal';

const DnDCalendar = withDragAndDrop(Calendar);

interface MyEvent {
  start: Date;
  end: Date;
  title: string;
}

const IndividualSchedule = () => {
  const params = useParams<{ id: string }>();
  const scheduleId = params.id || '';
  const { mode } = useThemeContext();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [courseName, setCourseName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const localizer = dayjsLocalizer(dayjs);
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<MyEvent | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
        const courseResponse = await CoursesService.getCoursesById(
          // Change this to courses
          scheduleResponse.data.courseId
        );
        setSchedule(scheduleResponse.data);
        setCourseName(courseResponse.data.title);

        const boundaryDates = getBoundaryDates(
          scheduleResponse.data.classTimes || []
        );
        setEvents([
          {
            start: boundaryDates.start,
            end: boundaryDates.end,
            title: courseName,
          },
        ]);
      } catch (error) {
        toast.error('Failed to fetch schedule or course details');
      } finally {
        setLoading(false);
      }
    };
    console.log(events);
    fetchScheduleAndCourse();
  }, [scheduleId, courseName]);

  const getBoundaryDates = (classTimes: ClassTime[] = []) => {
    if (classTimes.length === 0) return { start: new Date(), end: new Date() };

    const sortedDates = classTimes
      .map((ct) => new Date(ct.date))
      .sort((a, b) => a.getTime() - b.getTime());
    return { start: sortedDates[0], end: sortedDates[sortedDates.length - 1] };
  };

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    const title = window.prompt('New Event title');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  const updateEventInBackend = async (updatedEvent) => {
    try {
      await SchedulesService.updateSchedule(scheduleId, updatedEvent);
      console.log(schedule);
      toast.success('Event updated successfully');
    } catch (error) {
      toast.error('Failed to update event');
    }
  };

  const handleUpdateEvent = async ({
    event,
    start,
    end,
  }: EventInteractionArgs<MyEvent>) => {
    const updatedEvent = { ...event, start, end };
    await updateEventInBackend(updatedEvent);
    setEvents(events.map((evt) => (evt === event ? updatedEvent : evt)));
  };

  const handleEventResize = async ({
    event,
    start,
    end,
  }: EventInteractionArgs<MyEvent>) => {
    const updatedEvent = { ...event, start, end };
    await updateEventInBackend(updatedEvent);
    setEvents(events.map((evt) => (evt === event ? updatedEvent : evt)));
  };

  const handleDoubleClickEvent = (event: MyEvent) => {
    setEditingEvent(event);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = (editedEvent: MyEvent) => {
    const updatedEvents = events.map((evt) =>
      evt === editingEvent ? editedEvent : evt
    );
    setEvents(updatedEvents);
    setIsEditModalOpen(false);
  };

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
      <div className="h-100">
        <BackButton />
        <h1 className="text-2xl my-4 font-semibold">
          Schedule for {courseName}
        </h1>
        <div className="h-screen">
          <CalendarActions />
          <DnDCalendar
            style={componentStyle}
            localizer={localizer}
            className="my-4"
            events={events}
            resizable
            selectable
            onDoubleClickEvent={handleDoubleClickEvent}
            onSelectSlot={handleSelectSlot}
            onEventDrop={handleUpdateEvent}
            onEventResize={handleEventResize}
            draggableAccessor={(event) => true}
          />
        </div>
      </div>
      {isEditModalOpen && (
        <EditEventModal
          event={editingEvent}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleSubmitEdit}
        />
      )}
    </>
  );
};

export default IndividualSchedule;
