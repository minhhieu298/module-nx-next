import { ReactNode } from 'react';
export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export interface CustomTabsProps {
  tabs: { label: string; content: ReactNode }[];
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  orientation?: 'horizontal' | 'vertical';
  defaultTab?: number;
  onTabChange?: (newValue: number) => void;
}
