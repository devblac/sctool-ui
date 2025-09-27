import React from 'react';
import { Typography, Alert, Box } from '@mui/material';
import { CardLayout } from '../layout';

interface ActivityCardProps {
  title: string;
  alert?: {
    severity: 'success' | 'info' | 'warning' | 'error';
    message: string;
  };
  description?: string;
  children?: React.ReactNode;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  alert,
  description,
  children
}) => {
  return (
    <CardLayout>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {alert && (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Alert severity={alert.severity}>
            {alert.message}
          </Alert>
        </Box>
      )}

      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}

      {children}
    </CardLayout>
  );
};
