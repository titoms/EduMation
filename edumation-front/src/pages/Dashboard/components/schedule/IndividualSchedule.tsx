import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ScheduleSkeleton from '../../../../components/ui/skeletons/ScheduleSkeleton';
import { MyEvent, Schedule } from '../../../../services/Types';
import SchedulesService from '../../../../services/SchedulesService';
import BackButton from '../../../../components/ui/BackButton';
import { Calendar, dayjsLocalizer, SlotInfo } from 'react-big-calendar';
import withDragAndDrop, {
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';
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
        const fetchedEvents =
          scheduleResponse.data.events?.map((event) => ({
            start: new Date(event.start),
            end: new Date(event.end),
            title: event.title,
            location: event.location,
          })) || [];
        setEvents(fetchedEvents);
      } catch (error) {
        toast.error('Failed to fetch schedule details');
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [scheduleId]);

  const handleSelectSlot = async ({ start, end }: MyEvent) => {
    const title = window.prompt('New Event title');
    if (title) {
      setEvents((prevEvents) => [...prevEvents, { start, end, title }]);
    }
  };

  const handleUpdateEvent = async ({ event, start, end }: MyEvent) => {
    const updatedEvent = { ...event, start, end };
    setEvents((prevEvents) =>
      prevEvents.map((evt) => (evt === event ? updatedEvent : evt))
    );
  };

  const handleEventResize = async ({ event, start, end }: MyEvent) => {
    const updatedEvent = { ...event, start, end };
    setEvents((prevEvents) =>
      prevEvents.map((evt) => (evt === event ? updatedEvent : evt))
    );
  };

  const handleDoubleClickEvent = (event: MyEvent) => {
    setEditingEvent(event);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = (editedEvent: MyEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((evt) => (evt === editingEvent ? editedEvent : evt))
    );
    setIsEditModalOpen(false);
    updateEventInBackend();
  };

  const updateEventInBackend = async () => {
    try {
      await SchedulesService.updateSchedule(scheduleId, { events });
    } catch (error) {
      toast.error('Failed to update schedule');
    }
  };

  useEffect(() => {
    const updateBackend = async () => {
      if (events.length > 0) {
        await updateEventInBackend();
      }
    };
    updateBackend();
  }, [events]);

  if (loading) return <ScheduleSkeleton />;

  const componentStyle =
    mode === 'light'
      ? {
          color: '#000',
          padding: '10px',
          borderRadius: '5px',
        }
      : {
          color: '#fff',
          padding: '10px',
          borderRadius: '5px',
        };

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
            className="mt-4"
            style={componentStyle}
            localizer={localizer}
            events={events}
            resizable
            selectable
            onEventDrop={handleUpdateEvent}
            onEventResize={handleEventResize}
            onDoubleClickEvent={handleDoubleClickEvent}
            onSelectSlot={handleSelectSlot}
            draggableAccessor={() => true}
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
