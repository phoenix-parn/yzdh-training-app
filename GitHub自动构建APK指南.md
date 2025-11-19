# GitHub Actions 自动构建APK指南

## ✅ 已完成的配置

1. ✅ **GitHub Actions工作流** (`.github/workflows/android-build.yml`)
2. ✅ **Git忽略文件** (`.gitignore`)
3. ✅ **Capacitor配置** (`capacitor.config.json`)
4. ✅ **Android项目** (`android/`)

---

## 🚀 使用步骤

### 第1步: 创建GitHub仓库

#### 方法A: 在GitHub网站创建

1. 访问 https://github.com/new
2. 填写仓库信息:
   - **Repository name**: `sd-training-app` (或其他名称)
   - **Description**: 轨道交通预制拼装结构培训系统
   - **Visibility**: Private (私有) 或 Public (公开)
3. **不要**勾选 "Add a README file"
4. 点击 "Create repository"

#### 方法B: 使用GitHub Desktop

1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 打开GitHub Desktop
3. File → New Repository
4. 填写仓库信息并创建

---

### 第2步: 初始化Git仓库并推送代码

在项目目录下运行以下命令:

```bash
cd E:\CODE\SD-APP

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: 轨道交通培训系统"

# 添加远程仓库 (替换YOUR_USERNAME和YOUR_REPO为你的实际值)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

**示例**:
```bash
# 如果你的GitHub用户名是 zhangsan，仓库名是 sd-training-app
git remote add origin https://github.com/zhangsan/sd-training-app.git
```

---

### 第3步: 等待自动构建

推送代码后:

1. 访问你的GitHub仓库页面
2. 点击 "Actions" 标签
3. 你会看到一个正在运行的工作流 "Build Android APK"
4. 点击进入查看构建进度
5. 等待约5-10分钟完成构建

**构建过程**:
- ✅ 检出代码
- ✅ 安装Node.js
- ✅ 安装依赖
- ✅ 构建前端
- ✅ 配置Java和Android SDK
- ✅ 同步Capacitor
- ✅ 构建APK

---

### 第4步: 下载APK

构建完成后:

1. 在Actions页面,点击完成的工作流
2. 滚动到页面底部的 "Artifacts" 部分
3. 点击 "app-debug" 下载APK压缩包
4. 解压得到 `app-debug.apk`

**APK位置**: 下载的ZIP文件中包含 `app-debug.apk`

---

## 📋 详细命令说明

### 首次推送代码

```bash
# 1. 进入项目目录
cd E:\CODE\SD-APP

# 2. 初始化Git (如果还没有)
git init

# 3. 配置用户信息 (首次使用Git需要)
git config user.name "你的名字"
git config user.email "你的邮箱@example.com"

# 4. 添加所有文件到暂存区
git add .

# 5. 查看状态 (可选)
git status

# 6. 提交代码
git commit -m "Initial commit: 轨道交通培训系统"

# 7. 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 8. 推送到GitHub
git branch -M main
git push -u origin main
```

### 后续更新代码

每次修改代码后:

```bash
cd E:\CODE\SD-APP

# 1. 查看修改的文件
git status

# 2. 添加修改的文件
git add .

# 3. 提交修改
git commit -m "描述你的修改内容"

# 4. 推送到GitHub
git push
```

推送后会自动触发构建,生成新的APK。

---

## 🔄 自动构建触发条件

GitHub Actions会在以下情况自动构建APK:

1. **推送代码到main/master分支**
   ```bash
   git push origin main
   ```

2. **创建Pull Request**
   - 合并代码前会自动构建测试

3. **手动触发**
   - 在GitHub Actions页面点击 "Run workflow"

4. **创建版本标签** (可选)
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
   这会创建一个Release并附带APK下载链接

---

## 📦 构建产物说明

### Artifacts (构建产物)

每次构建成功后,会生成以下产物:

- **名称**: `app-debug`
- **内容**: `app-debug.apk`
- **大小**: 约30-50MB
- **保留时间**: 30天

### 下载方式

**方法1: 从Actions页面下载**
1. GitHub仓库 → Actions
2. 选择一个完成的工作流
3. 滚动到底部 → Artifacts
4. 点击 `app-debug` 下载

**方法2: 使用GitHub CLI** (高级)
```bash
gh run download
```

---

## 🏷️ 创建正式版本 (Release)

### 创建带版本号的Release

```bash
cd E:\CODE\SD-APP

# 1. 确保代码已提交
git add .
git commit -m "Release v1.0.0"

# 2. 创建标签
git tag -a v1.0.0 -m "Version 1.0.0 - 首次发布"

