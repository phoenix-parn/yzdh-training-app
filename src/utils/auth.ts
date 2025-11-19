/**
 * Authentication utilities
 * 认证工具
 */

export interface User {
  username: string;
  name: string;
  role: string;
}

// Mock user database - hardcoded test accounts
const MOCK_USERS: Record<string, { password: string; name: string; role: string }> = {
  'admin': {
    password: '123456',
    name: '管理员',
    role: '项目经理'
  },
  'user1': {
    password: '123456',
    name: '张三',
    role: '施工员'
  },
  'user2': {
    password: '123456',
    name: '李四',
    role: '技术员'
  },
  'test': {
    password: '123456',
    name: '测试用户',
    role: '学员'
  }
};

const STORAGE_KEY = 'app_current_user';

/**
 * Login with username and password
 */
export function login(username: string, password: string): User | null {
  const user = MOCK_USERS[username];
  
  if (!user || user.password !== password) {
    return null;
  }
  
  const currentUser: User = {
    username,
    name: user.name,
    role: user.role
  };
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
  
  return currentUser;
}

/**
 * Logout current user
 */
export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get current logged in user
 */
export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem(STORAGE_KEY);
  
  if (!userStr) {
    return null;
  }
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

/**
 * Check if user is logged in
 */
export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}
