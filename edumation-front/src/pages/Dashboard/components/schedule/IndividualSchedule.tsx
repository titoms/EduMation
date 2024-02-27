import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ScheduleSkeleton from '../../../../components/ui/skeletons/ScheduleSkeleton';
import { MyEvent, Schedule } from '../../../../services/Types';
import SchedulesService from '../../../../services/SchedulesService';
import BackButton from '../../../../components/ui/BackButton';
import { Calendar, dayjsLocalizer, SlotInfo } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { useThemeContext } from '../../../../context/ThemeContext';
import CalendarActions from './CalendarActions';
import EditEventModal from './EditEventModal';

const DnDCalendar = withDragAndDrop(Calendar);

const IndividualSchedule = () => {
  const params = useParams<{ id: string }>();
  const scheduleId = params.id || '';
  const { mode } = useThemeContext();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const localizer = dayjsLocalizer(dayjs);
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<MyEvent | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchSchedule = async () => {
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
        const boundaryDates = getBoundaryDates(
          scheduleResponse.data.events || []
        );
        setEvents([
          {
            date: boundaryDates.date,
            start: boundaryDates.start,
            end: boundaryDates.end,
            title: 'test',
          },
        ]);
      } catch (error) {
        toast.error('Failed to fetch schedule or course details');
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [scheduleId]);

  const getBoundaryDates = (events: MyEvent[] = []) => {
    if (events.length === 0)
      return { date: new Date(), start: new Date(), end: new Date() };
    const sortedDates = events
      .map((ct) => new Date(ct.start))
      .sort((a, b) => a.getTime() - b.getTime());
    return {
      date: sortedDates[0],
      start: sortedDates[0],
      end: sortedDates[sortedDates.length - 1],
    };
  };

  const handleSelectSlot = ({ date, start, end }: SlotInfo) => {
    const title = window.prompt('New Event title');
    if (title) {
      setEvents([...events, { date, start, end, title }]);
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

  const updateEventInBackend = async (updatedEvent: MyEvent) => {
    // Convert updatedEvent to your Schedule format
    // This part depends on how your backend expects to receive the update
    // Example:
    try {
      const updatedSchedule = {
        ...schedule,
        events: events.map((event) => ({
          date: event.start,
          start: event.start,
          end: event.end,
          title: event.title ? event.title : '',
          location: event.location ? event.location : 'Location',
        })),
      };

      await SchedulesService.updateSchedule(scheduleId, updatedSchedule);
      toast.success('Schedule updated successfully');
    } catch (error) {
      toast.error('Failed to update schedule');
    }
  };

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

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
          Schedule for {scheduleId}
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
