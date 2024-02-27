import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ScheduleSkeleton from '../../../../components/ui/skeletons/ScheduleSkeleton';
import { MyEvent, Schedule } from '../../../../services/Types';
import SchedulesService from '../../../../services/SchedulesService';
import BackButton from '../../../../components/ui/BackButton';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { useThemeContext } from '../../../../context/ThemeContext';
import CalendarActions from './CalendarActions';
import EditEventModal from './EditEventModal';

const DnDCalendar = withDragAndDrop(Calendar);

const IndividualSchedule = () => {
  const { id: scheduleId } = useParams<{ id: string }>();
  const { mode } = useThemeContext();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<MyEvent | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const localizer = dayjsLocalizer(dayjs);

  useEffect(() => {
    const fetchAndUpdateSchedule = async () => {
      setLoading(true);
      try {
        const { data } = await SchedulesService.getScheduleById(scheduleId);
        setSchedule(data);
        const mappedEvents =
          data.events?.map((event) => ({
            start: new Date(event.start),
            end: new Date(event.end),
            title: event.title,
            location: event.location,
          })) || [];
        setEvents(mappedEvents);
      } catch (error) {
        toast.error('Failed to fetch schedule details');
      } finally {
        setLoading(false);
      }
    };

    if (scheduleId) fetchAndUpdateSchedule();
  }, [scheduleId]);

  const handleEventChange = async (
    updatedEvent: MyEvent,
    originalEvent: MyEvent
  ) => {
    const updatedEvents = events.map((event) =>
      event === originalEvent ? { ...updatedEvent } : event
    );
    setEvents(updatedEvents);
    try {
      await SchedulesService.updateSchedule(scheduleId, {
        events: updatedEvents,
      });
      toast.success('Schedule updated successfully');
    } catch (error) {
      toast.error('Failed to update schedule');
    }
  };

  if (loading) return <ScheduleSkeleton />;

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
            style={
              mode === 'light'
                ? { color: '#000', padding: '10px', borderRadius: '5px' }
                : { color: '#fff', padding: '10px', borderRadius: '5px' }
            }
            localizer={localizer}
            events={events}
            resizable
            selectable
            onEventDrop={({ event, start, end }) =>
              handleEventChange({ ...event, start, end }, event)
            }
            onEventResize={({ event, start, end }) =>
              handleEventChange({ ...event, start, end }, event)
            }
            onDoubleClickEvent={setEditingEvent}
            onSelectSlot={({ start, end }) => {
              const title = window.prompt('New Event title');
              if (title) setEvents([...events, { start, end, title }]);
            }}
            draggableAccessor={() => true}
          />
        </div>
      </div>
      {isEditModalOpen && (
        <EditEventModal
          event={editingEvent}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={(editedEvent) => {
            handleEventChange(editedEvent, editingEvent);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default IndividualSchedule;
