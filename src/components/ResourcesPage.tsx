import { ChevronLeft, Download, Play, FileText, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { courseData } from "../data/courseData";
import { useState } from "react";

interface ResourcesPageProps {
  onNavigate: (page: string) => void;
}

export function ResourcesPage({ onNavigate }: ResourcesPageProps) {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedBlueprint, setSelectedBlueprint] = useState<any>(null);
  
  // Get all videos from all courses
  const allVideos = courseData.工法分类列表.flatMap(course => 
    (course.工艺视频 || []).map((video: any) => ({
      ...video,
      courseName: course.工法名称
    }))
  );
  const brochures = [
    {
      id: 1,
      title: "产品宣传手册 2024版",
      description: "包含公司全系列产品介绍及技术参数",
      cover: "https://images.unsplash.com/photo-1682063631532-b865521538fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB0cmFpbmluZyUyMGNvdXJzZXxlbnwxfHx8fDE3NjMyNTQ4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      size: "12.5 MB",
    },
    {
      id: 2,
      title: "施工解决方案手册",
      description: "典型工程案例及施工技术方案汇编",
      cover: "https://images.unsplash.com/photo-1672748341520-6a839e6c05bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJ8ZW58MXx8fHwxNzYzMjM0NjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      size: "8.3 MB",
    },
    {
      id: 3,
      title: "企业资质证书合集",
      description: "包含各类资质证书及荣誉证明",
      cover: "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZW5naW5lZXJpbmd8ZW58MXx8fHwxNzYzMjU0ODk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      size: "5.7 MB",
    },
  ];

  const blueprints = [
    {
      id: 1,
      name: "标准站平面布置",
      version: "v1.0",
      format: "PDF",
      size: "未知",
      url: "https://ow365.cn/?i=36064&furl=http://axendo.cn:6019//file/4625f1f2-d432-4da5-9ce3-053edb818976.pdf",
      description: "地铁车站标准站平面布置图"
    },
    {
      id: 2,
      name: "预制方桩结构",
      version: "v1.0",
      format: "PDF",
      size: "未知",
      url: "https://ow365.cn/?i=36064&furl=http://axendo.cn:6019//file/2727a468-7d79-421f-a796-69da474fbde0.pdf",
      description: "预制方桩结构设计图纸"
    },
    {
      id: 3,
      name: "预制顶板结构",
      version: "v1.0",
      format: "PDF",
      size: "未知",
      url: "https://ow365.cn/?i=36064&furl=http://axendo.cn:6019//file/f682f95e-a0b1-40d3-b49b-3155a996a6c5.pdf",
      description: "预制顶板结构设计图纸"
    },
    {
      id: 4,
      name: "预制中柱结构",
      version: "v1.0",
      format: "PDF",
      size: "未知",
      url: "https://ow365.cn/?i=36064&furl=http://axendo.cn:6019//file/16365038-c9c5-49bf-9f7e-e78666be6f94.pdf",
      description: "预制中柱结构设计图纸"
    },
    {
      id: 5,
      name: "预制轨顶风道",
      version: "v1.0",
      format: "PDF",
      size: "未知",
      url: "https://ow365.cn/?i=36064&furl=http://axendo.cn:6019//file/0ec47765-b3ad-4e17-ab53-3d095fc42542.pdf",
      description: "预制轨顶风道设计图纸"
    },
    {
      id: 6,
      name: "预制站台板",
      version: "v1.0",
      format: "PDF",
      size: "未知",
      url: "https://ow365.cn/?i=36064&furl=http://axendo.cn:6019//file/d8dd4559-65f6-4962-824e-b9d8c1a008d7.pdf",
      description: "预制站台板设计图纸"
    },
    {
      id: 7,
      name: "车站防水做法",
      version: "v1.0",
      format: "PDF",
      size: "未知",
      url: "https://ow365.cn/?i=36064&furl=http://axendo.cn:6019//file/74a9b1f3-0f9c-49e3-b7bf-9b8ed98c05f8.pdf",
      description: "车站防水施工做法图纸"
    },
    {
      id: 8,
      name: "预留预埋",
      version: "v1.0",
      format: "PDF",
      size: "未知",
      url: "https://ow365.cn/?i=36064&furl=http://axendo.cn:6019//file/98db193e-9dfc-46db-acfe-7fa1aa458157.pdf",
      description: "预留预埋施工图纸"
    },
    {
      id: 9,
      name: "附录",
      version: "v1.0",
      format: "PDF",
      size: "未知",
      url: "https://ow365.cn/?i=36064&furl=http://axendo.cn:6019//file/74cf1399-6fef-4b79-bbff-1881fe204b0f.pdf",
      description: "附录资料及补充说明"
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
        <h1 className="text-[#333333]">资料库</h1>
      </div>

      {/* 标签页内容 */}
      <Tabs defaultValue="brochures" className="flex-1">
        <div className="bg-white border-b border-border">
          <TabsList className="w-full justify-start rounded-none h-12 bg-transparent p-0">
            <TabsTrigger
              value="brochures"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              宣传册
            </TabsTrigger>
            <TabsTrigger
              value="blueprints"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              设计图纸
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              工艺视频
            </TabsTrigger>
          </TabsList>
        </div>

        {/* 宣传册页 */}
        <TabsContent value="brochures" className="m-0 p-4 pb-20 space-y-3">
          {brochures.map((brochure) => (
            <Card key={brochure.id} className="overflow-hidden">
              <div className="flex gap-3 p-3">
                <div className="flex-shrink-0 w-24 aspect-[3/4] rounded overflow-hidden">
                  <img
                    src={brochure.cover}
                    alt={brochure.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="mb-1">{brochure.title}</h3>
                    <p className="text-[14px] text-[#666666] line-clamp-2">
                      {brochure.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[12px] text-[#666666]">
                      {brochure.size}
                    </span>
                    <Button
                      size="sm"
                      className="h-8 px-3 bg-primary hover:bg-primary/90"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      下载
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* 设计图纸页 */}
        <TabsContent value="blueprints" className="m-0 p-4 pb-20 space-y-2">
          {blueprints.map((blueprint) => (
            <Card
              key={blueprint.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedBlueprint(blueprint)}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded bg-[#E6F0FF] flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1">{blueprint.name}</h3>
                  <div className="flex items-center gap-2 text-[12px] text-[#666666]">
                    <Badge
                      variant="outline"
                      className="border-primary text-primary text-[10px] px-1.5"
                    >
                      {blueprint.version}
                    </Badge>
                    <span>{blueprint.format}</span>
                    <span>·</span>
                    <span>{blueprint.size}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-[12px] text-primary">
                  查看
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* 工艺视频页 */}
        <TabsContent value="videos" className="m-0 p-4 pb-20 space-y-3">
          {allVideos.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-[#999999]">暂无工艺视频</p>
            </Card>
          ) : (
            allVideos.map((video) => (
              <Card
                key={video.视频ID}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="flex gap-3 p-3">
                  <div className="relative flex-shrink-0 w-32 aspect-video rounded overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="h-5 w-5 text-primary ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h3 className="line-clamp-2 mb-1">{video.视频名称}</h3>
                    <p className="text-[12px] text-[#666666]">{video.courseName}</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Header */}
          <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-white/10">
            <h2 className="text-white text-[14px] line-clamp-1 flex-1">
              {selectedVideo.视频名称}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-white hover:bg-white/20"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Video Player */}
          <div className="flex-1 flex items-center justify-center bg-[#0a0a0a]">
            <video
              className="w-full h-full"
              controls
              autoPlay
              playsInline
              preload="auto"
              src={selectedVideo.视频URL}
              onError={(e) => {
                console.error('视频加载失败:', selectedVideo.视频URL);
                console.error('错误详情:', e);
              }}
            >
              <source src={selectedVideo.视频URL} type="video/mp4" />
              您的浏览器不支持视频播放
            </video>
          </div>
          
          {/* Video Info */}
          <div className="bg-[#1a1a1a] px-4 py-3 border-t border-white/10">
            <p className="text-white/70 text-[12px]">{selectedVideo.描述}</p>
            <p className="text-white/50 text-[10px] mt-1">课程: {selectedVideo.courseName}</p>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {selectedBlueprint && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Header */}
          <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-white/10">
            <h2 className="text-white text-[14px] line-clamp-1 flex-1">
              {selectedBlueprint.name}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-white hover:bg-white/20"
              onClick={() => setSelectedBlueprint(null)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* PDF Viewer */}
          <div className="flex-1 bg-[#2a2a2a] overflow-auto">
            <iframe
              src={selectedBlueprint.url}
              className="w-full h-full border-0"
              title={selectedBlueprint.name}
              style={{ minHeight: '100%' }}
            />
          </div>
          
          {/* Blueprint Info */}
          <div className="bg-[#1a1a1a] px-4 py-3 border-t border-white/10">
            <p className="text-white/70 text-[12px]">{selectedBlueprint.description}</p>
            <p className="text-white/50 text-[10px] mt-1">
              格式: {selectedBlueprint.format} · 版本: {selectedBlueprint.version}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
