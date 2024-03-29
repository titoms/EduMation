import { useEffect, useState } from 'react';
import ScheduleSkeleton from '../../../../components/ui/skeletons/ScheduleSkeleton';
import { Schedule } from '../../../../services/Types';
import SchedulesService from '../../../../services/SchedulesService';
import { toast } from 'react-toastify';
import ScheduleCard from './ScheduleCard';
import DeleteConfirmationModal from '../../../../components/DeleteConfirmationModal';
import { useScheduleContext } from '../../../../context/ScheduleContext';

const ScheduleList = () => {
  const scheduleContext = useScheduleContext();
  const [schedules, setSchedules] = useState<
    (Schedule & { courseName?: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (scheduleContext && scheduleContext.schedules) {
      setSchedules(scheduleContext.schedules);
    }
    setLoading(false);
  }, [scheduleContext]);

  const handleOpenDelete = (scheduleId: string) => {
    setSelectedScheduleId(scheduleId);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  const handleDeleteSchedule = async () => {
    if (!selectedScheduleId) return;
    try {
      await SchedulesService.deleteSchedule(selectedScheduleId);
      setSchedules((prev) =>
        prev.filter((schedule) => schedule._id !== selectedScheduleId)
      );
      toast.success('Schedule deleted successfully');
    } catch (error) {
      toast.error('Failed to delete schedule');
    } finally {
      handleCloseDelete();
    }
  };

  if (loading) return <ScheduleSkeleton />;
  if (!schedules.length) return <div>No schedules available</div>;

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {schedules.map((schedule) => (
          <ScheduleCard
            key={schedule._id}
            schedule={schedule}
            onDelete={handleOpenDelete}
          />
        ))}
      </div>

      {selectedScheduleId && (
        <DeleteConfirmationModal
          open={openDelete}
          onClose={handleCloseDelete}
          onDelete={handleDeleteSchedule}
          itemId={selectedScheduleId}
          confirmationMessage={`Are you sure you want to delete this schedule?`}
        />
      )}
    </>
  );
};

export default ScheduleList;
