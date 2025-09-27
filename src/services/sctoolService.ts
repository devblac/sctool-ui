export interface AnalysisSettings {
  replayPath: string;
  recursiveSearch: boolean;
  playerName: string;
  outputFormat: 'csv' | 'json';
  selectedAnalyzers: string[];
  filters: FilterConfig[];
}

export interface FilterConfig {
  analyzer: string;
  operator: 'is' | 'is-not' | 'greater' | 'lower';
  value: string;
}

export interface AnalysisResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
  fileCount?: number;
}

export interface ReplayData {
  date: string;
  duration: number;
  mapName: string;
  matchup: string;
  is1v1: boolean;
  playerAPM?: number;
  playerWin?: boolean;
  playerRace?: string;
}

class SCToolService {
  private baseCommand = 'sctool';

  /**
   * Execute sctool analysis with given settings
   */
  async runAnalysis(settings: AnalysisSettings): Promise<AnalysisResult> {
    const startTime = Date.now();

    try {
      // Build command arguments
      const args = this.buildCommandArgs(settings);

      // Execute command (this would use Electron/Node.js child_process in a real app)
      const result = await this.executeCommand(args);

      return {
        success: true,
        output: result.output,
        executionTime: Date.now() - startTime,
        fileCount: this.extractFileCount(result.output),
      };
    } catch (error) {
      return {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        executionTime: Date.now() - startTime,
      };
    }
  }

  /**
   * Parse CSV output into structured data
   */
  parseCSVOutput(csvOutput: string): ReplayData[] {
    const lines = csvOutput.split('\n').filter(line => line.trim());

    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const data: ReplayData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const row: any = {};

      headers.forEach((header, index) => {
        row[header] = values[index];
      });

      data.push({
        date: row['date'] || '',
        duration: parseInt(row['duration-minutes']) || 0,
        mapName: row['map-name'] || '',
        matchup: row['matchup'] || '',
        is1v1: row['is-1v1'] === 'true',
        playerAPM: row['my-apm'] ? parseInt(row['my-apm']) : undefined,
        playerWin: row['my-win'] === 'true',
        playerRace: row['my-race'] || undefined,
      });
    }

