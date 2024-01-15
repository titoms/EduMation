import { useEffect, useState } from 'react';
import { Schedule, ClassTime } from '../../../services/Types';
import ScheduleService from '../../../services/SchedulesService';
import { toast } from 'react-toastify';

const Schedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newSchedule, setNewSchedule] = useState<Partial<Schedule>>({
    classTimes: [],
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const response = await ScheduleService.getAllSchedules();
        setSchedules(response.data);
      } catch (error) {
        toast.error('Failed to fetch schedules', error);
      }
      setLoading(false);
    };

    fetchSchedule();
  }, []);

  const handleAddClassTime = () => {
    setNewSchedule({
      ...newSchedule,
      classTimes: [
        ...(newSchedule.classTimes as ClassTime[]),
        {
          date: new Date().toISOString(),
          startTime: '09:00',
          endTime: '17:00',
          location: 'New Location',
        }, // Example class time
      ],
    });
  };

  const handleSubmit = async () => {
    if (!newSchedule.courseId || newSchedule.classTimes?.length === 0) {
      alert('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await ScheduleService.createSchedule(
        newSchedule as Schedule
      );
      setSchedules([...schedules, response.data]);
      setNewSchedule({ classTimes: [] }); // Reset the form
    } catch (error) {
      console.error('Error creating new schedule:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading schedules...</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">Schedules</h1>
      {/* <div className="w-full rounded-md my-8 p-4 bg-gray-200">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded m-2"
          placeholder="Course ID"
          value={newSchedule.courseId || ''}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, courseId: e.target.value })
          }
        />
        <button
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddClassTime}
        >
          Add Class Time
        </button>
        <button
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit New Schedule
        </button>
      </div> */}
      <div className="h-screen mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col">
            {schedules.map((schedule, index) => (
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedules;
