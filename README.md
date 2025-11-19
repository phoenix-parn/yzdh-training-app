# 轨道交通预制拼装结构专业化培训系统

![Build Status](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Build%20Android%20APK/badge.svg)

一个用于轨道交通预制叠合车站施工技术的移动端培训应用,支持Android平台。

## 📱 功能特点

- ✅ **用户认证**: 账号密码登录,会话管理
- ✅ **课程学习**: 3个工法课程,27+知识点
- ✅ **多媒体内容**: 文字、图片、文档资料
- ✅ **学习统计**: 学习时长、学习次数自动记录
- ✅ **移动优化**: 适配Android手机,离线可用

## 🚀 快速开始

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3002
```

### 构建Web应用

```bash
# 构建生产版本
npm run build

# 输出目录: build/
```

### 构建Android APK

#### 方法1: 使用GitHub Actions (推荐)

1. 推送代码到GitHub
2. 自动构建APK
3. 从Actions下载

详见: [GitHub自动构建APK指南.md](./GitHub自动构建APK指南.md)

#### 方法2: 使用Android Studio

```bash
# 同步Capacitor
npx cap sync android

# 打开Android Studio
npx cap open android

# 在Android Studio中: Build → Build APK
```

详见: [Android打包说明.md](./Android打包说明.md)

## 📚 项目结构

```
SD-APP/
├── src/                        # 前端源代码
│   ├── components/            # React组件
│   │   ├── LoginPage.tsx     # 登录页面
│   │   ├── HomePage.tsx      # 首页
│   │   ├── CourseDetailPage.tsx  # 课程详情
│   │   ├── KnowledgePointPage.tsx  # 知识点详情
│   │   └── ProfilePage.tsx   # 个人中心
│   ├── utils/                # 工具函数
│   │   ├── auth.ts          # 认证工具
│   │   └── statistics.ts    # 统计工具
│   └── data/                # 数据配置
│       └── courseData.ts    # 课程数据
├── public/                   # 静态资源
│   └── course-materials/    # 课程素材
│       ├── MF01/           # 工法1素材
│       ├── MF02/           # 工法2素材
│       └── MF03/           # 工法3素材
├── android/                 # Android原生项目
├── .github/                # GitHub配置
│   └── workflows/          # GitHub Actions工作流
└── build/                  # 构建输出

```

## 🔑 测试账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| admin  | 123456 | 管理员 |
| user1  | 123456 | 施工员 |
| user2  | 123456 | 技术员 |
| test   | 123456 | 学员 |

## 📖 课程内容

### 工法1: 地铁超大异形预制构件安装施工工法
- **模块1**: 基础认知模块 (6个知识点)
- **模块2**: 核心技术模块 (8个知识点)
- **模块3**: 实操流程模块 (8个知识点)
- **模块4**: 保障体系模块 (5个知识点)

### 工法2: 地铁车站预制轨顶风道安装施工工法
- 23个知识点 (内容待完善)

### 工法3: 地铁车站预制楼梯安装施工工法
- 26个知识点 (内容待完善)

## 🛠️ 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite 6
- **UI组件**: Radix UI + TailwindCSS
- **状态管理**: React Hooks
- **路由**: 自定义路由管理

### 移动端
- **跨平台框架**: Capacitor 6
- **目标平台**: Android (API 22+)
- **WebView**: Android System WebView

### 开发工具
- **版本控制**: Git
- **CI/CD**: GitHub Actions
- **包管理**: npm

## 📦 构建产物

### Web应用
- **输出目录**: `build/`
- **大小**: 约2MB (压缩后)

### Android APK
- **Debug版本**: `app-debug.apk`
- **大小**: 约30-50MB
- **最小Android版本**: 5.1 (API 22)
- **目标Android版本**: 13 (API 33)

## 📝 开发指南

### 添加新课程内容

1. 准备素材文件(文字、图片、文档)
2. 更新 `courseData.ts`
3. 创建知识点JSON文件
4. 运行内容丰富脚本

详见: [学习功能使用指南.md](./学习功能使用指南.md)

### 更新应用

```bash
# 1. 修改代码
# 2. 构建前端
npm run build

# 3. 同步到Android
npx cap sync android

# 4. 提交代码
git add .
git commit -m "更新说明"
git push

# 5. 自动构建新APK
```

## 🐛 问题排查

### 常见问题

**Q: 登录后白屏?**
- 检查浏览器控制台错误
- 清除LocalStorage重试

**Q: 图片不显示?**
- 检查图片文件是否存在
- 检查路径是否正确

**Q: APK安装后闪退?**
- 检查Android版本(需5.1+)
- 查看Logcat日志

详见: [功能流程说明.md](./功能流程说明.md)

## 📄 文档

- [学习功能使用指南](./学习功能使用指南.md) - 用户使用说明
- [功能流程说明](./功能流程说明.md) - 功能流程图解
- [Android打包说明](./Android打包说明.md) - 本地打包指南
- [GitHub自动构建APK指南](./GitHub自动构建APK指南.md) - 云端构建指南
- [快速打包APK指南](./快速打包APK指南.md) - 快速入门
- [IMPLEMENTATION](./IMPLEMENTATION.md) - 技术实施文档

## 🤝 贡献

欢迎提交Issue和Pull Request!

## 📜 许可证

本项目仅供内部培训使用。

## 📧 联系方式

如有问题,请联系项目负责人。

---

**最后更新**: 2025-11-20  
**版本**: v1.0.0  
**状态**: ✅ 生产就绪