import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Dashboard, Analytics, Settings } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import DashboardPage from './pages/Dashboard';
import AnalyticsPage from './pages/Analytics';
import SettingsPage from './pages/Settings';
import ErrorBoundary from './components/ErrorBoundary';
import { NotificationProvider } from './components/NotificationProvider';

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

// Navigation component
const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Dashboard },
    { path: '/analytics', label: 'Analytics', icon: Analytics },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 4 }}>
          🎮 StarCraft Replay Analyzer
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={<Icon />}
                variant={isActive ? 'contained' : 'text'}
                color={isActive ? 'secondary' : 'inherit'}
                sx={{
                  color: isActive ? 'white' : 'inherit',
                  '&:hover': {
                    backgroundColor: isActive ? 'secondary.dark' : 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};


function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Box sx={{ flexGrow: 1 }}>
              <Navigation />
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </Box>
          </Router>
        </ThemeProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
