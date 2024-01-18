import { useEffect, useState } from 'react';
import { Schedule } from '../../../services/Types';
import ScheduleService from '../../../services/SchedulesService';
import { toast } from 'react-toastify';
import Calendar from './schedule/Calendar';
import { Grid, Skeleton } from '@mui/material';

const Schedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await ScheduleService.getAllSchedules();
        setSchedules(response.data);
        console.log(response.data);
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

  if (loading) {
    return (
      <>
        <Skeleton variant="text" height={60} />
        <div className="flex flex-row">
          <Skeleton
            className="mr-3"
            variant="rectangular"
            height={50}
            width={50}
          />
          <Skeleton
            className="mr-3"
            variant="rectangular"
            height={50}
            width={50}
          />
          <Skeleton
            className="mr-3"
            variant="rectangular"
            height={50}
            width={150}
          />
        </div>
        <div className="mt-4 ">
          <Grid container spacing={2} className="w-full">
            <Grid item xs={2}>
              <Skeleton variant="rounded" height={100} />
            </Grid>
            <Grid item xs={2}>
              <Skeleton variant="rounded" height={100} />
            </Grid>
            <Grid item xs={2}>
              <Skeleton variant="rounded" height={100} />
            </Grid>
            <Grid item xs={2}>
              <Skeleton variant="rounded" height={100} />
            </Grid>
            <Grid item xs={2}>
              <Skeleton variant="rounded" height={100} />
            </Grid>
            <Grid item xs={2}>
              <Skeleton variant="rounded" height={100} />
            </Grid>
          </Grid>
        </div>
        <div className="mt-4 ">
          <Grid container spacing={2} className="w-full">
            <Grid item xs={2}>
              <Skeleton variant="rounded" height={100} />
            </Grid>
            <Grid item xs={2}>
              <Skeleton variant="rounded" height={100} />
            </Grid>
            <Grid item xs={2}>
              <Skeleton variant="rounded" height={100} />
            </Grid>
            <Grid item xs={2}>
              <Skeleton variant="rounded" height={100} />
            </Grid>
            <Grid item xs={2}>
              <Skeleton variant="rounded" height={100} />
            </Grid>
            <Grid item xs={2}>
              <Skeleton variant="rounded" height={100} />
            </Grid>
          </Grid>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">Schedules</h1>
      <Calendar events={events} />
      <div className="h-screen mt-8">
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
