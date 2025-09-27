import React from 'react';
import { Box, Typography, Button, SxProps, Theme } from '@mui/material';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    startIcon?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
  sx
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 4, ...sx }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
      {action && (
        <Button
          variant="outlined"
          startIcon={action.startIcon}
          onClick={action.onClick}
          disabled={action.disabled || action.loading}
        >
          {action.loading ? 'Loading...' : action.label}
        </Button>
      )}
    </Box>
  );
};
