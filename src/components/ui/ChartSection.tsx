import React from 'react';
import { Grid } from '@mui/material';
import { Section } from '../layout';
import { SimpleChart } from '../Charts';

export interface ChartConfig<T = any> {
  data: T[];
  title: string;
  type: 'line' | 'bar' | 'pie';
  dataKey: keyof T;
  height?: number;
  xs?: number;
  md?: number;
}

export interface ChartSectionProps<T = any> {
  title?: string;
  charts: ChartConfig<T>[];
  spacing?: number;
}

export const ChartSection = <T = any>({
  title,
  charts,
  spacing = 3
}: ChartSectionProps<T>) => {
  return (
    <Section title={title} spacing={spacing}>
      <Grid container spacing={spacing}>
        {charts.map((chart, index) => (
          <Grid
            key={index}
            item
            xs={chart.xs || 12}
            md={chart.md || 6}
          >
            <SimpleChart
              data={chart.data}
              title={chart.title}
              type={chart.type}
              dataKey={chart.dataKey}
              height={chart.height || 300}
            />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};
