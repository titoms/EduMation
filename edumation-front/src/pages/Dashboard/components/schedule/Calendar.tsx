import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  parse,
  startOfToday,
} from 'date-fns';
import { useMemo, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Event {
  date: Date;
  title: string;
  eventType: 'availableEvent' | 'notAvailableEvent' | 'otherEvent';
}

interface EventCalendarProps {
  events: Event[];
}

const Calendar = ({ events }: EventCalendarProps) => {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function goToToday() {
    setCurrentMonth(format(today, 'MMM-yyyy'));
  }

  const startingDayIndex = getDay(firstDayCurrentMonth);

  const eventsByDate = useMemo(() => {
    return events.reduce((acc: { [key: string]: Event[] }, event) => {
      const dateKey = format(event.date, 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [events]);

  const getEventStyles = (eventType: Event['eventType']) => {
    switch (eventType) {
      case 'availableEvent':
        return 'bg-green-300 text-green-800';
      case 'notAvailableEvent':
        return 'bg-red-300 text-red-800';
      case 'otherEvent':
        return 'bg-yellow-200 text-yellow-800';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="mb-4 text-center flex justify">
        <button
          onClick={previousMonth}
          className="px-4 py-2 bg-gray-500 dark:bg-slate-600 text-white rounded hover:bg-gray-600 dark:hover:bg-gray-500 ml-2"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={goToToday}
          className="px-4 py-2 bg-gray-500 dark:bg-slate-600 text-white rounded hover:bg-gray-600 dark:hover:bg-gray-500 ml-2"
        >
          Today
        </button>
        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-gray-500 dark:bg-slate-600 text-white rounded hover:bg-gray-600 dark:hover:bg-gray-500 ml-2"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <h2 className="px-8 py-2 bg-slate-200 dark:bg-slate-600 text-black dark:text-slate-200 font-bold rounded ml-2">
          {format(firstDayCurrentMonth, 'MMMM yyyy')}
        </h2>
      </div>
      <div className="grid grid-cols-7">
        {WEEKDAYS.map((day) => {
          return (
            <div
              key={day}
              className="font-bold text-center hover:bg-gray-200 dark:hover:bg-slate-800"
            >
              {day}
            </div>
          );
        })}
        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return (
            <div
              key={`empty-${index}`}
              className="border dark:border-slate-800 p-4 text-center"
            />
          );
        })}
        {days.map((day, index) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const todaysEvents = eventsByDate[dateKey] || [];
          return (
            <div
              key={index}
              className={clsx(
                'border dark:border-slate-800 h-16 md:h-36 text-center hover:bg-gray-200 dark:hover:bg-slate-800 dark:hover:text-white',
                {
                  'bg-slate-300 dark:bg-slate-500 font-bold': isToday(day),
                  'text-slate-900': isToday(day),
                }
              )}
            >
              {format(day, 'd')}
              {todaysEvents.map((event) => {
                const eventStyles = getEventStyles(event.eventType);
                return (
                  <Tooltip
                    key={event.title}
                    title={event.title}
                    placement="top"
                  >
                    <div className={`p-1 rounded-md ${eventStyles}`}>
                      <span className="overflow-hidden hidden md:block">
                        {event.title}
                      </span>
                    </div>
                  </Tooltip>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center align-middle"></div>
    </div>
  );
};

export default Calendar;
