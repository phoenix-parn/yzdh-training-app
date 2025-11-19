/**
 * Statistics utilities
 * 统计工具
 */

export interface UserStatistics {
  userId: string;
  userName: string;
  totalDuration: number;      // Total study duration in seconds
  sessionCount: number;        // Number of sessions
  firstVisit: string;          // ISO date string
  lastVisit: string;           // ISO date string
  currentSessionStart: number; // Timestamp
}

export interface GlobalStatistics {
  totalUsers: number;
  totalDuration: number;       // Total duration across all users in seconds
  averageDuration: number;     // Average duration per user
  lastUpdated: string;         // ISO date string
}

const USER_STATS_KEY = 'app_user_statistics';
const GLOBAL_STATS_KEY = 'app_global_statistics';
const SESSION_INTERVAL = 60000; // Update every 60 seconds

// Default global statistics (mock initial values)
const DEFAULT_GLOBAL_STATS: GlobalStatistics = {
  totalUsers: 156,
  totalDuration: 45820,  // ~12.7 hours in seconds
  averageDuration: 294,  // ~4.9 minutes per user
  lastUpdated: new Date().toISOString()
};

/**
 * Initialize user statistics
 */
export function initUserStatistics(userId: string, userName: string): UserStatistics {
  const now = new Date().toISOString();
  
  const stats: UserStatistics = {
    userId,
    userName,
    totalDuration: 0,
    sessionCount: 0,
    firstVisit: now,
    lastVisit: now,
    currentSessionStart: Date.now()
  };
  
  localStorage.setItem(USER_STATS_KEY, JSON.stringify(stats));
  
  return stats;
}

/**
 * Get user statistics
 */
export function getUserStatistics(): UserStatistics | null {
  const statsStr = localStorage.getItem(USER_STATS_KEY);
  
  if (!statsStr) {
    return null;
  }
  
  try {
    return JSON.parse(statsStr);
  } catch {
    return null;
  }
}

/**
 * Start a new session
 */
export function startSession(userId: string, userName: string): UserStatistics {
  let stats = getUserStatistics();
  
  if (!stats || stats.userId !== userId) {
    stats = initUserStatistics(userId, userName);
  } else {
    stats.sessionCount += 1;
    stats.lastVisit = new Date().toISOString();
    stats.currentSessionStart = Date.now();
    localStorage.setItem(USER_STATS_KEY, JSON.stringify(stats));
  }
  
  // Start session timer
  startSessionTimer();
  
  return stats;
}

/**
 * End current session
 */
export function endSession(): void {
  const stats = getUserStatistics();
  
  if (!stats) {
    return;
  }
  
  // Calculate session duration
  const sessionDuration = Math.floor((Date.now() - stats.currentSessionStart) / 1000);
  stats.totalDuration += sessionDuration;
  stats.lastVisit = new Date().toISOString();
  
  localStorage.setItem(USER_STATS_KEY, JSON.stringify(stats));
  
  // Update global statistics
  updateGlobalStatistics(sessionDuration);
  
  // Stop session timer
  stopSessionTimer();
}

/**
 * Update session duration (called periodically)
 */
function updateSessionDuration(): void {
  const stats = getUserStatistics();
  
  if (!stats) {
    return;
  }
  
  // Add 60 seconds to total duration
  stats.totalDuration += 60;
  stats.lastVisit = new Date().toISOString();
  
  // Reset session start to avoid double counting
  stats.currentSessionStart = Date.now();
  
  localStorage.setItem(USER_STATS_KEY, JSON.stringify(stats));
  
  // Update global statistics
  updateGlobalStatistics(60);
}

let sessionTimer: number | null = null;

/**
 * Start session timer
 */
function startSessionTimer(): void {
  if (sessionTimer) {
    return;
  }
  
  sessionTimer = window.setInterval(() => {
    updateSessionDuration();
  }, SESSION_INTERVAL);
}

/**
 * Stop session timer
 */
function stopSessionTimer(): void {
  if (sessionTimer) {
    clearInterval(sessionTimer);
    sessionTimer = null;
  }
}

/**
 * Get global statistics
 */
export function getGlobalStatistics(): GlobalStatistics {
  const statsStr = localStorage.getItem(GLOBAL_STATS_KEY);
  
  if (!statsStr) {
    // Initialize with default values
    localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(DEFAULT_GLOBAL_STATS));
    return DEFAULT_GLOBAL_STATS;
  }
  
  try {
    return JSON.parse(statsStr);
  } catch {
    return DEFAULT_GLOBAL_STATS;
  }
}

/**
 * Update global statistics
 */
function updateGlobalStatistics(additionalDuration: number): void {
  const stats = getGlobalStatistics();
  
  stats.totalDuration += additionalDuration;
  stats.averageDuration = Math.floor(stats.totalDuration / stats.totalUsers);
  stats.lastUpdated = new Date().toISOString();
  
  localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(stats));
}

/**
 * Format duration to readable string
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`;
  } else if (minutes > 0) {
    return `${minutes}分钟${secs}秒`;
  } else {
    return `${secs}秒`;
  }
}

/**
 * Reset all statistics (for testing)
 */
export function resetStatistics(): void {
  localStorage.removeItem(USER_STATS_KEY);
  localStorage.removeItem(GLOBAL_STATS_KEY);
  stopSessionTimer();
}
