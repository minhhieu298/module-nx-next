// src/components/CustomInput.tsx
import { Input, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import React from 'react';
interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function CustomInput({
  placeholder,
  value,
  onChange,
  icon,
  disabled = false,
  fullWidth = true,
}: CustomInputProps) {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      fullWidth={fullWidth}
      startAdornment={
        <InputAdornment position="start">
          <IconButton edge="start" disabled={disabled}>
            {icon}
          </IconButton>
        </InputAdornment>
      }
    />
  );
}
