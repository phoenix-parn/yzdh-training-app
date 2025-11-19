# 快速打包APK指南

## 🎯 当前状态

✅ **已完成**:
- Capacitor已配置
- Android项目已创建
- 前端代码已构建
- Web资源已同步到Android项目

📁 **Android项目位置**: `E:\CODE\SD-APP\android\`

---

## 🚀 三种打包方法

### 方法1: 使用Android Studio (推荐 - 最简单)

#### 步骤1: 安装Android Studio

1. **下载Android Studio**
   - 官网: https://developer.android.com/studio
   - 中文镜像: https://developer.android.google.cn/studio
   - 大小: 约1GB

2. **安装Android Studio**
   - 运行安装程序
   - 选择"Standard"安装类型
   - 等待下载Android SDK (约3-5GB)

#### 步骤2: 打开项目

```bash
cd E:\CODE\SD-APP
npx cap open android
```

或者直接在Android Studio中:
- File → Open
- 选择 `E:\CODE\SD-APP\android` 目录

#### 步骤3: 构建APK

1. 等待Gradle同步完成(首次需要下载依赖,约5-10分钟)
2. 点击菜单: `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
3. 等待构建完成(约1-3分钟)
4. 点击通知中的 `locate` 查看APK

#### APK位置
```
E:\CODE\SD-APP\android\app\build\outputs\apk\debug\app-debug.apk
```

---

### 方法2: 使用在线打包服务 (无需安装任何工具)

#### 选项A: Capacitor Cloud Build (推荐)

**暂不可用** - Capacitor官方云构建服务正在开发中

#### 选项B: 使用GitHub Actions自动构建

我可以帮你配置GitHub Actions,每次提交代码自动构建APK。

**优点**:
- 无需本地安装Android Studio
- 自动化构建
- 构建历史记录

**步骤**:
1. 将代码推送到GitHub
2. 配置GitHub Actions工作流
3. 每次推送自动构建APK
4. 从GitHub下载构建好的APK

#### 选项C: 使用第三方打包服务

**AppGyver** (免费):
- 网址: https://www.appgyver.com/
- 上传项目代码
- 在线构建APK

**Ionic Appflow** (付费):
- 网址: https://ionic.io/appflow
- 专业的移动应用CI/CD平台
- 支持自动构建和发布

---

### 方法3: 使用命令行 (需要配置环境)

#### 前提条件

1. **安装JDK**
   - 下载: https://www.oracle.com/java/technologies/downloads/
   - 版本: JDK 11 或更高

2. **安装Android SDK**
   - 通过Android Studio安装(推荐)
   - 或下载命令行工具: https://developer.android.com/studio#command-tools

3. **配置环境变量**
   ```powershell
   # 设置ANDROID_HOME
   [System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\你的用户名\AppData\Local\Android\Sdk", "User")
   
   # 设置JAVA_HOME
   [System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Java\jdk-11", "User")
   ```

#### 构建命令

```bash
cd E:\CODE\SD-APP\android
.\gradlew assembleDebug
```

---

## 📦 推荐方案: 使用Android Studio

### 为什么推荐Android Studio?

✅ **优点**:
- 图形界面,操作简单
- 自动管理SDK和依赖
- 可以直接在模拟器测试
- 错误提示清晰
- 支持调试

❌ **缺点**:
- 需要下载约4-5GB文件
- 首次构建较慢

### 详细安装步骤

#### 1. 下载Android Studio

访问: https://developer.android.com/studio

或使用中国镜像:
- 清华大学镜像: https://mirrors.tuna.tsinghua.edu.cn/android-studio/
- 中科大镜像: https://mirrors.ustc.edu.cn/android-studio/

#### 2. 安装Android Studio

1. 运行安装程序 `android-studio-xxx.exe`
2. 选择安装位置(建议至少10GB空间)
3. 选择"Standard"安装类型
4. 等待下载Android SDK组件

#### 3. 首次启动配置

1. 启动Android Studio
2. 选择"Do not import settings"
3. 完成初始配置向导
4. 等待下载SDK组件(约3-5GB)

#### 4. 打开项目

```bash
cd E:\CODE\SD-APP
npx cap open android
```

