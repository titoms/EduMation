import { useEffect, useState } from 'react';
import { Schedule } from '../../../services/Types';
import ScheduleService from '../../../services/SchedulesService';
import { toast } from 'react-toastify';
import Calendar from './schedule/Calendar';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Edit from '@mui/icons-material/Edit';
import ScheduleSkeleton from '../../../components/ui/skeletons/ScheduleSkeleton';

const Schedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await ScheduleService.getAllSchedules();
        setSchedules(response.data);
      } catch (error) {
        toast.error('Failed to fetch schedules');
      }
      setLoading(false);
    };

    fetchSchedule();
  }, []);
  const events: Event[] = [];

  const fromAPItoDates = () => {
    {
      schedules.map((schedule) => {
        {
          schedule.classTimes.map((classTime) => {
            events.push({ date: classTime.date, title: schedule.courseId });
          });
        }
      });
    }
  };
  fromAPItoDates();

  if (loading) return <ScheduleSkeleton />;

  return (
    <>
      <h1 className="text-2xl font-semibold">Schedules</h1>
      <div className="mt-4 flex justify-end">
        <Link to="new">
          <Button startIcon={<Edit />} variant="contained">
            Create new Schedule
          </Button>
        </Link>
      </div>
      <Calendar events={events} />
      <div className="mt-8">
        <div className="flex flex-col">
          {/* {schedules.map((schedule, index) => (
            <div key={index} className="mb-8">
              <div className="mb-2 text-xl font-bold text-gray-800">
                Week {index + 1}
              </div>
              <div className="grid grid-cols-7 gap-4">
                {schedule.classTimes.map((classTime, classIndex) => {
                  // Format the date to match the image representation
                  const date = new Date(classTime.date);
                  const dayOfWeek = date
                    .toLocaleDateString('en-US', { weekday: 'short' })
                    .toUpperCase();
                  const monthDay = date.getDate();
                  return (
                    <div
                      key={classIndex}
                      className={`col-span-1 p-4 border rounded-lg shadow-sm bg-white ${
                        dayOfWeek === 'SAT' || dayOfWeek === 'SUN'
                          ? 'bg-gray-100'
                          : ''
                      }`}
                    >
                      <div className="font-semibold text-gray-700">
                        {dayOfWeek} {monthDay}
                      </div>
                      <div className="text-sm text-gray-600">
                        {classTime.startTime} - {classTime.endTime}
                      </div>
                      <div className="text-sm text-gray-500">
                        {classTime.location}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
};

export default Schedules;
