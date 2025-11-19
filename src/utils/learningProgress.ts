/**
 * Learning Progress Management
 * 学习进度管理工具类
 */

import { getGlobalStatistics } from './statistics';

// Data structures
export interface LearningProgress {
  courseId: string;
  completedPoints: string[];
  totalPoints: number;
  progress: number;
  studyCount: number;
  totalDuration: number;
  pointDurations: {
    [pointId: string]: number;
  };
  lastStudyTime: string;
}

export interface StudySession {
  sessionId: string;
  hasCompleted: boolean;
  startTime: number;
}

export interface PointStudy {
  pointId: string;
  enterTime: number;
  completeTime?: number;
  duration?: number;
}

// Constants
const STORAGE_KEY_PREFIX = 'learning_progress_';
const SESSION_KEY = 'study_session';
const CURRENT_POINT_KEY = 'current_point_study';
const MAX_POINT_DURATION = 30 * 60; // 30 minutes in seconds

class LearningProgressManager {
  /**
   * Initialize or get course progress
   */
  getCourseProgress(courseId: string, totalPoints: number): LearningProgress {
    const key = STORAGE_KEY_PREFIX + courseId;
    const stored = localStorage.getItem(key);
    
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Initialize new progress
    const progress: LearningProgress = {
      courseId,
      completedPoints: [],
      totalPoints,
      progress: 0,
      studyCount: 0,
      totalDuration: 0,
      pointDurations: {},
      lastStudyTime: new Date().toISOString(),
    };
    
    this.saveCourseProgress(progress);
    return progress;
  }

  /**
   * Save course progress
   */
  saveCourseProgress(progress: LearningProgress): void {
    const key = STORAGE_KEY_PREFIX + progress.courseId;
    localStorage.setItem(key, JSON.stringify(progress));
  }

  /**
   * Get or create study session
   */
  getStudySession(): StudySession {
    const stored = sessionStorage.getItem(SESSION_KEY);
    
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Create new session
    const session: StudySession = {
      sessionId: `session_${Date.now()}`,
      hasCompleted: false,
      startTime: Date.now(),
    };
    
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  /**
   * Update session completion status
   */
  markSessionCompleted(): void {
    const session = this.getStudySession();
    session.hasCompleted = true;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  /**
   * Start learning a knowledge point
   */
  startPointStudy(pointId: string): void {
    const study: PointStudy = {
      pointId,
      enterTime: Date.now(),
    };
    sessionStorage.setItem(CURRENT_POINT_KEY, JSON.stringify(study));
  }

  /**
   * Complete learning a knowledge point
   */
  completePointStudy(courseId: string, pointId: string, totalPoints: number): {
    success: boolean;
    duration: number;
    progress: LearningProgress;
  } {
    // Get current point study
    const studyStr = sessionStorage.getItem(CURRENT_POINT_KEY);
    if (!studyStr) {
      return {
        success: false,
        duration: 0,
        progress: this.getCourseProgress(courseId, totalPoints),
      };
    }

    const study: PointStudy = JSON.parse(studyStr);
    
    // Calculate duration
    const completeTime = Date.now();
    let duration = Math.floor((completeTime - study.enterTime) / 1000); // seconds
    
    // Apply max duration limit
    if (duration > MAX_POINT_DURATION) {
      duration = MAX_POINT_DURATION;
    }

    // Get course progress
    const progress = this.getCourseProgress(courseId, totalPoints);

    // Check if already completed
    if (progress.completedPoints.includes(pointId)) {
      return {
        success: false,
        duration: progress.pointDurations[pointId] || 0,
        progress,
      };
    }

    // Mark as completed
    progress.completedPoints.push(pointId);
    progress.pointDurations[pointId] = duration;
    progress.totalDuration += duration;
    progress.progress = Math.round((progress.completedPoints.length / progress.totalPoints) * 100);
    progress.lastStudyTime = new Date().toISOString();

    // Update study count if this is first completion in session
    const session = this.getStudySession();
    if (!session.hasCompleted) {
      progress.studyCount += 1;
      this.markSessionCompleted();
    }

    // Save progress
    this.saveCourseProgress(progress);

    // Update global statistics with the duration
    this.updateGlobalDuration(duration);

    // Clear current point study
    sessionStorage.removeItem(CURRENT_POINT_KEY);

    return {
      success: true,
      duration,
      progress,
    };
  }

  /**
   * Update global statistics duration
   */
  private updateGlobalDuration(additionalDuration: number): void {
    const GLOBAL_STATS_KEY = 'app_global_statistics';
    const stats = getGlobalStatistics();
    
    stats.totalDuration += additionalDuration;
    stats.averageDuration = Math.floor(stats.totalDuration / stats.totalUsers);
    stats.lastUpdated = new Date().toISOString();
    
    localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(stats));
  }

  /**
   * Check if a point is completed
   */
  isPointCompleted(courseId: string, pointId: string, totalPoints: number): boolean {
    const progress = this.getCourseProgress(courseId, totalPoints);
    return progress.completedPoints.includes(pointId);
  }

  /**
   * Get point duration
   */
  getPointDuration(courseId: string, pointId: string, totalPoints: number): number {
    const progress = this.getCourseProgress(courseId, totalPoints);
    return progress.pointDurations[pointId] || 0;
  }

  /**
   * Format duration to readable string
   */
  formatDuration(seconds: number): string {
    if (seconds < 60) {
      return `${seconds}秒`;
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes < 60) {
      return remainingSeconds > 0 
        ? `${minutes}分${remainingSeconds}秒` 
        : `${minutes}分钟`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return remainingMinutes > 0
      ? `${hours}小时${remainingMinutes}分钟`
      : `${hours}小时`;
  }

  /**
   * Get all courses progress
   */
  getAllProgress(): LearningProgress[] {
    const allProgress: LearningProgress[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
        const value = localStorage.getItem(key);
        if (value) {
          allProgress.push(JSON.parse(value));
        }
      }
    }
    
    return allProgress;
  }

  /**
   * Reset course progress (for testing)
   */
  resetCourseProgress(courseId: string): void {
    const key = STORAGE_KEY_PREFIX + courseId;
    localStorage.removeItem(key);
  }

  /**
   * Reset all progress (for testing)
   */
  resetAllProgress(): void {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
        keys.push(key);
      }
    }
    keys.forEach(key => localStorage.removeItem(key));
  }
}

// Export singleton instance
export const learningProgressManager = new LearningProgressManager();
