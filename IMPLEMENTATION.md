# 轨道交通预制装配式施工技术培训APP - 实施说明

## 完成功能

### 1. 课程素材组织 ✅
- 已将3个工法的素材复制到 `public/course-materials/`
- 图片素材: 66个 (MF01已制作完成的图片)
- 知识点内容: 309个 (已转换为JSON格式)
- 素材索引: `materials-index.json`

**目录结构**:
```
public/course-materials/
├── MF01/
│   ├── M01/
│   │   ├── images/      # 4个图片
│   │   ├── content/     # 12个知识点JSON
│   │   └── docs/
│   ├── M02/             # 6个图片, 16个知识点
│   ├── M03/             # 7个图片, 16个知识点
│   └── M04/             # 5个图片, 10个知识点
├── MF02/                # 23个知识点
├── MF03/                # 26个知识点
└── materials-index.json
```

### 2. 登录功能 ✅
- 账号密码登录
- 硬编码测试账号(无需账号管理)
- 登录后才能访问课程

**测试账号**:
```
admin / 123456 (管理员)
user1 / 123456 (张三 - 施工员)
user2 / 123456 (李四 - 技术员)
test  / 123456 (测试用户 - 学员)
```

**实现文件**:
- `src/utils/auth.ts` - 认证工具
- `src/components/LoginPage.tsx` - 登录页面

### 3. 统计功能 ✅
- 模拟全局统计数据
- 实时记录个人学习时长
- 每60秒自动更新时长
- 显示在个人信息页面

**统计数据**:
- **全局**: 总使用人数156人, 累计学习时长12.7小时
- **个人**: 学习次数, 总学习时长(实时累加)
- **自动更新**: 每次打开app累加使用时长

**实现文件**:
- `src/utils/statistics.ts` - 统计工具
- `src/components/ProfilePage.tsx` - 个人中心(已更新)

### 4. App集成 ✅
- 登录状态检查
- 会话管理(自动开始/结束)
- 退出登录功能

**实现文件**:
- `src/App.tsx` - 主应用(已更新)

---

## 使用说明

### 1. 安装依赖
```bash
cd E:\CODE\SD-APP
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 访问应用
- 打开浏览器访问 `http://localhost:5173`
- 使用测试账号登录
- 开始使用培训系统

---

## 功能说明

### 登录流程
1. 打开应用自动显示登录页面
2. 输入用户名和密码
3. 登录成功后进入首页
4. 自动开始记录学习时长

### 统计功能
1. **个人统计**:
   - 学习次数: 每次登录+1
   - 总学习时长: 每60秒自动+1分钟
   - 显示在个人中心

2. **全局统计**:
   - 总使用人数: 156人(模拟数据)
   - 累计学习时长: 12.7小时起(实时累加)
   - 显示在个人中心

3. **时长计算**:
   - 登录时开始计时
   - 每60秒自动更新
   - 退出登录或关闭页面时结束计时

### 课程素材使用
1. **加载知识点内容**:
```typescript
const content = await fetch('/course-materials/MF01/M01/content/1-1.1.1.json')
  .then(res => res.json());
```

2. **显示图片**:
```tsx
<img src="/course-materials/MF01/M01/images/1-1.1.1_现浇vs预制对比表.png" />
```

3. **下载文档**:
```tsx
<a href="/course-materials/MF01/M01/docs/xxx.xlsx" download>下载文档</a>
```

---

## 数据存储

### LocalStorage结构
```typescript
// 当前登录用户
app_current_user: {
  username: string,
  name: string,
  role: string
}

// 用户统计数据
app_user_statistics: {
  userId: string,
  userName: string,
  totalDuration: number,      // 总学习时长(秒)
  sessionCount: number,        // 学习次数
  firstVisit: string,          // 首次访问时间
  lastVisit: string,           // 最后访问时间
  currentSessionStart: number  // 当前会话开始时间
}

// 全局统计数据
app_global_statistics: {
  totalUsers: 156,             // 总用户数(默认)
  totalDuration: 45820,        // 总时长(秒,实时累加)
  averageDuration: 294,        // 平均时长
  lastUpdated: string          // 最后更新时间
}
```

---

## 文件清单

### 新增文件
1. **工具类**:
   - `src/utils/auth.ts` - 认证工具
   - `src/utils/statistics.ts` - 统计工具

2. **组件**:
   - `src/components/LoginPage.tsx` - 登录页面

3. **素材**:
   - `public/course-materials/` - 课程素材目录
   - `public/course-materials/materials-index.json` - 素材索引
   - `public/course-materials/README.md` - 素材使用说明

4. **脚本**:
   - `copy_materials_to_frontend.py` - 素材复制脚本

### 修改文件
1. `src/App.tsx` - 添加登录和统计功能
2. `src/components/ProfilePage.tsx` - 显示真实统计数据

---

## 后续工作

### 待完成的素材
1. **MF02和MF03的图片素材** (43个):
   - 从原始图片中裁剪制作
   - 按照素材清单命名
   - 复制到对应模块目录

2. **文档素材** (26个):
   - Excel查询表
   - Word规范文档

### 功能扩展
1. **学习进度跟踪**:
   - 记录每个知识点的学习状态
   - 显示学习进度百分比

2. **收藏功能**:
   - 收藏知识点
   - 收藏列表管理

3. **下载管理**:
   - 离线下载课程
   - 下载进度显示

4. **设置功能**:
   - 修改密码
   - 清除缓存
   - 主题切换

---

## 技术栈

- **框架**: React 18 + Vite
- **UI**: Tailwind CSS + Radix UI
- **图标**: Lucide React
- **状态管理**: React Hooks
- **数据存储**: LocalStorage
- **路由**: 自定义页面导航

---

## 注意事项

1. **依赖安装**: 首次运行需要执行 `npm install`
2. **素材路径**: 所有素材路径都是相对于 `public/` 目录的绝对路径
3. **数据持久化**: 使用LocalStorage,清除浏览器数据会丢失统计信息
4. **测试账号**: 密码都是 `123456`,无需记忆
5. **时长统计**: 每60秒自动更新一次,关闭页面会保存当前时长

---

## 问题排查

### 登录失败
- 检查用户名和密码是否正确
- 打开浏览器控制台查看错误信息

### 统计数据不更新
- 检查LocalStorage是否被禁用
- 刷新页面重新登录

### 素材加载失败
- 检查 `public/course-materials/` 目录是否存在
- 检查素材文件路径是否正确
- 打开浏览器Network面板查看请求状态

---

**实施完成时间**: 2025-11-19  
**状态**: ✅ 核心功能已完成,可以开始使用和测试
