import { useEffect, useState } from 'react';
import ScheduleSkeleton from '../../../../components/ui/skeletons/ScheduleSkeleton';
import { Schedule } from '../../../../services/Types';
import SchedulesService from '../../../../services/SchedulesService';
import { toast } from 'react-toastify';
import ScheduleCard from './ScheduleCard';
import DeleteConfirmationModal from '../../../../components/ui/DeleteConfirmationModal';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await SchedulesService.getAllSchedules();
        setSchedules(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error('Failed to fetch schedules');
      }
      setLoading(false);
    };
    fetchSchedule();
  }, []);

  const handleOpenDelete = (scheduleId: string) => {
    setSelectedScheduleId(scheduleId);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const handleDeleteScheduleSuccess = async (itemId) => {
    setSchedules(
      schedules.filter((schedule) => schedule._id !== selectedScheduleId)
    );
    setSelectedScheduleId(null);
    setOpenDelete(false);
    await SchedulesService.deleteSchedule(itemId);
  };

  if (loading) return <ScheduleSkeleton />;

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 mt-8">
        {schedules.map((schedule) => (
          <ScheduleCard
            onDelete={handleOpenDelete}
            key={schedule._id}
            schedule={schedule}
          />
        ))}
      </div>
      {selectedScheduleId && (
        <DeleteConfirmationModal
          open={openDelete}
          onClose={handleCloseDelete}
          onDelete={handleDeleteScheduleSuccess}
          itemId={selectedScheduleId}
          confirmationMessage={`Are you sure you want to delete this schedule ?`}
        />
      )}
    </>
  );
};

export default ScheduleList;
