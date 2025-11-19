/**
 * System Check Script
 * 系统状态检查脚本
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('系统状态检查');
console.log('='.repeat(80));

// Check 1: Course materials directory
console.log('\n1. 检查课程素材目录...');
const materialsDir = path.join(__dirname, 'public', 'course-materials');
if (fs.existsSync(materialsDir)) {
  console.log('   ✓ 素材目录存在:', materialsDir);
  
  // Check MF01
  const mf01Dir = path.join(materialsDir, 'MF01');
  if (fs.existsSync(mf01Dir)) {
    console.log('   ✓ MF01目录存在');
    
    // Check modules
    ['M01', 'M02', 'M03', 'M04'].forEach(moduleId => {
      const moduleDir = path.join(mf01Dir, moduleId);
      if (fs.existsSync(moduleDir)) {
        const contentDir = path.join(moduleDir, 'content');
        const imagesDir = path.join(moduleDir, 'images');
        
        const contentFiles = fs.existsSync(contentDir) ? fs.readdirSync(contentDir).filter(f => f.endsWith('.json')) : [];
        const imageFiles = fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir).filter(f => f.match(/\.(png|jpg|jpeg)$/i)) : [];
        
        console.log(`   ✓ ${moduleId}: ${contentFiles.length}个知识点, ${imageFiles.length}个图片`);
      }
    });
  } else {
    console.log('   ✗ MF01目录不存在');
  }
} else {
  console.log('   ✗ 素材目录不存在:', materialsDir);
}

// Check 2: Materials index
console.log('\n2. 检查素材索引...');
const indexFile = path.join(materialsDir, 'materials-index.json');
if (fs.existsSync(indexFile)) {
  console.log('   ✓ 素材索引存在');
  try {
    const index = JSON.parse(fs.readFileSync(indexFile, 'utf-8'));
    console.log(`   ✓ 索引包含 ${index.length} 个工法`);
  } catch (err) {
    console.log('   ✗ 索引文件格式错误:', err.message);
  }
} else {
  console.log('   ✗ 素材索引不存在');
}

// Check 3: Sample knowledge point
console.log('\n3. 检查示例知识点...');
const sampleFile = path.join(materialsDir, 'MF01', 'M01', 'content', '1-1.1.1.json');
if (fs.existsSync(sampleFile)) {
  console.log('   ✓ 示例知识点存在: 1-1.1.1.json');
  try {
    const content = JSON.parse(fs.readFileSync(sampleFile, 'utf-8'));
    console.log('   ✓ 标题:', content.title);
    console.log('   ✓ 模块:', content.module);
    console.log('   ✓ 内容长度:', content.content.length, '字符');
    console.log('   ✓ 图片数量:', content.images.length);
  } catch (err) {
    console.log('   ✗ 知识点文件格式错误:', err.message);
  }
} else {
  console.log('   ✗ 示例知识点不存在');
}

// Check 4: Sample image
console.log('\n4. 检查示例图片...');
const sampleImage = path.join(materialsDir, 'MF01', 'M01', 'images', '1-1.1.1_现浇vs预制对比表.png');
if (fs.existsSync(sampleImage)) {
  const stats = fs.statSync(sampleImage);
  console.log('   ✓ 示例图片存在');
  console.log('   ✓ 文件大小:', Math.round(stats.size / 1024), 'KB');
} else {
  console.log('   ✗ 示例图片不存在');
}

// Check 5: Component files
console.log('\n5. 检查组件文件...');
const components = [
  'src/components/KnowledgePointPage.tsx',
  'src/components/CourseDetailPage.tsx',
  'src/components/LoginPage.tsx',
  'src/components/ProfilePage.tsx',
  'src/App.tsx'
];

components.forEach(comp => {
  const compPath = path.join(__dirname, comp);
  if (fs.existsSync(compPath)) {
    console.log(`   ✓ ${comp}`);
  } else {
    console.log(`   ✗ ${comp} 不存在`);
  }
});

// Check 6: Utility files
console.log('\n6. 检查工具文件...');
const utils = [
  'src/utils/auth.ts',
  'src/utils/statistics.ts'
];

utils.forEach(util => {
  const utilPath = path.join(__dirname, util);
  if (fs.existsSync(utilPath)) {
    console.log(`   ✓ ${util}`);
  } else {
    console.log(`   ✗ ${util} 不存在`);
  }
});

// Summary
console.log('\n' + '='.repeat(80));
console.log('检查完成!');
console.log('='.repeat(80));

console.log('\n如果所有检查都通过,请按以下步骤测试:');
console.log('1. 确保开发服务器正在运行: npm run dev');
console.log('2. 打开浏览器访问: http://localhost:3001');
console.log('3. 登录: admin / 123456');
console.log('4. 点击"工法1"进入课程详情');
console.log('5. 展开"基础认知模块"');
console.log('6. 点击"1.1 工法背景与价值"');
console.log('7. 查看知识点详情页面');
console.log('\n如果看不到内容,请打开浏览器开发者工具(F12)查看错误信息。');
