/**
 * Knowledge Point Content Database
 * Contains detailed content for all knowledge points across all courses
 */

import mf02ContentRaw from './mf02_content.json';

// Type assertion for imported JSON
const mf02Content = mf02ContentRaw as Record<string, { title: string; content: string; images: string[] }>;

// MF01 content (existing)
const mf01Content: Record<string, { title: string; content: string; images?: string[] }> = {
  "1-1.1.1": {
    title: "工法概述",
    content: `## 工法概述

地铁超大异形预制构件安装施工工法是一种创新的预制装配式施工技术,主要应用于地铁车站超大异形预制构件的快速安装。

### 核心创新点

1. **预制化生产**
   - 工厂化预制,质量可控
   - 减少现场湿作业
   - 缩短施工周期

2. **专用吊装装置**
   - 旋转吊具技术
   - 精确定位系统
   - 安全可靠

3. **主体结构与内部装修安装相结合**
   - 一次性完成主体和装修
   - 减少二次施工
   - 提高效率

### 与传统工法对比

| 对比项 | 传统现浇 | 预制安装 |
|-------|---------|---------|
| 施工周期 | 45-60天 | 20-30天 |
| 质量控制 | 现场控制难 | 工厂质量好 |
| 环境影响 | 扬尘噪音大 | 绿色环保 |
| 人工成本 | 高 | 低 |
`,
    images: ["/assets/courses/MF01/1-1.1.1_现浇 vs 预制对比表.png"]
  },
  "1-1.1.2": {
    title: "专利技术",
    content: `## 专利技术

本工法拥有多项专利技术,主要包括:

### 1. 旋转吊具专利
- 专利号: ZL 2020 X XXXXXXX.X
- 核心技术: 360°旋转技术
- 创新点: 实现构件空中转体

### 2. 鸭嘴扣吊索具专利
- 专利号: ZL 2020 X XXXXXXX.X
- 核心技术: 快速连接技术
- 创新点: 提高安装效率

### 应用场景
- 预制芯叠合柱安装
- 预制肋叠合墙安装
- 预制叠合顶板安装
`,
    images: ["/assets/courses/MF01/1-1.1.2_构件拼装示意图 + 专利标注.png"]
  }
};

// MF03 content (to be added later)
const mf03Content: Record<string, { title: string; content: string; images?: string[] }> = {};

/**
 * Get knowledge point content by ID
 */
export function getKnowledgeContent(pointId: string): { title: string; content: string; images?: string[] } | null {
  // Try MF01
  if (mf01Content[pointId]) {
    return mf01Content[pointId];
  }
  
  // Try MF02
  if (mf02Content[pointId]) {
    return mf02Content[pointId];
  }
  
  // Try MF03
  if (mf03Content[pointId]) {
    return mf03Content[pointId];
  }
  
  // Return default content if not found
  return {
    title: "内容开发中",
    content: `## ${pointId}

该知识点内容正在开发中,敬请期待。

### 学习要点
- 理解核心概念
- 掌握关键技术
- 熟悉操作流程

### 实践应用
- 结合工程实际
- 注意安全规范
- 确保质量标准
`
  };
}

/**
 * Check if knowledge point has content
 */
export function hasKnowledgeContent(pointId: string): boolean {
  return !!(mf01Content[pointId] || mf02Content[pointId] || mf03Content[pointId]);
}

/**
 * Get all knowledge points for a course
 */
export function getCourseKnowledgePoints(courseId: string): string[] {
  if (courseId === 'MF01') {
    return Object.keys(mf01Content);
  } else if (courseId === 'MF02') {
    return Object.keys(mf02Content);
  } else if (courseId === 'MF03') {
    return Object.keys(mf03Content);
  }
  return [];
}