    return data;
  }

  /**
   * Parse JSON output into structured data
   */
  parseJSONOutput(jsonOutput: string): ReplayData[] {
    try {
      const data = JSON.parse(jsonOutput);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Failed to parse JSON output:', error);
      return [];
    }
  }

  /**
   * Get available analyzers
   */
  getAvailableAnalyzers() {
    return [
      { key: 'date', label: 'Game Date', category: 'Core', description: 'Date when the game was played' },
      { key: 'duration-minutes', label: 'Duration (minutes)', category: 'Core', description: 'Game length in minutes' },
      { key: 'map-name', label: 'Map Name', category: 'Core', description: 'Name of the map played' },
      { key: 'replay-name', label: 'Replay Filename', category: 'Core', description: 'Original replay file name' },
      { key: 'replay-path', label: 'Replay Path', category: 'Core', description: 'Full path to replay file' },
      { key: 'is-1v1', label: '1v1 Match', category: 'Game Type', description: 'True if game was 1v1' },
      { key: 'is-2v2', label: '2v2 Match', category: 'Game Type', description: 'True if game was 2v2' },
      { key: 'matchup', label: 'Race Matchup', category: 'Game Type', description: 'Race combination (e.g., TvZ)' },
      { key: 'my-race', label: 'Your Race', category: 'Player', description: 'Your race (requires -me flag)' },
      { key: 'my-apm', label: 'Your APM', category: 'Player', description: 'Your actions per minute' },
      { key: 'my-win', label: 'Win/Loss', category: 'Player', description: 'Whether you won the game' },
      { key: 'my-game', label: 'Your Games', category: 'Player', description: 'Games where you participated' },
      { key: 'my-matchup', label: 'Your Matchup', category: 'Player', description: 'Matchup from your perspective' },
    ];
  }

  /**
   * Validate replay path
   */
  async validateReplayPath(path: string): Promise<{ valid: boolean; error?: string; fileCount?: number }> {
    try {
      // In a real app, this would check if the directory exists and contains .rep files
      if (!path) {
        return { valid: false, error: 'Path is required' };
      }

      // Simulate validation
      await new Promise(resolve => setTimeout(resolve, 500));

      // For demo purposes, assume any non-empty path is valid
      return { valid: true, fileCount: Math.floor(Math.random() * 100) + 10 };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Validation failed'
      };
    }
  }

  /**
   * Build command arguments from settings
   */
  private buildCommandArgs(settings: AnalysisSettings): string[] {
    const args = [];

    // Required arguments
    args.push('-replay-dir', `"${settings.replayPath}"`);

    // Optional arguments
    if (settings.playerName) {
      args.push('-me', `"${settings.playerName}"`);
    }

    if (!settings.recursiveSearch) {
      args.push('-no-recursive');
    }

    // Add analyzers
    settings.selectedAnalyzers.forEach(analyzer => {
      args.push(analyzer);
    });

    // Output format
    args.push('-o', settings.outputFormat);

    // Quiet mode for clean output
    args.push('-quiet');

    return args;
  }

  /**
   * Execute command (placeholder for actual implementation)
   */
  private async executeCommand(args: string[]): Promise<{ output: string; error?: string }> {
    // In a real Electron app, this would use child_process or similar
    // For now, simulate command execution
    console.log('Executing sctool command:', this.baseCommand, args.join(' '));

    // Simulate execution time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Generate mock output based on selected analyzers
    const hasPlayerData = args.some(arg => arg.includes('-me'));
    const hasDate = args.some(arg => arg === 'date');
    const hasDuration = args.some(arg => arg === 'duration-minutes');
    const hasMap = args.some(arg => arg === 'map-name');
    const hasMatchup = args.some(arg => arg === 'matchup');

    const mockOutput = this.generateMockOutput(hasDate, hasDuration, hasMap, hasMatchup, hasPlayerData);
    return { output: mockOutput };
  }

  /**
   * Generate mock CSV output for demo purposes
   */
  private generateMockOutput(hasDate: boolean, hasDuration: boolean, hasMap: boolean, hasMatchup: boolean, hasPlayerData: boolean): string {
    const headers = [];
    const sampleData = [];

    if (hasDate) headers.push('date');
    if (hasDuration) headers.push('duration-minutes');
    if (hasMap) headers.push('map-name');
    if (hasMatchup) headers.push('matchup');
    if (hasPlayerData) {
      headers.push('my-race', 'my-apm', 'my-win');
    }

    // Generate 10-20 sample rows
    const rowCount = Math.floor(Math.random() * 10) + 10;

    for (let i = 0; i < rowCount; i++) {
      const row = [];
      if (hasDate) row.push('2024-09-' + (Math.floor(Math.random() * 30) + 1).toString().padStart(2, '0'));
      if (hasDuration) row.push((Math.floor(Math.random() * 60) + 5).toString());
      if (hasMap) {
        const maps = ['Big Game Hunters', 'Python', 'Luna', 'Heartbreak Ridge', 'Fighting Spirit'];
        row.push(maps[Math.floor(Math.random() * maps.length)]);
      }
      if (hasMatchup) {
        const matchups = ['TvT', 'ZvZ', 'PvP', 'TvZ', 'TvP', 'ZvP'];
        row.push(matchups[Math.floor(Math.random() * matchups.length)]);
      }
      if (hasPlayerData) {
        const races = ['Terran', 'Zerg', 'Protoss'];
        row.push(races[Math.floor(Math.random() * races.length)]);
        row.push((Math.floor(Math.random() * 200) + 100).toString());
        row.push(Math.random() > 0.5 ? 'true' : 'false');
      }
      sampleData.push(row.join(','));
    }

    return [headers.join(','), ...sampleData].join('\n');
  }

  /**
   * Extract file count from output (placeholder)
   */
  private extractFileCount(output: string): number {
    // In real implementation, parse the actual output
    return Math.floor(Math.random() * 50) + 10;
  }
}

export const sctoolService = new SCToolService();
