import { ChevronLeft, Download, Play, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";

interface ResourcesPageProps {
  onNavigate: (page: string) => void;
}

export function ResourcesPage({ onNavigate }: ResourcesPageProps) {
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
      name: "标准层结构施工图",
      version: "v2.3",
      format: "DWG",
      size: "3.2 MB",
    },
    {
      id: 2,
      name: "地下室防水节点详图",
      version: "v1.8",
      format: "PDF",
      size: "1.5 MB",
    },
    {
      id: 3,
      name: "钢结构连接节点图集",
      version: "v3.1",
      format: "DWG",
      size: "4.8 MB",
    },
    {
      id: 4,
      name: "装配式构件加工图",
      version: "v2.0",
      format: "PDF",
      size: "6.3 MB",
    },
  ];

  const videos = [
    {
      id: 1,
      title: "混凝土浇筑现场实录",
      thumbnail: "https://images.unsplash.com/photo-1682063631532-b865521538fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB0cmFpbmluZyUyMGNvdXJzZXxlbnwxfHx8fDE3NjMyNTQ4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "12:35",
    },
    {
      id: 2,
      title: "钢筋绑扎施工工艺",
      thumbnail: "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZW5naW5lZXJpbmd8ZW58MXx8fHwxNzYzMjU0ODk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "18:20",
    },
    {
      id: 3,
      title: "模板工程施工示范",
      thumbnail: "https://images.unsplash.com/photo-1672748341520-6a839e6c05bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJ8ZW58MXx8fHwxNzYzMjM0NjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "15:45",
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
                <Button
                  size="icon"
                  variant="ghost"
                  className="flex-shrink-0 h-9 w-9"
                >
                  <Download className="h-5 w-5 text-[#666666]" />
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* 工艺视频页 */}
        <TabsContent value="videos" className="m-0 p-4 pb-20 space-y-3">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3 p-3">
                <div className="relative flex-shrink-0 w-32 aspect-video rounded overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="h-5 w-5 text-primary ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-white text-[10px]">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1 flex items-center min-w-0">
                  <h3 className="line-clamp-2">{video.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
