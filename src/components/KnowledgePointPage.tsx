/**
 * Knowledge Point Detail Page
 * 知识点详情页
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, BookOpen, Image as ImageIcon, FileDown, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { learningProgressManager } from '../utils/learningProgress';
import { courseData } from '../data/courseData';
import { getKnowledgeContent } from '../data/knowledgeContent';

interface KnowledgePointPageProps {
  onNavigate: (page: string) => void;
  mfId: string;
  moduleId: string;
  knowledgeId: string;
}

interface ContentSection {
  type: 'text' | 'list';
  title?: string;
  content?: string;
  items?: Array<{
    title: string;
    content: string;
  }>;
}

interface KnowledgeContent {
  knowledgeId: string;
  title: string;
  module: string;
  sections?: ContentSection[];
  content?: string[];
  images: string[];
  keyPoints?: string[];
  documents?: string[];
}

export function KnowledgePointPage({ 
  onNavigate, 
  mfId, 
  moduleId, 
  knowledgeId 
}: KnowledgePointPageProps) {
  const [content, setContent] = useState<KnowledgeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  // Get total points for the course
  const getTotalPoints = () => {
    const course = courseData.工法分类列表.find(c => c.工法ID === mfId);
    if (!course) return 0;
    return course.模块列表.reduce((total, module) => {
      return total + module.小节列表.reduce((sum, section) => {
        return sum + section.知识点ID列表.length;
      }, 0);
    }, 0);
  };

  useEffect(() => {
    loadContent();
    // Start point study tracking
    learningProgressManager.startPointStudy(knowledgeId);
    // Check if already completed
    const totalPoints = getTotalPoints();
    const completed = learningProgressManager.isPointCompleted(mfId, knowledgeId, totalPoints);
    setIsCompleted(completed);
  }, [mfId, moduleId, knowledgeId]);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get content from knowledge content database
      const knowledgeData = getKnowledgeContent(knowledgeId);
      
      if (knowledgeData) {
        // Convert to KnowledgeContent format
        setContent({
          knowledgeId,
          title: knowledgeData.title,
          module: moduleId,
          content: knowledgeData.content.split('\n\n').filter(p => p.trim()),
          images: knowledgeData.images || [],
          keyPoints: [],
          documents: []
        });
      } else {
        throw new Error('内容未找到');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载失败');
      console.error('Failed to load knowledge point:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteStudy = () => {
    if (isCompleted || isCompleting) return;
    
    setIsCompleting(true);
    
    const totalPoints = getTotalPoints();
    const result = learningProgressManager.completePointStudy(mfId, knowledgeId, totalPoints);
    
    if (result.success) {
      setIsCompleted(true);
      console.log('Knowledge point completed:', {
        pointId: knowledgeId,
        duration: result.duration,
        progress: result.progress.progress + '%',
        studyCount: result.progress.studyCount,
      });
    }
    
    setIsCompleting(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
        <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => onNavigate(`course-detail-${mfId}`)}
          >
            <ChevronLeft className="h-5 w-5 text-[#333333]" />
          </Button>
          <h1 className="text-[#333333]">加载中...</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#666666]">正在加载内容...</div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
        <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => onNavigate(`course-detail-${mfId}`)}
          >
            <ChevronLeft className="h-5 w-5 text-[#333333]" />
          </Button>
          <h1 className="text-[#333333]">加载失败</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-500">{error || '内容不存在'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => onNavigate(`course-detail-${mfId}`)}
        >
          <ChevronLeft className="h-5 w-5 text-[#333333]" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[#333333] line-clamp-1">{content.title}</h1>
          <p className="text-[12px] text-[#666666]">{content.module}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-4">
          {/* 模块标签 */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-[#E3F2FD] text-[#1976D2] border-[#1976D2]/20">
              <BookOpen className="h-3 w-3 mr-1" />
              {content.module}
            </Badge>
          </div>

          {/* 内容区域 */}
          {content.sections ? (
            // 新格式: sections
            content.sections.map((section, index) => (
              <Card key={index} className="p-4">
                {section.type === 'text' && (
                  <p className="text-[#333333] leading-relaxed">
                    {section.content}
                  </p>
                )}
                {section.type === 'list' && (
                  <div className="space-y-3">
                    {section.title && (
                      <h3 className="text-[#1976D2] font-semibold text-base mb-3">
                        {section.title}
                      </h3>
                    )}
                    <div className="space-y-3">
                      {section.items?.map((item, idx) => (
                        <div key={idx} className="border-l-3 border-[#1976D2] pl-4 py-2 bg-[#F5F5F5] rounded-r">
                          <h4 className="text-[#333333] font-medium mb-1">
                            {item.title}
                          </h4>
                          <p className="text-[#666666] text-sm leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))
          ) : (
            // 旧格式: content数组
            <Card className="p-4">
              <div className="prose prose-sm max-w-none">
                {Array.isArray(content.content) ? (
                  content.content.map((paragraph, index) => (
                    <p key={index} className="text-[#333333] leading-relaxed mb-2">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-[#333333] leading-relaxed">
                    {content.content}
                  </p>
                )}
              </div>
            </Card>
          )}

          {/* 关键要点 */}
          {content.keyPoints && content.keyPoints.length > 0 && (
            <Card className="p-4 bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB]">
              <h3 className="font-semibold text-[#1976D2] mb-3 flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
                关键要点
              </h3>
              <div className="space-y-2">
                {content.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1976D2] text-white text-xs flex items-center justify-center mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-[#333333] text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* 图片区域 */}
          {content.images && content.images.length > 0 && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="h-4 w-4 text-[#1976D2]" />
                <h3 className="font-medium text-[#333333]">相关图片</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {content.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border border-border bg-white">
                    <img
                      src={image}
                      alt={`图片 ${index + 1}`}
                      className="w-full h-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E图片加载失败%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* 底部完成学习按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 pb-safe">
        <Button
          className="w-full h-12"
          onClick={handleCompleteStudy}
          disabled={isCompleted || isCompleting}
          variant={isCompleted ? "outline" : "default"}
        >
          {isCompleting ? (
            "处理中..."
          ) : isCompleted ? (
            <>
              <CheckCircle2 className="h-5 w-5 mr-2" />
              已完成
            </>
          ) : (
            "完成学习"
          )}
        </Button>
      </div>
    </div>
  );
}
