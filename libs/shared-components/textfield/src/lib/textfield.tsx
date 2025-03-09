import React, { FC, memo, useState } from 'react';
import { Box, InputAdornment } from '@mui/material';
import dynamic from 'next/dynamic';
import { AccountCircle } from '@mui/icons-material';
import { CustomTextFieldProps } from './interface';

const TextField = dynamic(() => import('@mui/material/TextField'), {
  ssr: false,
});

const InputLabel = dynamic(() => import('@mui/material/InputLabel'), {
  ssr: false,
});

export const CustomTextField: FC<CustomTextFieldProps> = memo(
  ({
    type,
    value: initialValue = '',
    onChange,
    slotProps,
    fullWidth = true,
    label = 'Custom CSS',
    id = 'custom-css-outlined-input',
    variant = 'outlined', // Mặc định là outlined,
    ...rest
  }) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (onChange) {
        onChange(event);
      }
    };
    switch (type) {
      // text field có label trong input
      case '1':
        return (
          <TextField
            label={label}
            id={id}
            value={value}
            onChange={handleChange}
            className="custom-label-inline"
            slotProps={{
              input: {
                startAdornment: slotProps?.input?.startAdornment || (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
                endAdornment: slotProps?.input?.endAdornment || (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
            fullWidth={fullWidth}
            variant={variant}
            {...rest}
          />
        );
      // text field có label outline
      case '2':
        return (
          <Box>
            <InputLabel htmlFor="component-simple">Name</InputLabel>
            <TextField
              value={value}
              onChange={handleChange}
              className="custom-label-outline"
              slotProps={{
                input: {
                  startAdornment: slotProps?.input?.startAdornment || (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                  endAdornment: slotProps?.input?.endAdornment || (
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                },
              }}
              fullWidth={fullWidth}
              variant={variant}
              {...rest}
            />
          </Box>
        );
      // text field có ko label
      case '3':
        return (
          <TextField
            value={value}
            onChange={handleChange}
            className="custom-label-none"
            slotProps={{
              input: {
                startAdornment: slotProps?.input?.startAdornment || (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
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
        return 'Not found';
    }
  }
);
