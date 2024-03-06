// CalendarImport.js
import { Button, InputLabel } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DragAndDrop from '../../../../components/ui/draganddrop/DragAndDrop';
import { MyEvent } from '../../../../services/Types';
import { useEffect, useState } from 'react';
import ICAL from 'ical.js';

interface CalendarImportProps {
  onEventsImported: (importedEvents: MyEvent[]) => void;
}

const CalendarImport = ({ onEventsImported }: CalendarImportProps) => {
  const [importedEvents, setImportedEvents] = useState<MyEvent[]>([]);
  const [calendarUploadLoading, setCalendarUploadLoading] = useState(false);
  const [importCalendarIcs, setImportCalendarIcs] = useState<File | null>(null);
  const [showImportStatus, setShowImportStatus] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const fadeOutStyle = {
    transition: 'opacity 0.5s',
    opacity: 0,
  };
  const normalStyle = {
    transition: 'opacity 0.5s',
    opacity: 1,
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (calendarUploadLoading) {
      setShowImportStatus(true);
      setFadeOut(false);
      timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setShowImportStatus(false);
        }, 500);
      }, 3000);
    }
    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [calendarUploadLoading]);

  const handleFileDrop = (file: File) => {
    setImportCalendarIcs(file);
    setCalendarUploadLoading(true);
  };

  const parseAndImportICS = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result;
      if (typeof data === 'string') {
        const jcalData = ICAL.parse(data);
        const comp = new ICAL.Component(jcalData);
        const events = comp.getAllSubcomponents('vevent').map((vevent: any) => {
          const event = new ICAL.Event(vevent);
          const myEvent: MyEvent = {
            start: event.startDate.toJSDate(),
            end: event.endDate.toJSDate(),
            title: event.summary,
            location: event.location,
          };
          return myEvent;
        });
        setImportedEvents(events);
        console.log(events);
        setCalendarUploadLoading(false);
        onEventsImported(events);
      }
    };
    reader.readAsText(file);
  };

  const handleImportClick = () => {
    if (importCalendarIcs) {
      parseAndImportICS(importCalendarIcs);
    }
  };

  return (
    <>
      <div className="bg-gray-200 dark:bg-slate-800 shadow-md w-full flex justify-center rounded-lg p-8">
        <div className="max-w-md w-full space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Import Schedule :</h1>
            <p className="text-gray-500">
              Please follow the instructions below to import your schedule.
            </p>
          </div>
          <div className="rounded-md bg-blue-300 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircleOutlineIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-600">
                  Instructions
                </h3>
                <div className="mt-2 text-sm text-blue-600">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Download the template file and fill in your schedule data.
                    </li>
                    <li>Save your file as a CSV.</li>
                    <li>Upload the CSV file using the form below.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <InputLabel>Upload Calendar</InputLabel>
                <DragAndDrop fileType="ics" onFileDrop={handleFileDrop} />
              </div>
            </div>
            <div>
              <Button variant="outlined" fullWidth onClick={handleImportClick}>
                Import
              </Button>
            </div>
          </div>
          {showImportStatus && (
            <div
              className="rounded-md bg-green-50 p-4 mt-4"
              style={fadeOut ? fadeOutStyle : normalStyle}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleOutlineIcon className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Import Status
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Your file is being processed. Please wait...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>{' '}
    </>
  );
};

export default CalendarImport;