或在Android Studio中:
- File → Open
- 选择 `E:\CODE\SD-APP\android`

#### 5. 等待Gradle同步

首次打开项目会自动下载Gradle和依赖,需要5-10分钟。

#### 6. 构建APK

1. 点击菜单: `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
2. 等待构建完成
3. 点击通知栏的 `locate` 找到APK文件

---

## 🎯 最简单的方案: GitHub Actions自动构建

如果不想安装Android Studio,我可以帮你配置GitHub Actions。

### 优势
- ✅ 无需本地安装任何工具
- ✅ 自动化构建
- ✅ 每次代码更新自动生成新APK
- ✅ 可以下载历史版本APK

### 需要
- GitHub账号(免费)
- 将代码推送到GitHub仓库

### 配置步骤

我可以创建GitHub Actions配置文件,你只需要:
1. 创建GitHub仓库
2. 推送代码
3. 等待自动构建完成
4. 下载APK

**需要我帮你配置GitHub Actions吗?**

---

## 📱 APK安装和测试

### 1. 将APK传输到手机

**方法A: USB传输**
- 用USB线连接手机和电脑
- 将APK复制到手机存储

**方法B: 通过网盘**
- 上传APK到百度网盘/微云等
- 在手机上下载

**方法C: 通过微信/QQ**
- 将APK发送到微信文件传输助手
- 在手机上接收

### 2. 安装APK

1. 在手机上找到APK文件
2. 点击安装
3. 如果提示"未知来源",需要在设置中允许安装未知应用
4. 完成安装

### 3. 测试应用

- 打开应用
- 测试登录功能
- 测试课程浏览
- 测试知识点查看
- 检查图片加载
- 测试统计功能

---

## 🔧 更新APK流程

每次修改代码后,需要重新构建APK:

```bash
# 1. 修改前端代码
# 2. 构建前端
npm run build

# 3. 同步到Android
npx cap sync android

# 4. 重新构建APK
# 在Android Studio中: Build → Build APK
# 或使用命令行: cd android && gradlew assembleDebug
```

---

## 📊 构建时间估算

| 步骤 | 首次 | 后续 |
|------|------|------|
| 安装Android Studio | 30分钟 | - |
| 下载SDK | 20分钟 | - |
| 打开项目 | 10分钟 | 1分钟 |
| 构建APK | 3分钟 | 1分钟 |
| **总计** | **约1小时** | **约2分钟** |

---

## ❓ 常见问题

### Q1: 必须安装Android Studio吗?

**A**: 不是必须,但强烈推荐。其他方案:
- 使用GitHub Actions(无需本地工具)
- 使用命令行工具(需要配置环境)
- 使用在线打包服务(功能有限)

### Q2: APK很大怎么办?

**A**: 当前APK约30-50MB,主要包含:
- Web资源(图片、JS、CSS)
- Android运行时

优化方法:
- 压缩图片
- 启用代码混淆
- 使用App Bundle代替APK

### Q3: 如何生成正式版APK?

**A**: 需要签名密钥:
```bash
# 1. 生成密钥
keytool -genkey -v -keystore release.keystore -alias mykey -keyalg RSA -keysize 2048 -validity 10000

# 2. 配置签名(见"Android打包说明.md")

# 3. 构建Release版本
cd android
gradlew assembleRelease
```

### Q4: APK安装后白屏?

**A**: 检查:
1. Web资源是否正确同步: `npx cap sync android`
2. 网络权限是否添加(AndroidManifest.xml)
3. 在Chrome中访问 `chrome://inspect` 调试WebView

---

## 🎉 下一步行动

### 选择你的方案:

**方案A: 安装Android Studio (推荐)**
1. 下载Android Studio
2. 安装并配置
3. 打开项目
4. 构建APK

**方案B: 使用GitHub Actions**
1. 告诉我,我帮你配置
2. 推送代码到GitHub
3. 等待自动构建
4. 下载APK

**方案C: 寻求帮助**
- 找有Android Studio的同事帮忙构建
- 或者我可以提供更详细的指导

---

**需要我帮你做什么?**
1. 配置GitHub Actions自动构建?
2. 提供更详细的Android Studio安装指导?
3. 解决具体的构建问题?

请告诉我你的选择!
