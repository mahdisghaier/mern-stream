import React from 'react';
import { useFormContext, Controller } from 'react-hook-form'; // Import useFormContext and Controller
import { FormHelperText } from '@mui/material'; // Import FormHelperText from Material-UI or appropriate library


export function RHFUploadAvatar({ name, ...other }) {
  const { control } = useFormContext(); // Access control from useFormContext
  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
         
  
          {!!error && (
            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
