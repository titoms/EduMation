// CalendarImport.js
import DragAndDrop from '../../../../components/ui/draganddrop/DragAndDrop';

const CalendarImport = ({ onEventsImported }) => {
  const handleImportCalendar = async (event) => {};

  const parseIcsFile = (icsData) => {};

  return (
    <>
      <DragAndDrop onFileDrop={handleImportCalendar} fileType="ics" />
    </>
  );
};

export default CalendarImport;
