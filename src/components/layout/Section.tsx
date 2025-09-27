import React from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';

interface SectionProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  spacing?: number;
}

export const Section: React.FC<SectionProps> = ({
  title,
  icon,
  children,
  sx,
  spacing = 3
}) => {
  return (
    <Box sx={{ mb: spacing, ...sx }}>
      {title && (
        <Box display="flex" alignItems="center" mb={2}>
          {icon && icon}
          <Typography variant="h6">{title}</Typography>
        </Box>
      )}
      {children}
    </Box>
  );
};
