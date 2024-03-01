import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function ScheduleOptionTabs() {
  const [tabValue, setTabValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Schedule tabs">
            <Tab label="Schedule" value="1" />
            <Tab label="Options" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"></TabPanel>
        <TabPanel value="2"></TabPanel>
      </TabContext>
    </Box>
  );
}