# 3. 推送标签
git push origin v1.0.0
```

这会自动:
- 触发构建
- 创建GitHub Release
- 附带APK下载链接

### 查看Release

1. 访问仓库页面
2. 点击右侧的 "Releases"
3. 可以看到所有版本和对应的APK下载链接

---

## 🔧 常见问题

### Q1: 推送代码时要求输入用户名密码?

**A**: GitHub已不支持密码认证,需要使用Personal Access Token:

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 生成并复制token
5. 推送时使用token作为密码

**或者使用SSH**:
```bash
# 生成SSH密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 添加到GitHub: Settings → SSH and GPG keys
# 修改远程仓库URL
git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
```

### Q2: Actions构建失败?

**A**: 查看错误日志:
1. 点击失败的工作流
2. 点击失败的步骤查看详细错误
3. 常见错误:
   - 依赖安装失败: 检查`package.json`
   - 构建失败: 检查代码是否有错误
   - Gradle错误: 检查Android配置

### Q3: 如何查看构建日志?

**A**: 
1. GitHub仓库 → Actions
2. 点击任意工作流
3. 点击左侧的步骤名称查看详细日志

### Q4: 构建很慢怎么办?

**A**: 
- 首次构建需要下载依赖,约5-10分钟
- 后续构建会使用缓存,约2-3分钟
- GitHub Actions免费版每月2000分钟额度

### Q5: 如何下载历史版本的APK?

**A**: 
1. Actions → 选择历史工作流
2. 下载对应的Artifacts
3. 或者从Releases页面下载带标签的版本

---

## 📊 构建状态徽章

在README.md中添加构建状态徽章:

```markdown
![Build Status](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Build%20Android%20APK/badge.svg)
```

显示效果: ![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

---

## 🎯 工作流配置说明

### 文件位置
```
.github/
└── workflows/
    └── android-build.yml
```

### 主要步骤

1. **Checkout code**: 检出代码
2. **Setup Node.js**: 配置Node.js环境
3. **Install dependencies**: 安装npm依赖
4. **Build web app**: 构建前端项目
5. **Setup Java**: 配置Java环境
6. **Setup Android SDK**: 配置Android SDK
7. **Sync Capacitor**: 同步Capacitor
8. **Build APK**: 构建Android APK
9. **Upload APK**: 上传APK作为构建产物

### 自定义配置

编辑 `.github/workflows/android-build.yml`:

```yaml
# 修改触发分支
on:
  push:
    branches: [ main, develop ]  # 添加develop分支

# 修改Node.js版本
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # 改为Node 20

# 修改保留时间
- name: Upload APK
  uses: actions/upload-artifact@v4
  with:
    retention-days: 60  # 改为60天
```

---

## 📱 测试APK

### 1. 下载APK到手机

**方法A: 直接在手机浏览器下载**
- 在手机上访问GitHub仓库
- Actions → 选择工作流 → 下载Artifacts

**方法B: 电脑下载后传输**
- 在电脑上下载APK
- 通过USB、微信、网盘等传输到手机

### 2. 安装APK

1. 在手机上找到APK文件
2. 点击安装
3. 允许安装未知来源应用
4. 完成安装

### 3. 测试功能

- ✅ 登录功能
- ✅ 课程浏览
- ✅ 知识点查看
- ✅ 图片加载
- ✅ 统计功能

---

## 🔄 更新流程

### 日常开发流程

```bash
# 1. 修改代码
# 编辑前端代码...

# 2. 本地测试
npm run dev

# 3. 提交代码
git add .
git commit -m "修复了XXX问题"
git push

# 4. 等待自动构建
# 访问GitHub Actions查看进度

# 5. 下载新的APK
# 从Artifacts下载

# 6. 测试新版本
# 安装到手机测试
```

### 版本发布流程

```bash
# 1. 确保所有功能已测试
npm run build

# 2. 更新版本号
# 编辑 package.json 中的 version

# 3. 提交并打标签
git add .
git commit -m "Release v1.1.0"
git tag v1.1.0
git push origin main
git push origin v1.1.0

# 4. 等待构建完成
# 自动创建Release

# 5. 在GitHub Releases页面查看
# 可以编辑Release说明
```

---

## 📚 相关资源

### 文档
- [GitHub Actions文档](https://docs.github.com/en/actions)
- [Capacitor文档](https://capacitorjs.com/docs)
- [Git教程](https://git-scm.com/book/zh/v2)

### 工具
- [GitHub Desktop](https://desktop.github.com/) - Git图形界面工具
- [GitHub CLI](https://cli.github.com/) - GitHub命令行工具
- [Git for Windows](https://git-scm.com/download/win) - Git命令行工具

---

## ✅ 检查清单

推送代码前检查:

- [ ] 代码已在本地测试通过
- [ ] `.gitignore` 文件已配置
- [ ] 敏感信息已移除(密码、密钥等)
- [ ] `package.json` 版本号已更新
- [ ] 提交信息清晰明确

构建完成后检查:

- [ ] Actions工作流全部通过
- [ ] APK已成功生成
- [ ] APK大小合理(30-50MB)
- [ ] 下载并测试APK
- [ ] 所有功能正常工作

---

## 🎉 快速开始

### 最简单的3步:

```bash
# 1. 在GitHub创建仓库
# 访问 https://github.com/new

# 2. 推送代码
cd E:\CODE\SD-APP
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# 3. 下载APK
# GitHub → Actions → 选择工作流 → 下载 app-debug
```

---

**需要帮助?** 
- 查看GitHub Actions日志
- 检查错误信息
- 或者告诉我遇到的问题!

**最后更新**: 2025-11-20  
**状态**: ✅ GitHub Actions已配置完成
