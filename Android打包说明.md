# Android APK 打包说明

## ✅ 已完成的配置

### 1. Capacitor 初始化
- ✅ 安装了 @capacitor/core 和 @capacitor/cli
- ✅ 安装了 @capacitor/android
- ✅ 初始化了 Capacitor 配置
- ✅ 添加了 Android 平台

### 2. 应用信息
- **应用名称**: 轨道交通培训系统
- **包名**: com.jiaotou.training
- **Web目录**: build

### 3. 项目结构
```
E:\CODE\SD-APP\
├── android/                    # Android原生项目目录
│   ├── app/
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── assets/
│   │   │       │   └── public/  # Web资源文件
│   │   │       └── AndroidManifest.xml
│   │   └── build.gradle
│   ├── build.gradle
│   └── gradle/
├── build/                      # 前端构建输出目录
├── capacitor.config.json       # Capacitor配置文件
└── package.json
```

---

## 📱 生成APK的方法

### 方法1: 使用Android Studio (推荐)

#### 前提条件
1. 安装 [Android Studio](https://developer.android.com/studio)
2. 安装 Android SDK (API Level 22+)
3. 配置 ANDROID_HOME 环境变量

#### 步骤

**1. 同步Web资源到Android项目**
```bash
cd E:\CODE\SD-APP
npx cap sync android
```

**2. 打开Android Studio**
```bash
npx cap open android
```

**3. 在Android Studio中构建APK**
- 点击菜单: `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
- 等待构建完成
- 点击通知中的 `locate` 查看APK位置

**4. APK输出位置**
```
E:\CODE\SD-APP\android\app\build\outputs\apk\debug\app-debug.apk
```

---

### 方法2: 使用命令行 (需要Android SDK)

#### 前提条件
1. 安装 Android SDK
2. 配置环境变量:
   - `ANDROID_HOME`: Android SDK路径
   - `JAVA_HOME`: JDK路径

#### 步骤

**1. 同步资源**
```bash
cd E:\CODE\SD-APP
npx cap sync android
```

**2. 构建Debug APK**
```bash
cd android
gradlew assembleDebug
```

**3. 构建Release APK (需要签名)**
```bash
cd android
gradlew assembleRelease
```

**4. APK输出位置**
- Debug版本: `android\app\build\outputs\apk\debug\app-debug.apk`
- Release版本: `android\app\build\outputs\apk\release\app-release-unsigned.apk`

---

### 方法3: 在线打包服务 (最简单)

如果没有Android开发环境,可以使用在线打包服务:

1. **Ionic Appflow** (推荐)
   - 网址: https://ionic.io/appflow
   - 支持云端构建APK
   - 需要注册账号

2. **PhoneGap Build**
   - 网址: https://build.phonegap.com/
   - 上传代码即可构建

---

## 🔧 常用命令

### 开发调试
```bash
# 同步Web资源到Android
npx cap sync android

# 打开Android Studio
npx cap open android

# 在设备上运行
npx cap run android
```

### 更新Web资源
```bash
# 1. 构建前端项目
npm run build

# 2. 复制到Android项目
npx cap copy android

# 3. 同步配置和插件
npx cap sync android
```

---

## 📝 签名配置 (Release版本)

### 1. 生成签名密钥

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 2. 配置签名

编辑 `android/app/build.gradle`:

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file("my-release-key.keystore")
            storePassword "your-password"
            keyAlias "my-key-alias"
            keyPassword "your-password"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 3. 构建签名APK

```bash
cd android
gradlew assembleRelease
```

---

## 🎨 应用图标和启动屏幕

### 1. 准备图标资源

在 `android/app/src/main/res/` 目录下放置不同尺寸的图标:

```
res/
├── mipmap-hdpi/
│   └── ic_launcher.png (72x72)
├── mipmap-mdpi/
│   └── ic_launcher.png (48x48)
├── mipmap-xhdpi/
│   └── ic_launcher.png (96x96)
├── mipmap-xxhdpi/
│   └── ic_launcher.png (144x144)
└── mipmap-xxxhdpi/
    └── ic_launcher.png (192x192)
```

### 2. 配置启动屏幕

编辑 `android/app/src/main/res/values/styles.xml`:

```xml
<resources>
    <style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
        <item name="android:background">@drawable/splash</item>
    </style>
</resources>
```

---

## 🔍 常见问题

### 问题1: Android Studio找不到SDK

**解决方法**:
1. 打开Android Studio
2. File → Settings → Appearance & Behavior → System Settings → Android SDK
3. 安装至少一个API Level (推荐API 33+)

### 问题2: Gradle构建失败

**解决方法**:
```bash
cd android
gradlew clean
gradlew assembleDebug
```

### 问题3: APK安装后白屏

**原因**: Web资源未正确复制

**解决方法**:
```bash
npm run build
npx cap sync android
```

### 问题4: 权限问题

编辑 `android/app/src/main/AndroidManifest.xml` 添加所需权限:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

---

## 📦 快速打包流程 (推荐)

### 使用Android Studio (最简单)

```bash
# 1. 构建前端
npm run build

# 2. 同步到Android
npx cap sync android

# 3. 打开Android Studio
npx cap open android

# 4. 在Android Studio中:
#    - 等待Gradle同步完成
#    - 点击 Build → Build Bundle(s) / APK(s) → Build APK(s)
#    - 等待构建完成
#    - 点击通知中的 "locate" 找到APK文件
```

### APK位置
```
E:\CODE\SD-APP\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🚀 下一步

1. **安装Android Studio** (如果还没有)
   - 下载: https://developer.android.com/studio
   - 安装Android SDK

2. **打开项目**
   ```bash
   npx cap open android
   ```

3. **构建APK**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)

4. **测试APK**
   - 将APK传输到Android手机
   - 安装并测试

---

## 📱 APK信息

- **应用名称**: 轨道交通培训系统
- **包名**: com.jiaotou.training
- **最小Android版本**: Android 5.1 (API 22)
- **目标Android版本**: Android 13 (API 33)

---

**最后更新**: 2025-11-20  
**状态**: ✅ Android项目已配置完成,可以开始打包
