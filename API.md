# 📡 API Documentation

## Overview

This document describes the API endpoints and data structures used by the StarCraft Replay Analyzer Frontend to communicate with the backend analysis service.

## 🔌 Base Configuration

### Environment Variables

```env
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_TIMEOUT=30000
VITE_API_RETRIES=3
```

### API Client Setup

The frontend uses a centralized API service (`src/services/sctoolService.ts`) to handle all backend communication.

## 🚀 Endpoints

### Replay Analysis

#### POST `/api/analyze`
Start a new replay analysis job.

**Request Body:**
```json
{
  "replayPath": "/StarCraft/Replays",
  "recursiveSearch": true,
  "playerName": "PlayerName",
  "selectedAnalyzers": ["date", "duration-minutes", "map-name", "matchup"],
  "outputFormat": "csv",
  "filters": []
}
```

**Response:**
```json
{
  "success": true,
  "jobId": "analysis_20250126_143022",
  "status": "running",
  "estimatedTime": 120000,
  "message": "Analysis started successfully"
}
```

#### GET `/api/status/{jobId}`
Check the status of an analysis job.

**Response:**
```json
{
  "jobId": "analysis_20250126_143022",
  "status": "completed",
  "progress": 100,
  "currentFile": "replay_12345.rep",
  "processedFiles": 47,
  "totalFiles": 47,
  "estimatedTimeRemaining": 0,
  "results": {
    "totalGames": 1247,
    "avgDuration": 24.5,
    "winRate": 68.2
  }
}
```

#### GET `/api/results/{jobId}`
Get the complete analysis results.

**Response:**
```json
{
  "jobId": "analysis_20250126_143022",
  "timestamp": "2025-01-26T14:30:22Z",
  "data": [
    {
      "date": "2025-01-25",
      "duration": 18.5,
      "mapName": "Big Game Hunters",
      "matchup": "TvZ",
      "playerAPM": 245,
      "playerWin": true,
      "opponentName": "Opponent123"
    }
  ],
  "summary": {
    "totalGames": 47,
    "winRate": 68.2,
    "avgDuration": 24.5,
    "mapsPlayed": 12,
    "uniqueOpponents": 8
  }
}
```

### Data Export

#### GET `/api/export/{jobId}?format=csv`
Export analysis results in CSV format.

**Response:** CSV file download

#### GET `/api/export/{jobId}?format=json`
Export analysis results in JSON format.

**Response:** JSON file download

#### GET `/api/export/{jobId}?format=html`
Export analysis results as formatted HTML report.

**Response:** HTML file download

## 📊 Data Structures

### Game Data Object
```typescript
interface GameData {
  date: string;              // ISO date string
  duration: number;          // Duration in minutes
  mapName: string;           // Map name
  matchup: string;           // Race matchup (e.g., "TvZ")
  playerAPM: number;         // Player's APM
  playerWin: boolean;        // Win/loss status
  opponentName?: string;     // Opponent name if available
  playerRace?: string;       // Player's race
  opponentRace?: string;     // Opponent's race
  gameType?: string;         // "1v1", "2v2", etc.
}
```

### Analysis Settings
```typescript
interface AnalysisSettings {
  replayPath: string;                    // Path to replay directory
  recursiveSearch: boolean;              // Search subdirectories
  playerName?: string;                   // Filter by player name
  selectedAnalyzers: string[];           // Enabled analyzers
  outputFormat: 'csv' | 'json' | 'html'; // Output format
  filters: FilterConfig[];               // Additional filters
}
```

### Filter Configuration
```typescript
interface FilterConfig {
  type: 'duration' | 'map' | 'matchup' | 'player';
  operator: 'equals' | 'greater' | 'less' | 'contains';
  value: string | number;
}
```

## 🔧 Available Analyzers

| Analyzer Key | Description | Data Type |
|-------------|-------------|-----------|
| `date` | Game date | string |
| `duration-minutes` | Game duration in minutes | number |
| `duration-seconds` | Game duration in seconds | number |
| `map-name` | Map name | string |
| `matchup` | Race matchup | string |
| `player-race` | Player's race | string |
| `opponent-race` | Opponent's race | string |
| `player-apm` | Player's APM | number |
| `player-win` | Win/loss status | boolean |
| `game-type` | Game type (1v1, 2v2, etc.) | string |
| `file-size` | Replay file size | number |

## ⚠️ Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid replay path provided",
    "details": {
      "field": "replayPath",
      "constraint": "Path does not exist"
    }
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Invalid request data
- `NOT_FOUND` - Resource not found
- `PERMISSION_DENIED` - Insufficient permissions
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server internal error
- `SERVICE_UNAVAILABLE` - Analysis service unavailable

## 🔄 Real-time Updates

The frontend uses Server-Sent Events (SSE) for real-time analysis progress updates.

### SSE Endpoint
```
GET /api/events/{jobId}
```

### Event Types
- `progress` - Analysis progress update
- `result` - Analysis completion with results
- `error` - Analysis failure with error details

## 🧪 Testing API Endpoints

### Using cURL
```bash
# Start analysis
curl -X POST http://localhost:8000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "replayPath": "/path/to/replays",
    "recursiveSearch": true,
    "selectedAnalyzers": ["date", "duration-minutes"]
  }'

# Check status
curl http://localhost:8000/api/status/analysis_20250126_143022

# Get results
curl http://localhost:8000/api/results/analysis_20250126_143022
```

### Using JavaScript (Browser)
```javascript
// Start analysis
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    replayPath: '/path/to/replays',
    recursiveSearch: true
  })
});

const { jobId } = await response.json();

// Poll for status
const statusResponse = await fetch(`/api/status/${jobId}`);
const status = await statusResponse.json();

// Get results
const resultsResponse = await fetch(`/api/results/${jobId}`);
const results = await resultsResponse.json();
```

## 🔐 Authentication

Currently, the API does not require authentication. However, this may change in future versions.

### Future Authentication Plans
- JWT token-based authentication
- API key authentication for automated tools
- User accounts with role-based permissions

## 📈 Rate Limiting

- **Analysis requests**: 5 per hour per IP
- **Status checks**: 60 per minute per IP
- **Data exports**: 10 per hour per IP

Rate limit headers:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1640995200
```

## 🔍 Monitoring and Logging

- All API requests are logged with timestamps
- Performance metrics are tracked
- Error rates are monitored
- Usage statistics are collected (anonymized)

## 🚨 Troubleshooting

### Common Issues

#### "Replay path not found"
- Ensure the replay directory exists and is accessible
- Check file permissions
- Verify the path format is correct for your OS

#### "Analysis service unavailable"
- Check if the backend service is running
- Verify network connectivity
- Check service logs for errors

#### "Rate limit exceeded"
- Wait before making additional requests
- Check the `X-RateLimit-Reset` header
- Consider implementing exponential backoff

## 📞 Support

For API-related questions or issues:
- Check the troubleshooting section above
- Review the [GitHub Issues](https://github.com/devblac/sctool-ui/issues)
- Contact the development team

---

<div align="center">

**API Version: v1.0.0**

[📚 Backend Documentation](https://github.com/devblac/sctool-backend) • [🐛 Report Issues](https://github.com/devblac/sctool-ui/issues)

</div>
