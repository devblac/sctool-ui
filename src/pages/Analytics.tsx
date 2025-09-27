import React, { useMemo } from 'react';
import { Container, Grid, Box, Chip } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { ShowChart } from '@mui/icons-material';
import { PageHeader, Section } from '../components/layout';
import { FilterPanel, ChartSection, ActivityCard } from '../components/ui';
import { useFilters } from '../hooks/useFilters';

interface FilterState {
  dateRange: string;
  gameType: string;
  minDuration: number;
  maxDuration: number;
  showTrends: boolean;
}

const Analytics = () => {
  const [filters, updateFilter] = useFilters<FilterState>({
    dateRange: '30',
    gameType: 'all',
    minDuration: 5,
    maxDuration: 60,
    showTrends: true,
  });

  const [loading, setLoading] = React.useState(false);

  const chartData = useMemo(() => {
    const durationData = [
      { name: '0-10m', value: 15 },
      { name: '10-20m', value: 35 },
      { name: '20-30m', value: 28 },
      { name: '30-45m', value: 15 },
      { name: '45m+', value: 7 },
    ];

    const mapData = [
      { name: 'Big Game Hunters', value: 25 },
      { name: 'Python', value: 20 },
      { name: 'Luna', value: 15 },
      { name: 'Heartbreak Ridge', value: 12 },
      { name: 'Fighting Spirit', value: 10 },
      { name: 'Others', value: 18 },
    ];

    const trendsData = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      trendsData.push({
        name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: Math.floor(Math.random() * 30) + 50,
        winRate: Math.floor(Math.random() * 30) + 50,
        apm: Math.floor(Math.random() * 50) + 120,
      });
    }

    const matchupData = [
      { name: 'TvT', value: 22 },
      { name: 'TvZ', value: 28 },
      { name: 'TvP', value: 18 },
      { name: 'ZvZ', value: 12 },
      { name: 'ZvP', value: 15 },
      { name: 'PvP', value: 5 },
    ];

    return { durationData, mapData, trendsData, matchupData };
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const filterConfig = useMemo(() => [
    {
      key: 'dateRange',
      label: 'Date Range',
      type: 'select' as const,
      value: filters.dateRange,
      options: [
        { value: '7', label: 'Last 7 days' },
        { value: '30', label: 'Last 30 days' },
        { value: '90', label: 'Last 3 months' },
        { value: '365', label: 'Last year' },
      ],
    },
    {
      key: 'gameType',
      label: 'Game Type',
      type: 'select' as const,
      value: filters.gameType,
      options: [
        { value: 'all', label: 'All Games' },
        { value: '1v1', label: '1v1 Only' },
        { value: '2v2', label: '2v2 Only' },
      ],
    },
    {
      key: 'minDuration',
      label: 'Min Duration (min)',
      type: 'number' as const,
      value: filters.minDuration,
    },
    {
      key: 'maxDuration',
      label: 'Max Duration (min)',
      type: 'number' as const,
      value: filters.maxDuration,
    },
  ], [filters]);

  const charts = useMemo(() => {
    const baseCharts = [
      {
        data: chartData.durationData,
        title: "Game Duration Distribution",
        type: "bar" as const,
        dataKey: "value",
        height: 300,
        xs: 12,
        md: 6,
      },
      {
        data: chartData.mapData,
        title: "Map Popularity",
        type: "pie" as const,
        dataKey: "value",
        height: 300,
        xs: 12,
        md: 6,
      },
      {
        data: chartData.matchupData,
        title: "Race Matchup Distribution",
        type: "pie" as const,
        dataKey: "value",
        height: 300,
        xs: 12,
        md: filters.showTrends ? 6 : 12,
      },
    ];

    if (filters.showTrends) {
      baseCharts.splice(2, 0, {
        data: chartData.trendsData,
        title: "Performance Trends",
        type: "line" as const,
        dataKey: "winRate",
        height: 300,
        xs: 12,
        md: 6,
      });
    }

    return baseCharts;
  }, [chartData, filters.showTrends]);

  const insightsData = useMemo(() => [
    {
      title: "Duration Analysis",
      description: "Most games fall in the 10-30 minute range, indicating balanced match durations. Only 7% of games exceed 45 minutes, suggesting good pacing overall.",
      chips: [
        { label: "Optimal Duration: 10-30m", color: "success" as const },
        { label: "Long Games: 7%", color: "warning" as const },
      ],
    },
    {
      title: "Strategy Insights",
      description: "Big Game Hunters remains the most popular map, favored for its balanced layout. Race distribution is fairly even, with Terran and Zerg being most common.",
      chips: [
        { label: "Top Map: Big Game Hunters", color: "primary" as const },
        { label: "Balanced Races", color: "info" as const },
      ],
    },
  ], []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <PageHeader
        title="Analytics"
        description="Detailed charts and insights from your replay analysis."
        action={{
          label: 'Refresh Charts',
          onClick: handleRefresh,
          loading,
          startIcon: <RefreshIcon />,
        }}
      />

      <FilterPanel
        title="Filters"
        filters={filterConfig}
        onFilterChange={updateFilter}
      />

      <ChartSection charts={charts} />

      <Section title="Analysis Insights" spacing={3}>
        <Grid container spacing={3}>
          {insightsData.map((insight, index) => (
            <Grid item xs={12} md={6} key={index}>
              <ActivityCard
                title={insight.title}
                description={insight.description}
              >
                <Box display="flex" gap={1} flexWrap="wrap">
                  {insight.chips.map((chip, chipIndex) => (
                    <Chip
                      key={chipIndex}
                      label={chip.label}
                      color={chip.color}
                      size="small"
                    />
                  ))}
                </Box>
              </ActivityCard>
            </Grid>
          ))}
        </Grid>
      </Section>
    </Container>
  );
};

export default Analytics;
