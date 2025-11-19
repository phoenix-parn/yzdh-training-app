/**
 * Login Page Component
 * 登录页面组件
 */

import { useState } from 'react';
import { login } from '../utils/auth';
import logo from '../assets/logo.png';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const user = login(username, password);

      if (user) {
        onLoginSuccess();
      } else {
        setError('用户名或密码错误');
      }

      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        {/* Header with Logo */}
        <div className="text-center">
          {/* Logo - 缩小 */}
          <div className="mx-auto mb-8 flex justify-center">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-16 w-16 object-contain"
            />
          </div>
          
          {/* App Name - 字体加大 */}
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
            永临一体预制拼装叠合
          </h1>
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            地下车站专业培训
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-200"></div>
            <p className="text-xs text-gray-400 font-medium tracking-wider">TRAINING SYSTEM</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-200"></div>
          </div>
        </div>

        {/* Login Form */}
        <form className="mt-6 space-y-5 px-[30px]" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Username Input */}
            <div className="flex items-center gap-3">
              <label htmlFor="username" className="text-sm font-semibold text-gray-700 whitespace-nowrap w-16">
                账号
              </label>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="请输入账号"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex items-center gap-3">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700 whitespace-nowrap w-16">
                密码
              </label>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="请输入密码"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 flex items-center gap-2">
              <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-red-800 font-medium">{error}</span>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>登录中...</span>
              </>
            ) : (
              <>
                <span>登录</span>
                <svg className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-400">
            © 2025 永临一体预制拼装培训系统
          </p>
        </div>
      </div>
    </div>
  );
}
