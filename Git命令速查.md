# Git命令速查表

## 🚀 首次推送到GitHub

### 步骤1: 在GitHub创建仓库
访问: https://github.com/new
- 仓库名称: `sd-training-app` (或其他)
- 可见性: Private 或 Public
- **不要**勾选 "Add a README file"

### 步骤2: 配置Git用户信息 (首次使用)
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"
```

### 步骤3: 初始化并推送
```bash
cd E:\CODE\SD-APP

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 轨道交通培训系统"

# 添加远程仓库 (替换YOUR_USERNAME和YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 推送
git branch -M main
git push -u origin main
```

---

## 📝 日常更新代码

```bash
cd E:\CODE\SD-APP

# 1. 查看修改状态
git status

# 2. 添加修改的文件
git add .

# 3. 提交修改
git commit -m "描述你的修改"

# 4. 推送到GitHub
git push
```

---

## 🏷️ 创建版本标签

```bash
# 创建标签
git tag -a v1.0.0 -m "Version 1.0.0"

# 推送标签
git push origin v1.0.0

# 查看所有标签
git tag
```

---

## 🔄 常用命令

### 查看状态
```bash
# 查看当前状态
git status

# 查看提交历史
git log

# 查看简洁历史
git log --oneline
```

### 分支操作
```bash
# 查看分支
git branch

# 创建分支
git branch feature-name

# 切换分支
git checkout feature-name

# 创建并切换分支
git checkout -b feature-name

# 合并分支
git merge feature-name
```

### 远程操作
```bash
# 查看远程仓库
git remote -v

# 拉取最新代码
git pull

# 推送代码
git push

# 推送到指定分支
git push origin main
```

---

## 🔧 问题解决

### 推送时要求输入密码
GitHub已不支持密码认证,需要使用Personal Access Token:

1. 访问: https://github.com/settings/tokens
2. Generate new token (classic)
3. 勾选 `repo` 权限
4. 生成并复制token
5. 推送时使用token作为密码

### 修改远程仓库地址
```bash
# 查看当前远程地址
git remote -v

# 修改远程地址
git remote set-url origin https://github.com/NEW_USERNAME/NEW_REPO.git
```

### 撤销修改
```bash
# 撤销工作区修改
git checkout -- filename

# 撤销暂存区修改
git reset HEAD filename

# 撤销最后一次提交
git reset --soft HEAD~1
```

### 删除文件
```bash
# 删除文件并暂存
git rm filename

# 只从Git删除,保留本地文件
git rm --cached filename
```

---

## 📦 完整工作流程

### 开发新功能
```bash
# 1. 创建功能分支
git checkout -b feature-new-function

# 2. 开发并测试
# ... 编写代码 ...

# 3. 提交代码
git add .
git commit -m "Add new function"

# 4. 切换回主分支
git checkout main

# 5. 合并功能分支
git merge feature-new-function

# 6. 推送到GitHub
git push

# 7. 删除功能分支(可选)
git branch -d feature-new-function
```

### 发布新版本
```bash
# 1. 确保代码已提交
git add .
git commit -m "Release v1.1.0"

# 2. 创建标签
git tag -a v1.1.0 -m "Version 1.1.0 - 新功能说明"

# 3. 推送代码和标签
git push origin main
git push origin v1.1.0

# 4. 在GitHub上编辑Release说明
```

---

## 🎯 针对本项目的常用命令

### 更新前端代码后
```bash
# 1. 构建前端
npm run build

# 2. 同步到Android
npx cap sync android

# 3. 提交代码
git add .
git commit -m "Update: 更新说明"
git push

# 4. 等待GitHub Actions自动构建APK
```

### 添加新课程内容后
```bash
# 1. 添加素材文件
git add public/course-materials/

# 2. 更新课程数据
git add src/data/courseData.ts

# 3. 提交
git commit -m "Add: 新增XXX课程内容"
git push
```

### 修复Bug后
```bash
git add .
git commit -m "Fix: 修复XXX问题"
git push
```

---

## 📚 提交信息规范

### 格式
```
<type>: <subject>

<body>
```

### Type类型
- `feat`: 新功能
- `fix`: 修复Bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具相关

### 示例
```bash
git commit -m "feat: 添加知识点搜索功能"
git commit -m "fix: 修复图片加载失败问题"
git commit -m "docs: 更新README文档"
git commit -m "style: 优化登录页面样式"
```

---

## 🔍 Git配置

### 查看配置
```bash
# 查看所有配置
git config --list

# 查看用户名
git config user.name

# 查看邮箱
git config user.email
```

### 设置配置
```bash
# 设置全局用户名
git config --global user.name "你的名字"

# 设置全局邮箱
git config --global user.email "your@email.com"

# 设置默认编辑器
git config --global core.editor "code"

# 设置默认分支名
git config --global init.defaultBranch main
```

---

## 💡 实用技巧

### 忽略已跟踪的文件
```bash
# 停止跟踪文件但不删除
git rm --cached filename

# 更新.gitignore后生效
git rm -r --cached .
git add .
git commit -m "Update .gitignore"
```

### 查看文件修改
```bash
# 查看未暂存的修改
git diff

# 查看已暂存的修改
git diff --staged

# 查看特定文件的修改
git diff filename
```

### 暂存当前工作
```bash
# 暂存当前修改
git stash

# 查看暂存列表
git stash list

# 恢复最近的暂存
git stash pop

# 恢复指定的暂存
git stash apply stash@{0}
```

---

## 🆘 紧急情况

### 误提交敏感信息
```bash
# 1. 从历史中删除文件
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch 敏感文件" \
  --prune-empty --tag-name-filter cat -- --all

# 2. 强制推送
git push origin --force --all
```

### 回退到之前的版本
```bash
# 查看提交历史
git log --oneline

# 回退到指定提交(保留修改)
git reset --soft commit_id

# 回退到指定提交(丢弃修改)
git reset --hard commit_id

# 强制推送
git push -f
```

---

## 📖 学习资源

- [Git官方文档](https://git-scm.com/doc)
- [GitHub文档](https://docs.github.com/)
- [Git教程 - 廖雪峰](https://www.liaoxuefeng.com/wiki/896043488029600)
- [Learn Git Branching](https://learngitbranching.js.org/)

---

**快速参考**: 保存此文件以便随时查阅!
