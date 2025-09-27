import React from 'react';
import { Card, CardContent, CardProps } from '@mui/material';

interface CardLayoutProps extends CardProps {
  children: React.ReactNode;
  elevation?: number;
}

export const CardLayout: React.FC<CardLayoutProps> = ({
  children,
  elevation = 2,
  ...cardProps
}) => {
  return (
    <Card elevation={elevation} {...cardProps}>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
