import React, { useMemo } from 'react';
import { Container, Grid, Refresh } from '@mui/material';
import { Games, AccessTime, Map, TrendingUp } from '@mui/icons-material';
import { SummaryCards } from '../components/Charts';
import { PageHeader, Section } from '../components/layout';
import { ChartSection, StatsCard, ActivityCard } from '../components/ui';
import { useMockData } from '../hooks/useMockData';

interface DashboardStats {
  totalGames: number;
  avgDuration: number;
  mapsPlayed: number;
  winRate: number;
  recentGames: number;
  longestGame: number;
  shortestGame: number;
  oneV1Games: number;
  twoV2Games: number;
}

const Dashboard = () => {
  const generateDashboardStats = (): DashboardStats => ({
    totalGames: 1247,
    avgDuration: 24,
    mapsPlayed: 47,
    winRate: 68,
    recentGames: 23,
    longestGame: 87,
    shortestGame: 3,
    oneV1Games: 892,
    twoV2Games: 355,
  });

  const generateChartData = () => {
    const data = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      data.push({
        name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: Math.floor(Math.random() * 15) + 5,
        games: Math.floor(Math.random() * 15) + 5,
        wins: Math.floor(Math.random() * 10) + 3,
      });
    }

    return data;
  };

  const [stats, refreshStats, loading] = useMockData(generateDashboardStats);
  const [chartData] = useMockData(generateChartData);

  const summaryStats = useMemo(() => [
    {
      label: 'Total Games',
      value: stats.totalGames.toLocaleString(),
      icon: <Games />,
    },
    {
      label: 'Avg Duration',
      value: `${stats.avgDuration}m`,
      icon: <AccessTime />,
    },
    {
      label: 'Maps Played',
      value: stats.mapsPlayed,
      icon: <Map />,
    },
    {
      label: 'Win Rate',
      value: `${stats.winRate}%`,
      icon: <TrendingUp />,
    },
  ], [stats]);

  const quickStats = useMemo(() => [
    { label: '1v1 Games', value: stats.oneV1Games, chip: true },
    { label: '2v2 Games', value: stats.twoV2Games, chip: true },
    { label: 'Longest Game', value: `${stats.longestGame}m`, chip: true },
    { label: 'Shortest Game', value: `${stats.shortestGame}m`, chip: true },
  ], [stats]);

  const raceDistributionData = [
    { name: 'Terran', value: 35 },
    { name: 'Zerg', value: 30 },
    { name: 'Protoss', value: 35 },
  ];

  const charts = [
    {
      data: chartData,
      title: "Games Played Over Time",
      type: "line" as const,
      dataKey: "games",
      height: 350,
      xs: 12,
      md: 8,
    },
    {
      data: raceDistributionData,
      title: "Race Distribution",
      type: "pie" as const,
      dataKey: "value",
      height: 350,
      xs: 12,
      md: 4,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <PageHeader
        title="Dashboard"
        description="Overview of your StarCraft replay analysis and performance metrics."
        action={{
          label: 'Refresh Data',
          onClick: refreshStats,
          loading,
          startIcon: <Refresh />,
        }}
      />

      <Section spacing={4}>
        <SummaryCards stats={summaryStats} />
      </Section>

      <ChartSection charts={charts} spacing={4} />

      <Section>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ActivityCard
              title="Recent Activity"
              alert={{
                severity: 'success',
                message: `Last analysis completed successfully! ${stats.recentGames} games analyzed in the last 24 hours.`
              }}
              description={`Your performance has been consistent with a ${stats.winRate}% win rate over ${stats.totalGames} total games. Most games are played on popular maps like Big Game Hunters and Python.`}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatsCard
              title="Quick Stats"
              stats={quickStats}
              direction="column"
            />
          </Grid>
        </Grid>
      </Section>
    </Container>
  );
};

export default Dashboard;
