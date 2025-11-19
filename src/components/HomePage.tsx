import { Bell, User, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { courseData } from "../data/courseData";
import courseImage1 from "figma:asset/dcd42a7c51a3b4185877df87693d4d1fc892fc93.png";
import courseImage2 from "figma:asset/fd50b72c943a664dbf83476dd8f247bc4cba358e.png";
import courseImage3 from "figma:asset/6fe9a063cceb0b3f65e269f2108c5e01d241f7bc.png";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const courseImages = [courseImage1, courseImage2, courseImage3];

  const bannerImages = [courseImage1, courseImage2];

  const ongoingCourses = courseData.工法分类列表.slice(0, 2).map((course, index) => ({
    id: course.工法ID,
    title: course.工法名称,
    image: courseImages[index],
    progress: index === 0 ? 45 : 20,
  }));

  const categories = [
    { id: 1, name: "全部课程", icon: "📚" },
    { id: 2, name: "施工工艺", icon: "🏗️" },
    { id: 3, name: "设计图纸", icon: "📐" },
    { id: 4, name: "宣传资料", icon: "📋" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-border">
        <h1 className="text-[#333333]">学习中心</h1>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-5 w-5 text-[#666666]" />
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              张
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Banner区域 */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative aspect-[2.5/1] rounded-lg overflow-hidden">
          <img
            src={bannerImages[0]}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
            <p className="text-white">{courseData.课程总名称} {courseData.课程版本}</p>
          </div>
        </div>
        <div className="flex justify-center gap-1.5 mt-2">
          <div className="w-6 h-1 rounded-full bg-primary" />
          <div className="w-6 h-1 rounded-full bg-[#E0E0E0]" />
          <div className="w-6 h-1 rounded-full bg-[#E0E0E0]" />
        </div>
      </div>

      {/* 在学课程区块 */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#333333]">在学课程</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#0052FF] h-auto p-0 hover:bg-transparent"
            onClick={() => onNavigate("courses")}
          >
            查看全部
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {ongoingCourses.map((course) => (
            <Card
              key={course.id}
              className="flex-shrink-0 w-[240px] overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate("course-detail")}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="mb-2 line-clamp-2">{course.title}</h3>
                <div className="space-y-2">
                  <Progress value={course.progress} className="h-1.5" />
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#666666]">
                      已学习 {course.progress}%
                    </span>
                    <Button
                      size="sm"
                      className="h-7 px-3 bg-primary hover:bg-primary/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(`course-detail-${course.id}`);
                      }}
                    >
                      继续学习
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 课程分类区块 */}
      <div className="px-4 pt-4 pb-20">
        <h2 className="text-[#333333] mb-3">工法分类</h2>
        <div className="space-y-3">
          {courseData.工法分类列表.map((course) => (
            <Card
              key={course.工法ID}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate(`course-detail-${course.工法ID}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-[#333333] mb-1">{course.工法名称}</h3>
                  <p className="text-[12px] text-[#666666]">
                    共{course.模块列表.length}个模块 · {course.模块列表.reduce((sum, m) => sum + m.小节列表.length, 0)}个小节
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-[#CCCCCC] flex-shrink-0 ml-2" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}