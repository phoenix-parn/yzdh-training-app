# 课程素材目录

## 目录结构

```
course-materials/
├── MF01/                    # 工法1
│   ├── M01/                 # 基础认知模块
│   │   ├── images/          # 图片素材
│   │   ├── content/         # 知识点内容(JSON)
│   │   └── docs/            # 文档素材
│   ├── M02/                 # 核心技术模块
│   ├── M03/                 # 实操流程模块
│   └── M04/                 # 保障体系模块
├── MF02/                    # 工法2
└── MF03/                    # 工法3
└── materials-index.json     # 素材索引
```

## 使用说明

### 1. 加载知识点内容
```typescript
const content = await fetch('/course-materials/MF01/M01/content/1-1.1.1.json')
  .then(res => res.json());
```

### 2. 显示图片
```tsx
<img src="/course-materials/MF01/M01/images/1-1.1.1_现浇vs预制对比表.png" />
```

### 3. 下载文档
```tsx
<a href="/course-materials/MF01/M01/docs/xxx.xlsx" download>下载文档</a>
```

## 素材索引

使用 `materials-index.json` 获取所有素材的完整列表:
```typescript
const index = await fetch('/course-materials/materials-index.json')
  .then(res => res.json());
```

## 注意事项

1. 所有路径都是相对于public目录的绝对路径
2. 图片格式: PNG/JPEG
3. 文档格式: Excel/Word/PDF
4. 知识点内容: JSON格式
