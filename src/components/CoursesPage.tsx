import { ChevronLeft, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { courseData } from "../data/courseData";
import courseImage1 from "figma:asset/dcd42a7c51a3b4185877df87693d4d1fc892fc93.png";
import courseImage2 from "figma:asset/fd50b72c943a664dbf83476dd8f247bc4cba358e.png";
import courseImage3 from "figma:asset/6fe9a063cceb0b3f65e269f2108c5e01d241f7bc.png";

interface CoursesPageProps {
  onNavigate: (page: string) => void;
}

export function CoursesPage({ onNavigate }: CoursesPageProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "全部" },
    { id: "not-started", label: "未开始" },
    { id: "ongoing", label: "学习中" },
    { id: "completed", label: "已完成" },
  ];

  const courseImages = [courseImage1, courseImage2, courseImage3];

  const courses = courseData.工法分类列表.map((course, index) => {
    const totalLessons = course.模块列表.reduce((sum, m) => sum + m.小节列表.length, 0);
    const progress = [45, 20, 0][index] || 0;
    
    return {
      id: course.工法ID,
      title: course.工法名称,
      description: `${course.模块列表.length}个模块，${totalLessons}个小节`,
      image: courseImages[index],
      duration: `${Math.ceil(totalLessons * 15 / 60)}小时`,
      status: progress > 0 ? "ongoing" : "not-started",
      statusText: progress > 0 ? `已完成${progress}%` : "待开始",
      statusColor: progress > 0 ? "bg-primary" : "bg-[#666666]",
    };
  });

  const filteredCourses = courses.filter((course) => {
    if (activeFilter === "all") return true;
    return course.status === activeFilter;
  });

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
        <h1 className="text-[#333333]">课程列表</h1>
      </div>

      {/* 筛选器 */}
      <div className="bg-white px-4 py-3 border-b border-border">
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              size="sm"
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={
                activeFilter === filter.id
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white text-[#666666] hover:bg-[#F5F5F5]"
              }
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 课程列表 */}
      <div className="p-4 pb-20 space-y-3">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate(`course-detail-${course.id}`)}
          >
            <div className="flex gap-3 p-3">
              <div className="flex-shrink-0 w-32 aspect-video rounded overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-[14px] text-[#666666] line-clamp-2">
                    {course.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 text-[#666666]">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-[12px]">{course.duration}</span>
                  </div>
                  <Badge
                    className={`${course.statusColor} text-white border-0 text-[12px]`}
                  >
                    {course.statusText}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}