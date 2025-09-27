import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Switch,
  Grid
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { Section, CardLayout } from '../layout';

interface FilterOption {
  key: string;
  label: string;
  type: 'select' | 'number' | 'switch';
  options?: { value: string; label: string }[];
  value: any;
}

interface FilterPanelProps {
  title?: string;
  filters: FilterOption[];
  onFilterChange: (key: string, value: any) => void;
  spacing?: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  title = "Filters",
  filters,
  onFilterChange,
  spacing = 3
}) => {
  const renderFilterControl = (filter: FilterOption) => {
    switch (filter.type) {
      case 'select':
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{filter.label}</InputLabel>
            <Select
              value={filter.value}
              label={filter.label}
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
            >
              {filter.options?.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'number':
        return (
          <TextField
            fullWidth
            size="small"
            label={filter.label}
            type="number"
            value={filter.value}
            onChange={(e) => onFilterChange(filter.key, parseInt(e.target.value) || 0)}
          />
        );

      case 'switch':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={filter.value}
                onChange={(e) => onFilterChange(filter.key, e.target.checked)}
              />
            }
            label={filter.label}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Section icon={<FilterList color="primary" />} title={title}>
      <CardLayout>
        <Grid container spacing={spacing}>
          {filters.map((filter, index) => (
            <Grid key={filter.key} item xs={12} sm={6} md={3}>
              {renderFilterControl(filter)}
            </Grid>
          ))}
        </Grid>
      </CardLayout>
    </Section>
  );
};
