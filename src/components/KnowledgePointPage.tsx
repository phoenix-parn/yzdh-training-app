/**
 * Knowledge Point Detail Page
 * 知识点详情页
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, BookOpen, Image as ImageIcon, FileDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface KnowledgePointPageProps {
  onNavigate: (page: string) => void;
  mfId: string;
  moduleId: string;
  knowledgeId: string;
}

interface KnowledgeContent {
  knowledgeId: string;
  title: string;
  module: string;
  content: string;
  images: string[];
  documents: string[];
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

  useEffect(() => {
    loadContent();
  }, [mfId, moduleId, knowledgeId]);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `/course-materials/${mfId}/${moduleId}/content/${knowledgeId}.json`;
      console.log('Loading knowledge point:', { mfId, moduleId, knowledgeId, url });

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('加载失败');
      }

      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载失败');
      console.error('Failed to load knowledge point:', err);
    } finally {
      setLoading(false);
    }
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
        {/* Knowledge ID Badge */}
        <div className="bg-white px-4 py-3 border-b border-border">
          <Badge variant="outline" className="text-primary border-primary">
            <BookOpen className="h-3 w-3 mr-1" />
            {content.knowledgeId}
          </Badge>
        </div>

        {/* Text Content */}
        <div className="p-4">
          <Card className="p-4">
            <h3 className="text-[#333333] font-medium mb-3">内容详情</h3>
            <div className="text-[#666666] text-[14px] leading-relaxed whitespace-pre-wrap">
              {content.content}
            </div>
          </Card>
        </div>

        {/* Images */}
        {content.images && content.images.length > 0 && (
          <div className="px-4 pb-4">
            <Card className="p-4">
              <h3 className="text-[#333333] font-medium mb-3 flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                图片素材 ({content.images.length})
              </h3>
              <div className="space-y-3">
                {content.images.map((imagePath, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border border-border">
                    <img
                      src={imagePath}
                      alt={`图片 ${index + 1}`}
                      className="w-full h-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" fill="%23999">图片加载失败</text></svg>';
                      }}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Documents */}
        {content.documents && content.documents.length > 0 && (
          <div className="px-4 pb-4">
            <Card className="p-4">
              <h3 className="text-[#333333] font-medium mb-3 flex items-center gap-2">
                <FileDown className="h-4 w-4" />
                文档资料 ({content.documents.length})
              </h3>
              <div className="space-y-2">
                {content.documents.map((docPath, index) => {
                  const fileName = docPath.split('/').pop() || `文档${index + 1}`;
                  return (
                    <a
                      key={index}
                      href={docPath}
                      download
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-[#F5F5F5] transition-colors"
                    >
                      <FileDown className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-[#333333] text-[14px] flex-1">{fileName}</span>
                      <span className="text-[12px] text-[#999999]">下载</span>
                    </a>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {(!content.images || content.images.length === 0) && 
         (!content.documents || content.documents.length === 0) && 
         content.content === '内容待补充' && (
          <div className="px-4 pb-4">
            <Card className="p-8 text-center">
              <div className="text-[#999999] text-[14px]">
                该知识点内容正在完善中...
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
