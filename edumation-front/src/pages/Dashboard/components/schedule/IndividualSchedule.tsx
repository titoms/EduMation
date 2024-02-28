import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ScheduleSkeleton from '../../../../components/ui/skeletons/ScheduleSkeleton';
import { MyEvent, Schedule } from '../../../../services/Types';
import SchedulesService from '../../../../services/SchedulesService';
import BackButton from '../../../../components/ui/BackButton';
import {
  Calendar,
  dayjsLocalizer,
  SlotInfo,
  Event as CalendarEvent,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { useThemeContext } from '../../../../context/ThemeContext';
import CalendarActions from './CalendarActions';
import EditEventModal from './EditEventModal';

// Assuming EventInteractionArgs is imported correctly if needed
const DnDCalendar = withDragAndDrop(Calendar);

const IndividualSchedule = () => {
  const { id: scheduleId } = useParams<{ id: string }>();
  const { mode } = useThemeContext();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<MyEvent | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const localizer = dayjsLocalizer(dayjs);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!scheduleId) {
        toast.error('Schedule ID is undefined');
        setLoading(false);
        return;
      }

      try {
        const response = await SchedulesService.getScheduleById(scheduleId);
        setSchedule(response.data);
        const fetchedEvents =
          response.data.events?.map((event) => ({
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

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const title = window.prompt('New Event title');
    if (title) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { start: slotInfo.start, end: slotInfo.end, title },
      ]);
    }
  };

  const handleEventChange = (event: CalendarEvent, start: Date, end: Date) => {
    const updatedEvents = events.map((e) =>
      e === event ? { ...e, start, end } : e
    );
    setEvents(updatedEvents);
  };

  const handleDoubleClickEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = (editedEvent: MyEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((evt) => (evt === editingEvent ? editedEvent : evt))
    );
    setIsEditModalOpen(false);
    setEditingEvent(null);
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
            className="my-4"
            style={{
              color: mode === 'light' ? '#000' : '#fff',
              padding: '10px',
              borderRadius: '5px',
            }}
            localizer={localizer}
            events={events}
            onEventDrop={({ event, start, end }) =>
              handleEventChange(event, start, end)
            }
            onEventResize={({ event, start, end }) =>
              handleEventChange(event, start, end)
            }
            onDoubleClickEvent={handleDoubleClickEvent}
            onSelectSlot={handleSelectSlot}
            resizable
            selectable
          />
        </div>
      </div>
      {isEditModalOpen && editingEvent && (
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
