import {
  InputAdornmentProps,
  TextFieldProps,
  TextFieldVariants,
} from '@mui/material';

interface CustomInputAdornmentProps extends InputAdornmentProps {
  position: 'start' | 'end';
  children: React.ReactNode;
}

interface CustomInputSlotProps {
  startAdornment?: React.ReactElement<CustomInputAdornmentProps>;
  endAdornment?: React.ReactElement<CustomInputAdornmentProps>;
}

// Interface chính cho CustomTextField
export interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  type: string; // truyền type tương ứng với các form text field
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  slotProps?: {
    input?: CustomInputSlotProps;
  };
  fullWidth?: boolean;
  label?: string;
  id?: string;
  variant?: TextFieldVariants;
}
