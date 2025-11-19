import { ChevronLeft, Play, CheckCircle2, Circle, ChevronDown, FileText, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { courseData } from "../data/courseData";
import { Badge } from "./ui/badge";
import courseImage1 from "figma:asset/dcd42a7c51a3b4185877df87693d4d1fc892fc93.png";
import courseImage2 from "figma:asset/fd50b72c943a664dbf83476dd8f247bc4cba358e.png";
import courseImage3 from "figma:asset/6fe9a063cceb0b3f65e269f2108c5e01d241f7bc.png";

interface CourseDetailPageProps {
  onNavigate: (page: string) => void;
  courseId?: string;
}

export function CourseDetailPage({ onNavigate, courseId = "MF01" }: CourseDetailPageProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>(["MF01-M01"]);

  const course = courseData.工法分类列表.find(c => c.工法ID === courseId) || courseData.工法分类列表[0];
  
  const progress = courseId === "MF01" ? 45 : courseId === "MF02" ? 20 : 0;

  // 根据课程ID选择对应的图片
  const courseImages: Record<string, string> = {
    "MF01": courseImage1,
    "MF02": courseImage2,
    "MF03": courseImage3,
  };
  const currentCourseImage = courseImages[courseId] || courseImage1;

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getFunctionIcons = (functions: string[]) => {
    const iconMap: Record<string, JSX.Element> = {
      "图文展示": <FileText className="h-3.5 w-3.5" />,
      "交互标注": <span className="text-[10px]">🎯</span>,
      "交互清单": <span className="text-[10px]">📋</span>,
      "交互查询": <span className="text-[10px]">🔍</span>,
      "术语查询": <span className="text-[10px]">📖</span>,
      "表格展示": <span className="text-[10px]">📊</span>,
      "安全提示": <AlertTriangle className="h-3.5 w-3.5 text-[#FF9800]" />,
    };
    
    return functions.map((func, index) => (
      <span key={index} className="inline-flex items-center">
        {iconMap[func] || null}
      </span>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => onNavigate("courses")}
        >
          <ChevronLeft className="h-5 w-5 text-[#333333]" />
        </Button>
        <h1 className="text-[#333333] line-clamp-1 flex-1">{course.工法名称}</h1>
      </div>

      {/* 视频播放器区域 */}
      <div className="bg-black">
        <div className="relative aspect-video w-full">
          <img
            src={currentCourseImage}
            alt="Video"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Button
              size="icon"
              className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90"
            >
              <Play className="h-8 w-8 text-white" fill="white" />
            </Button>
          </div>
        </div>
      </div>

      {/* 课程进度 */}
      <div className="bg-white px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#333333]">学习进度</span>
          <span className="text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-[12px] text-[#666666] mt-2">
          共{course.模块列表.length}个模块 · {course.模块列表.reduce((sum, m) => sum + m.小节列表.length, 0)}个小节
        </p>
      </div>

      {/* 模块列表 */}
      <div className="flex-1 p-4 pb-20 space-y-3">
        {course.模块列表.map((module, moduleIndex) => (
          <Card key={module.模块ID} className="overflow-hidden">
            <Collapsible
              open={expandedModules.includes(module.模块ID)}
              onOpenChange={() => toggleModule(module.模块ID)}
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-4 hover:bg-[#F5F5F5] transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-[14px] text-primary">{moduleIndex + 1}</span>
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="text-[#333333]">{module.模块名称}</h3>
                      <p className="text-[12px] text-[#666666]">
                        {module.小节列表.length}个小节
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-[#666666] transition-transform flex-shrink-0 ${
                      expandedModules.includes(module.模块ID) ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border-t border-border">
                  {module.小节列表.map((lesson, index) => (
                    <div
                      key={lesson.小节ID}
                      className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-[#F5F5F5] transition-colors ${
                        index !== 0 ? "border-t border-border" : ""
                      }`}
                      onClick={() => {
                        // Navigate to first knowledge point of this lesson
                        if (lesson.知识点ID列表.length > 0) {
                          const knowledgeId = lesson.知识点ID列表[0];
                          // Extract module ID from "MF01-M01" -> "M01"
                          const moduleId = module.模块ID.split('-')[1];
                          // Format: knowledge-MF01-M01-1-1.1.1
                          onNavigate(`knowledge-${courseId}-${moduleId}-${knowledgeId}`);
                        }
                      }}
                    >
                      {/* 根据进度显示完成状态 - 简化逻辑：前几个小节显示为已完成 */}
                      {moduleIndex === 0 && index < 2 ? (
                        <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="h-5 w-5 text-[#CCCCCC] flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] text-[#333333] mb-1">
                          {lesson.小节名称}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1">
                            {getFunctionIcons(lesson.功能配置)}
                          </div>
                          <span className="text-[12px] text-[#666666]">
                            {lesson.知识点ID列表.length}个知识点
                          </span>
                          {lesson.功能配置.includes("安全提示") && (
                            <Badge variant="outline" className="border-[#FF9800] text-[#FF9800] text-[10px] h-5 px-1.5">
                              安全
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* 底部固定按钮 */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-border p-4">
        <Button className="w-full bg-primary hover:bg-primary/90 h-12">
          开始学习
        </Button>
      </div>
    </div>
  );
}