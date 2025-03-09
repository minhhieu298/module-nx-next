import React, { useState } from 'react';
import { CustomTabsProps, TabPanelProps } from './interface';
import { styled, Tabs, Tab, Box } from '@mui/material';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid ' + theme.palette.divider,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
}));

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
  variant = 'standard',
  orientation = 'horizontal',
  defaultTab = 0,
  onTabChange,
}) => {
  const [value, setValue] = useState(defaultTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        variant={variant}
        orientation={orientation}
        aria-label="custom tabs"
      >
        {tabs.map((tab, index) => (
          <StyledTab
            key={index}
            label={tab.label}
            id={`tab-${index}`}
            aria-controls={`tabpanel-${index}`}
          />
        ))}
      </StyledTabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};
