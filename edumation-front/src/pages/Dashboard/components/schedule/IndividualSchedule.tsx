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
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';
import CreateEventModal from './CreateEventModal';
import PublishIcon from '@mui/icons-material/Publish';
import CalendarImport from './CalendarImport';
import DeleteConfirmationModal from '../../../../components/DeleteConfirmationModal';

const DnDCalendar = withDragAndDrop(Calendar);

const IndividualSchedule = () => {
  const { id: scheduleId } = useParams<{ id: string }>();
  const { mode } = useThemeContext();
  const [slotInfo, setSlotInfo] = useState<SlotInfo>();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<MyEvent | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const localizer = dayjsLocalizer(dayjs);
  const [tabValue, setTabValue] = React.useState('1');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

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
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
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
    setIsCreateModalOpen(true);
    setSlotInfo(slotInfo);
  };

  const handleCreateEventSubmit = (createdEvent: MyEvent) => {
    setEvents((prevEvents) => [...prevEvents, createdEvent]);
    setIsCreateModalOpen(false);
    updateScheduleBackend([...events, createdEvent]);
  };

  const handleEventChange = (updatedEvent: MyEvent, originalEvent: MyEvent) => {
    const updatedEvents = events.map((evt) =>
      evt === originalEvent ? updatedEvent : evt
    );
    setEvents(updatedEvents);
    updateScheduleBackend(updatedEvents);
  };

  const handleDoubleClickEvent = (event: MyEvent) => {
    setEditingEvent(event);
    setIsEditModalOpen(true);
  };

  const handleSubmitEvent = (editedEvent: MyEvent) => {
    const updatedEvents = events.map((evt) =>
      evt === editingEvent ? editedEvent : evt
    );
    setEvents(updatedEvents);
    setIsEditModalOpen(false);
    setEditingEvent(null);
    updateScheduleBackend(updatedEvents);
  };

  const handleEraseEvent = async () => {
    const updatedEvents = events.filter((evt) => evt !== editingEvent);
    setEvents(updatedEvents);
    setIsEditModalOpen(false);
    setEditingEvent(null);
    updateScheduleBackend(updatedEvents);
  };

  const openDeleteAllEvents = async () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAllEvents = async () => {
    updateScheduleBackend([]);
  };

  const handleEventsImported = (importedEvents: MyEvent[]) => {
    setEvents((currentEvents) => [...currentEvents, ...importedEvents]);
    updateScheduleBackend([...events, ...importedEvents]);
    setTabValue('1');
  };

  const handleCalendarActionsUpdate = (courses, users) => {
    console.log('Received from CalendarActions:', courses, users);
  };

  const updateScheduleBackend = async (updatedEvents: MyEvent[]) => {
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
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} aria-label="Schedule tabs">
                <Tab label="Schedule" icon={<CalendarMonthIcon />} value="1" />
                <Tab label="Options" icon={<PersonPinIcon />} value="2" />
                <Tab label="Import" icon={<PublishIcon />} value="3" />
                <Tab label="Settings" icon={<SettingsIcon />} value="4" />
              </TabList>
            </Box>

            <TabPanel value="1">
              {' '}
              <div className="h-screen">
                <div className="flex justify-end">
                  {' '}
                  <Button
                    onClick={openDeleteAllEvents}
                    type="submit"
                    color="error"
                    variant="outlined"
                  >
                    Erase All Events
                  </Button>{' '}
                </div>

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
                    handleEventChange({ ...event, start, end }, event)
                  }
                  onEventResize={({ event, start, end }) =>
                    handleEventChange({ ...event, start, end }, event)
                  }
                  onDoubleClickEvent={handleDoubleClickEvent}
                  onSelectSlot={handleSelectSlot}
                  resizable
                  selectable
                />
              </div>
            </TabPanel>
            <TabPanel value="2">
              {' '}
              <CalendarActions
                onCalendarActionsUpdate={handleCalendarActionsUpdate}
              />
            </TabPanel>
            <TabPanel value="3">
              <CalendarImport onEventsImported={handleEventsImported} />
            </TabPanel>
            <TabPanel value="4"></TabPanel>
          </TabContext>
        </Box>

        {isEditModalOpen && editingEvent && (
          <EditEventModal
            event={editingEvent}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleSubmitEvent}
            onDelete={handleEraseEvent}
          />
        )}
        {isCreateModalOpen && (
          <CreateEventModal
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateEventSubmit}
            slotInfo={slotInfo}
          />
        )}
        {isDeleteModalOpen && events && (
          <DeleteConfirmationModal
            itemId={''}
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={handleDeleteAllEvents}
            confirmationMessage={`Are you sure you want to delete all events ? THIS OPERATION WILL BE IRREVERSIBLE`}
          />
        )}

        <div className="flex justify-end gap-4 mt-2 mr-8">
          {' '}
          <Button variant="contained">Update</Button>
        </div>
      </div>
    </>
  );
};

export default IndividualSchedule;
