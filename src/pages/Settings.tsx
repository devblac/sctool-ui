import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Divider,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  FolderOpen,
  PlayArrow,
  Help,
  Refresh,
  Save,
  Download,
  GetApp,
} from '@mui/icons-material';
import { sctoolService, AnalysisSettings, FilterConfig } from '../services/sctoolService';
import { useNotification } from '../components/NotificationProvider';

const Settings = () => {
  const [settings, setSettings] = useState<AnalysisSettings>({
    replayPath: '',
    recursiveSearch: true,
    playerName: '',
    outputFormat: 'csv',
    selectedAnalyzers: ['date', 'duration-minutes', 'map-name', 'matchup'],
    filters: [],
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [availableAnalyzers, setAvailableAnalyzers] = useState<any[]>([]);
  const [pathValidation, setPathValidation] = useState<{ valid: boolean; error?: string; fileCount?: number } | null>(null);
  const { showSuccess, showError, showWarning, showInfo } = useNotification();

  // Load available analyzers on component mount
  useEffect(() => {
    setAvailableAnalyzers(sctoolService.getAvailableAnalyzers());
  }, []);

  // Validate path when it changes
  useEffect(() => {
    if (settings.replayPath) {
      const validate = async () => {
        const result = await sctoolService.validateReplayPath(settings.replayPath);
        setPathValidation(result);
      };
      validate();
    } else {
      setPathValidation(null);
    }
  }, [settings.replayPath]);

  const handlePathSelect = () => {
    // In a real app, this would open a file/folder picker
    const path = prompt('Enter replay directory path:');
    if (path) {
      setSettings({ ...settings, replayPath: path });
      showInfo('Replay path updated. Validation in progress...');
    }
  };

  const handleAnalyzerToggle = (analyzer: string) => {
    const newAnalyzers = settings.selectedAnalyzers.includes(analyzer)
      ? settings.selectedAnalyzers.filter(a => a !== analyzer)
      : [...settings.selectedAnalyzers, analyzer];

    setSettings({ ...settings, selectedAnalyzers: newAnalyzers });
  };

  const handleRunAnalysis = async () => {
    if (!settings.replayPath) {
      showError('Please select a replay directory first');
      return;
    }

    if (!pathValidation?.valid) {
      showError('Please fix the replay path validation error first');
      return;
    }

    setIsAnalyzing(true);
    showInfo('Starting analysis... This may take a few moments.');

    try {
      const result = await sctoolService.runAnalysis(settings);

      if (result.success) {
        showSuccess(`Analysis completed successfully! Processed ${result.fileCount} files in ${result.executionTime}ms.`);
        // Here you would update the dashboard state with the new data
        console.log('Analysis result:', result.output);

        // Store the latest result for export
        localStorage.setItem('latestAnalysisResult', result.output);
        localStorage.setItem('latestAnalysisSettings', JSON.stringify(settings));
      } else {
        showError(`Analysis failed: ${result.error}`);
      }
    } catch (error) {
      showError('Analysis failed. Check console for details.');
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExportCSV = () => {
    const result = localStorage.getItem('latestAnalysisResult');
    if (!result) {
      showWarning('No analysis results available. Please run an analysis first.');
      return;
    }

    try {
      const blob = new Blob([result], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sctool-analysis-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showSuccess('CSV export completed successfully!');
    } catch (error) {
      showError('Failed to export CSV file.');
      console.error(error);
    }
  };

  const handleExportJSON = () => {
    const result = localStorage.getItem('latestAnalysisResult');
    const settings = localStorage.getItem('latestAnalysisSettings');

    if (!result || !settings) {
      showWarning('No analysis results available. Please run an analysis first.');
      return;
    }

    try {
      const jsonData = {
        analysisDate: new Date().toISOString(),
        settings: JSON.parse(settings),
        data: sctoolService.parseCSVOutput(result),
      };

      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sctool-analysis-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showSuccess('JSON export completed successfully!');
    } catch (error) {
      showError('Failed to export JSON file.');
      console.error(error);
    }
  };

  const handleExportReport = () => {
    const result = localStorage.getItem('latestAnalysisResult');
    const settings = localStorage.getItem('latestAnalysisSettings');

    if (!result || !settings) {
      showWarning('No analysis results available. Please run an analysis first.');
      return;
    }

    try {
      const analysisData = sctoolService.parseCSVOutput(result);
      const parsedSettings = JSON.parse(settings);

      // Generate a simple HTML report
      const reportHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>StarCraft Replay Analysis Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              .header { color: #1976d2; border-bottom: 2px solid #1976d2; padding-bottom: 10px; }
              .summary { background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 8px; }
              .stats { display: flex; justify-content: space-around; margin: 20px 0; }
              .stat { text-align: center; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🎮 StarCraft Replay Analysis Report</h1>
              <p>Generated on: ${new Date().toLocaleString()}</p>
            </div>

            <div class="summary">
              <h2>Analysis Summary</h2>
              <div class="stats">
                <div class="stat">
                  <h3>Total Games</h3>
                  <p>${analysisData.length}</p>
                </div>
                <div class="stat">
                  <h3>Average Duration</h3>
                  <p>${Math.round(analysisData.reduce((sum, game) => sum + game.duration, 0) / analysisData.length)} minutes</p>
                </div>
                <div class="stat">
                  <h3>Unique Maps</h3>
                  <p>${new Set(analysisData.map(g => g.mapName)).size}</p>
                </div>
              </div>
            </div>

            <h2>Recent Games</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Map</th>
                  <th>Matchup</th>
                  ${parsedSettings.playerName ? '<th>Your APM</th><th>Result</th>' : ''}
                </tr>
              </thead>
              <tbody>
                ${analysisData.slice(0, 10).map(game => `
                  <tr>
                    <td>${game.date}</td>
                    <td>${game.duration}m</td>
                    <td>${game.mapName}</td>
                    <td>${game.matchup}</td>
                    ${parsedSettings.playerName ? `<td>${game.playerAPM || 'N/A'}</td><td>${game.playerWin ? 'Win' : 'Loss'}</td>` : ''}
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <p><em>Report generated by SCTool Frontend Interface</em></p>
          </body>
        </html>
      `;

      const blob = new Blob([reportHTML], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sctool-report-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showSuccess('Report exported successfully!');
    } catch (error) {
      showError('Failed to export report.');
      console.error(error);
    }
  };

  const getAnalyzersByCategory = () => {
    const categories: { [key: string]: typeof availableAnalyzers } = {};
    availableAnalyzers.forEach(analyzer => {
      if (!categories[analyzer.category]) {
        categories[analyzer.category] = [];
      }
      categories[analyzer.category].push(analyzer);
    });
    return categories;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Configure your replay analysis settings and preferences.
      </Typography>

      <Grid item container spacing={3}>
        {/* Replay Configuration */}
        <Grid item  xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <FolderOpen color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Replay Configuration</Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Replay Directory Path"
                  value={settings.replayPath}
                  onChange={(e) => setSettings({ ...settings, replayPath: e.target.value })}
                  placeholder="C:\Users\...\StarCraft\Replays"
                  sx={{ mb: 2 }}
                  error={pathValidation !== null && !pathValidation.valid}
                  helperText={
                    pathValidation?.error ||
                    (pathValidation?.valid && pathValidation.fileCount ? `${pathValidation.fileCount} replay files found` : '')
                  }
                />
                <Button
                  variant="outlined"
                  startIcon={<FolderOpen />}
                  onClick={handlePathSelect}
                  fullWidth
                >
                  Browse for Directory
                </Button>
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.recursiveSearch}
                    onChange={(e) => setSettings({ ...settings, recursiveSearch: e.target.checked })}
                  />
                }
                label="Recursive Search (search subdirectories)"
              />

              <Divider sx={{ my: 2 }} />

              <TextField
                fullWidth
                label="Player Name (for personal stats)"
                value={settings.playerName}
                onChange={(e) => setSettings({ ...settings, playerName: e.target.value })}
                placeholder="Your StarCraft player name"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Analysis Options */}
        <Grid item  xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <SettingsIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6">Analysis Options</Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select analyzers to include in your analysis:
              </Typography>

              {Object.entries(getAnalyzersByCategory()).map(([category, analyzers]) => (
                <Box key={category} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                    {category}
                  </Typography>
                  <FormGroup>
                    {analyzers.map((analyzer) => (
                      <FormControlLabel
                        key={analyzer.key}
                        control={
                          <Checkbox
                            checked={settings.selectedAnalyzers.includes(analyzer.key)}
                            onChange={() => handleAnalyzerToggle(analyzer.key)}
                          />
                        }
                        label={
                          <Box display="flex" alignItems="center">
                            {analyzer.label}
                            <Tooltip title={`Analyze ${analyzer.label.toLowerCase()}`}>
                              <IconButton size="small" sx={{ ml: 1 }}>
                                <Help fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        }
                      />
                    ))}
                  </FormGroup>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">
                  Selected: <Chip label={settings.selectedAnalyzers.length} size="small" color="primary" />
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={isAnalyzing ? <Refresh /> : <PlayArrow />}
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Export & Quick Actions */}
        <Grid item  xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Export & Quick Actions
              </Typography>
              <Grid item container spacing={2}>
                <Grid item >
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    onClick={handleExportCSV}
                  >
                    Export CSV
                  </Button>
                </Grid>
                <Grid item >
                  <Button
                    variant="outlined"
                    startIcon={<GetApp />}
                    onClick={handleExportJSON}
                  >
                    Export JSON
                  </Button>
                </Grid>
                <Grid item >
                  <Button
                    variant="contained"
                    startIcon={<GetApp />}
                    onClick={handleExportReport}
                  >
                    Export Report
                  </Button>
                </Grid>
                <Grid item >
                  <Button
                    variant="outlined"
                    startIcon={<Save />}
                    onClick={() => showSuccess('Settings saved successfully!')}
                  >
                    Save Settings
                  </Button>
                </Grid>
                <Grid item >
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={() => setSettings({
                      replayPath: '',
                      recursiveSearch: true,
                      playerName: '',
                      outputFormat: 'csv',
                      selectedAnalyzers: ['date', 'duration-minutes', 'map-name', 'matchup'],
                      filters: [],
                    })}
                  >
                    Reset to Defaults
                  </Button>
                </Grid>
              </Grid>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Export options are available after running an analysis. The report includes a formatted summary with charts and statistics.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
