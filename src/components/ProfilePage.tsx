import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { courseData } from "../data/courseData";
import { getCurrentUser, logout } from "../utils/auth";
import { getUserStatistics, getGlobalStatistics, formatDuration } from "../utils/statistics";
import logo from "../assets/logo.png";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const currentUser = getCurrentUser();
  const userStats = getUserStatistics();
  const globalStats = getGlobalStatistics();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const menuItems = [
    {
      id: 4,
      icon: Settings,
      title: "设置",
      subtitle: "账号与系统设置",
      color: "text-[#666666]",
      bgColor: "bg-[#F5F5F5]",
      onClick: () => {},
    },
    {
      id: 5,
      icon: ChevronLeft,
      title: "退出登录",
      subtitle: "退出当前账号",
      color: "text-red-500",
      bgColor: "bg-red-50",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => onNavigate("home")}
        >
          <ChevronLeft className="h-5 w-5 text-[#333333]" />
        </Button>
        <h1 className="text-[#333333]">个人中心</h1>
      </div>

      {/* 用户信息栏 */}
      <div className="bg-white p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 flex-shrink-0 rounded-full overflow-hidden bg-white border-2 border-primary/20 flex items-center justify-center">
            <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
          </div>
          <div className="flex-1">
            <h2 className="text-[#333333] mb-1">{currentUser?.name || '用户'}</h2>
            <p className="text-[14px] text-[#666666]">{currentUser?.role || '学员'}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0">
            <ChevronRight className="h-5 w-5 text-[#666666]" />
          </Button>
        </div>
      </div>

      {/* 学习统计卡片 */}
      <div className="p-4">
        <Card className="p-4">
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="text-center">
              <div className="text-[24px] text-primary mb-1">{userStats?.sessionCount || 0}</div>
              <div className="text-[12px] text-[#666666]">学习次数</div>
            </div>
            <div className="text-center">
              <div className="text-[24px] text-primary mb-1">{courseData.工法分类列表.length}</div>
              <div className="text-[12px] text-[#666666]">可学课程</div>
            </div>
            <div className="text-center">
              <div className="text-[24px] text-primary mb-1">{formatDuration(userStats?.totalDuration || 0)}</div>
              <div className="text-[12px] text-[#666666]">总学习时长</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 全局统计卡片 */}
      <div className="px-4 pb-4">
        <Card className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50">
          <h3 className="text-[#333333] mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            平台使用统计
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#666666] text-[12px] mb-1">
                <Users className="h-3 w-3" />
                总使用人数
              </div>
              <div className="text-[20px] text-primary font-semibold">{globalStats.totalUsers}</div>
            </div>
            <div>
              <div className="text-[#666666] text-[12px] mb-1">累计学习时长</div>
              <div className="text-[20px] text-primary font-semibold">{formatDuration(globalStats.totalDuration)}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 功能列表 */}
      <div className="px-4 pb-4 space-y-3">
        {menuItems.map((item) => (
          <Card
            key={item.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={item.onClick}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center`}
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[#333333] mb-1">{item.title}</h3>
                <p className="text-[12px] text-[#666666]">{item.subtitle}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-[#CCCCCC] flex-shrink-0" />
            </div>
          </Card>
        ))}
      </div>

      {/* 最近学习记录 */}
      <div className="px-4 pb-20">
        <h3 className="text-[#333333] mb-3">最近学习</h3>
        <Card className="divide-y divide-border">
          {courseData.工法分类列表.slice(0, 2).map((course, index) => (
            <div
              key={course.工法ID}
              className="p-3 cursor-pointer hover:bg-[#F5F5F5] transition-colors"
              onClick={() => onNavigate(`course-detail-${course.工法ID}`)}
            >
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-[#666666] mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-[#333333] mb-1">
                    {course.工法名称}
                  </p>
                  <p className="text-[12px] text-[#666666]">
                    {course.模块列表[0].模块名称}
                  </p>
                </div>
                <span className="text-[12px] text-[#999999] flex-shrink-0">
                  {index === 0 ? "2小时前" : "1天前"}
                </span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}