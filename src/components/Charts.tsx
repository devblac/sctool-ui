import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface ChartsProps {
  data?: ChartData[];
  title?: string;
  type?: 'line' | 'bar' | 'pie';
  dataKey?: string;
  height?: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const SimpleChart: React.FC<ChartsProps> = ({
  data = [],
  title = 'Chart',
  type = 'line',
  dataKey = 'value',
  height = 300,
}) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={dataKey} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={dataKey}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={dataKey} stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export const SummaryCards: React.FC<{ stats: { label: string; value: string | number; icon?: React.ReactNode }[] }> = ({
  stats,
}) => {
  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      {stats.map((stat, index) => (
        <Card key={index} elevation={2} sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h4">{stat.value}</Typography>
              </Box>
              {stat.icon && (
                <Box sx={{ fontSize: 40, color: 'primary.main' }}>
                  {stat.icon}
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
