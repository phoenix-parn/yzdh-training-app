/**
 * Login Page Component
 * 登录页面组件 - Figma设计样式
 */

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '../utils/auth';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-b from-[#F5F8FF] to-white flex flex-col">
      {/* Logo 区域 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <div className="mb-12 flex flex-col items-center">
          <div style={{ width: '80px', height: '80px' }} className="bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg overflow-hidden">
            <img 
              src="/icon.png" 
              alt="Logo" 
              style={{ width: '80px', height: '80px', maxWidth: '80px', maxHeight: '80px' }}
              className="object-contain"
            />
          </div>
          <h1 className="text-center text-[18px] text-[#333333] mb-1 font-['SF_Pro_Display']">
            轨道交通施工培训
          </h1>
          <p className="text-center text-[14px] text-[#666666] font-['SF_Pro_Display']">
            预制装配式施工技术学习平台
          </p>
        </div>

        {/* 登录表单 */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {/* 用户名输入 */}
          <div>
            <label className="block text-[14px] text-[#333333] mb-2">
              手机号 / 用户名
            </label>
            <input
              type="text"
              placeholder="请输入手机号或用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-12 px-4 bg-white border border-[#E0E0E0] rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* 密码输入 */}
          <div>
            <label className="block text-[14px] text-[#333333] mb-2">
              密码
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 bg-white border border-[#E0E0E0] rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#333333]"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 flex items-center gap-2">
              <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-red-800 font-medium">{error}</span>
            </div>
          )}

          {/* 记住密码和忘记密码 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember"
                className="text-[14px] text-[#666666] cursor-pointer select-none"
              >
                记住密码
              </label>
            </div>
            <button type="button" className="text-[14px] text-primary hover:text-primary/80">
              忘记密码？
            </button>
          </div>

          {/* 登录按钮 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white text-[16px] font-medium rounded-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
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
              <span>登录</span>
            )}
          </button>

          {/* 快速登录提示 */}
          <div className="text-center mt-6">
            <span className="text-[14px] text-[#666666]">还没有账号？</span>
            <button type="button" className="text-[14px] text-primary hover:text-primary/80 ml-2">
              立即注册
            </button>
          </div>
        </form>
      </div>

      {/* 底部信息 */}
      <div className="py-6 text-center">
        <p className="text-[12px] text-[#999999]">
          登录即表示同意
          <button type="button" className="text-primary hover:text-primary/80 mx-1">
            用户协议
          </button>
          和
          <button type="button" className="text-primary hover:text-primary/80 mx-1">
            隐私政策
          </button>
        </p>
        <p className="text-[12px] text-[#CCCCCC] mt-2">
          © 2025 轨道交通培训平台 V1.0
        </p>
      </div>
    </div>
  );
}
