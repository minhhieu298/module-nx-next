'use client'; // Chỉ chạy trên client-side
import React, { FC, memo, useEffect, useState } from 'react';
import {
  Box,
  InputAdornment,
  TextField,
  InputLabel,
  FormControl,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { CustomTextFieldProps } from './interface';

const renderTextField = (
  type: string,
  value: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  props: CustomTextFieldProps
) => {
  const {
    slotProps,
    fullWidth = true,
    label = 'Custom CSS',
    id = 'custom-css-outlined-input',
    variant = 'outlined',
    ...rest
  } = props;

  const defaultStartAdornment = (
    <InputAdornment position="start">
      <AccountCircle />
    </InputAdornment>
  );

  const defaultEndAdornment = (
    <InputAdornment position="end">
      <AccountCircle />
    </InputAdornment>
  );

  switch (type) {
    case '1': // Text field với label trong input
      return (
        <FormControl>
          <TextField
            label={label}
            id={id}
            value={value}
            onChange={handleChange}
            className="custom-label-inline"
            slotProps={{
              input: {
                startAdornment: slotProps?.input?.startAdornment || defaultStartAdornment,
                endAdornment: slotProps?.input?.endAdornment || defaultEndAdornment,
              },
            }}
            fullWidth={fullWidth}
            variant={variant}
            {...rest}
          />
        </FormControl>
      );
    case '2': // Text field với label outline
      return (
        <Box>
          <InputLabel htmlFor="component-simple">Name</InputLabel>
          <TextField
            value={value}
            onChange={handleChange}
            className="custom-label-outline"
            slotProps={{
              input: {
                startAdornment: slotProps?.input?.startAdornment || defaultStartAdornment,
                endAdornment: slotProps?.input?.endAdornment || defaultEndAdornment,
              },
            }}
            fullWidth={fullWidth}
            variant={variant}
            {...rest}
          />
        </Box>
      );
    case '3': // Text field không label
      return (
        <TextField
          value={value}
          onChange={handleChange}
          className="custom-label-none"
          slotProps={{
            input: {
              startAdornment: slotProps?.input?.startAdornment || defaultStartAdornment,
              endAdornment: slotProps?.input?.endAdornment || (
                <InputAdornment position="end">
                  <AccountCircle fontSize="medium" />
                </InputAdornment>
              ),
            },
          }}
          fullWidth={fullWidth}
          variant={variant}
          {...rest}
        />
      );
    default:
      return null; // Trả về null nếu type không hợp lệ
  }
};

export const CustomTextField: FC<CustomTextFieldProps> = memo((props) => {
  const [isClient, setIsClient] = useState(false);
  const [value, setValue] = useState(props.value || '');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setValue(props.value || ''); // Đồng bộ với props.value khi thay đổi
  }, [props.value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  // Chỉ render khi client-side sẵn sàng
  // if (!isClient) return null;

  return renderTextField(props.type, value, handleChange, props);
});