import React, { useState, useEffect } from 'react';
import { CustomTabsProps, TabPanelProps } from './interface';
import { styled, Tabs, Tab, Box } from '@mui/material';

// TabPanel component
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Main CustomTabs component
export const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  defaultTab = 0,
  onTabChange,
}) => {
  const [value, setValue] = useState(defaultTab);
  const [isClient, setIsClient] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (onTabChange) {
      onTabChange(newValue);
    }
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <Box sx={{ width: '100%', maxWidth: 300, ml: 20, mt: 4 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={<p>{tab.label}</p>} id={`tab-${index}`} />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};
