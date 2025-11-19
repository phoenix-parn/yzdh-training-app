import { ChevronLeft, Play, CheckCircle2, Circle, ChevronDown, FileText, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { courseData } from "../data/courseData";
import { Badge } from "./ui/badge";
import { learningProgressManager } from "../utils/learningProgress";
import courseImage1 from "figma:asset/dcd42a7c51a3b4185877df87693d4d1fc892fc93.png";
import courseImage2 from "figma:asset/fd50b72c943a664dbf83476dd8f247bc4cba358e.png";
import courseImage3 from "figma:asset/6fe9a063cceb0b3f65e269f2108c5e01d241f7bc.png";

interface CourseDetailPageProps {
  onNavigate: (page: string) => void;
  courseId?: string;
}

export function CourseDetailPage({ onNavigate, courseId = "MF01" }: CourseDetailPageProps) {
  const course = courseData.工法分类列表.find(c => c.工法ID === courseId) || courseData.工法分类列表[0];
  
  // 默认展开所有模块
  const allModuleIds = course.模块列表.map(m => m.模块ID);
  const [expandedModules, setExpandedModules] = useState<string[]>(allModuleIds);
  const [progress, setProgress] = useState(0);
  const [studyCount, setStudyCount] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  
  // Calculate total points
  const totalPoints = course.模块列表.reduce((total, module) => {
    return total + module.小节列表.reduce((sum, section) => {
      return sum + section.知识点ID列表.length;
    }, 0);
  }, 0);

  // Load progress data
  useEffect(() => {
    const progressData = learningProgressManager.getCourseProgress(courseId, totalPoints);
    setProgress(progressData.progress);
    setStudyCount(progressData.studyCount);
    setTotalDuration(progressData.totalDuration);
  }, [courseId, totalPoints]);

  // Check if a knowledge point is completed
  const isKnowledgePointCompleted = (pointId: string): boolean => {
    const progressData = learningProgressManager.getCourseProgress(courseId, totalPoints);
    return progressData.completedPoints.includes(pointId);
  };

  // Check if all knowledge points in a lesson are completed
  const isLessonCompleted = (knowledgePointIds: string[]): boolean => {
    return knowledgePointIds.every(id => isKnowledgePointCompleted(id));
  };

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

      {/* 课程预览图 */}
      <div className="bg-black">
        <div className="aspect-video w-full">
          <img
            src={currentCourseImage}
            alt="Course Preview"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 课程进度 */}
      <div className="bg-white px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#333333]">学习进度</span>
          <span className="text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex items-center justify-between mt-2 text-[12px] text-[#666666]">
          <span>共{totalPoints}个知识点</span>
          <span>·</span>
          <span>学习{studyCount}次</span>
          <span>·</span>
          <span>{learningProgressManager.formatDuration(totalDuration)}</span>
        </div>
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
                      {/* 根据实际完成情况显示状态图标 */}
                      {isLessonCompleted(lesson.知识点ID列表) ? (
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
    </div>
  );
}