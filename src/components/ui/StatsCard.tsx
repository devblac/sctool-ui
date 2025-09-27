import React from 'react';
import { Box, Typography, Chip, SxProps, Theme } from '@mui/material';
import { CardLayout } from '../layout';

export interface StatItem<T = string | number> {
  label: string;
  value: T;
  chip?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

export interface StatsCardProps<T = string | number> {
  title: string;
  stats: StatItem<T>[];
  sx?: SxProps<Theme>;
  direction?: 'row' | 'column';
}

export const StatsCard = <T extends string | number = string | number>({
  title,
  stats,
  sx,
  direction = 'row'
}: StatsCardProps<T>) => {
  return (
    <CardLayout sx={sx}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: direction === 'column' ? 'column' : 'row',
          gap: direction === 'column' ? 1 : 2,
          flexWrap: 'wrap'
        }}
      >
        {stats.map((stat, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: direction === 'column' ? 1 : 0 }}
          >
            <Typography variant="body2">{stat.label}</Typography>
            {stat.chip ? (
              <Chip label={stat.value} size="small" color={stat.color} />
            ) : (
              <Typography variant="body2" fontWeight="bold">
                {stat.value}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </CardLayout>
  );
};
