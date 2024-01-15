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

  return (
    <div className="container mx-auto py-4">
      <div className="mb-4 text-center flex justify">
        <button
          onClick={previousMonth}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <h2 className="px-8 py-2 bg-gray-200 text-black font-bold rounded ml-2">
          {format(firstDayCurrentMonth, 'MMMM yyyy')}
        </h2>
      </div>
      <div className="grid grid-cols-7">
        {WEEKDAYS.map((day) => {
          return (
            <div key={day} className="font-bold text-center hover:bg-gray-200">
              {day}
            </div>
          );
        })}
        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return (
            <div key={`empty-${index}`} className="border p-4 text-center" />
          );
        })}
        {days.map((day, index) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const todaysEvents = eventsByDate[dateKey] || [];
          return (
            <div
              key={index}
              className={clsx(
                'border h-16 md:h-32 text-center hover:bg-gray-200',
                {
                  'bg-blue-200 font-bold': isToday(day),
                  'text-blue-900': isToday(day),
                }
              )}
            >
              {format(day, 'd')}
              {todaysEvents.map((event) => {
                return (
                  <div
                    key={event.title}
                    className="bg-green-300 p-1 rounded-md text-green-900"
                  >
                    <Tooltip title={event.title} placement="top">
                      <span className="overflow-hidden hidden md:block">
                        {event.title}
                      </span>
                    </Tooltip>
                  </div>
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
