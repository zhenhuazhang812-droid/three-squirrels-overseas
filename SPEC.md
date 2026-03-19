---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304402206af6a1d27a220a853c660f6e9977966fcb421bb7a7639eb5bb1aa7549a2b1f1c0220010fd9e072d8d6d381f49b1fa1a999a83e77eb533b857ebc9634dd3963751e1d
    ReservedCode2: 3045022074e0330c8a73c908875bd6db1edd8fb09da406443b1d73ea3cf240a929da96c1022100b9607e6b3e749ff14aacbbda49a9e60e6ba87405f0297d30d6602d45980ba5d0
---

# 三只松鼠海外中心官网 - 项目规格文档

## 1. Concept & Vision

三只松鼠海外中心官网是一个面向全球B2B客户的企业展示平台，融合东方坚果文化与国际商务审美。网站以"自然活力、品质承诺、全球信赖"为核心叙事，通过沉浸式视频、精致产品展示与透明企业实力呈现，建立海外采购商对中国零食品牌的专业信任感。整体风格既有国际企业的专业严谨，又保留三只松鼠年轻活力的品牌基因。

## 2. Design Language

### 2.1 Aesthetic Direction
**风格定位**：Modern Corporate + Playful Accent（专业企业官网 + 活力品牌点缀）
- 参考：Apple企业站的结构感 + Innocent Drinks的活力感
- 大面积留白创造呼吸感，品牌橙色作为能量点缀
- 松鼠IP元素仅在加载动画、hover效果、空状态等细节处自然融入

### 2.2 Color Palette
```
Primary Orange (品牌橙):    #FF6B35
Secondary Orange (深橙):    #E85A24
Dark Charcoal (主文字):     #2D3436
Medium Gray (次要文字):     #636E72
Light Gray (分割线/背景):   #DFE6E9
Off-White (页面背景):       #FAFBFC
Pure White (卡片背景):      #FFFFFF
Accent Green (成功/健康):  #00B894
```

### 2.3 Typography
```
主标题: Poppins, 700, 48-72px
副标题: Poppins, 600, 28-36px
正文:   Inter, 400, 16px, 1.7 line-height
中文:   "PingFang SC", "Microsoft YaHei", sans-serif
```

### 2.4 Spatial System
- 基础单位: 8px
- 区块间距: 80-120px (大区块), 40-60px (子区块)
- 卡片圆角: 12px
- 按钮圆角: 8px
- 最大内容宽度: 1200px

### 2.5 Motion Philosophy
- **入场动画**: fade-up, 600ms ease-out, staggered 100ms
- **Hover效果**: scale 1.02, 300ms ease
- **页面切换**: smooth scroll
- **数字计数**: 0→目标值, 2000ms, ease-out
- **视频播放器**: 自定义控制栏, 滑动手势支持

### 2.6 Visual Assets
- **图标**: Lucide Icons (线性风格, 2px stroke)
- **图片**: Unsplash高质量商业图 + 产品白底图
- **装饰**: 圆角矩形、渐变橙色圆形点缀、SVG松鼠尾巴曲线
- **视频**: 全屏背景视频(首页) + 内嵌播放器(视频中心)

## 3. Layout & Structure

### 3.1 页面架构
```
├── index.html          # 首页 (Hero + 数据 + 优势 + 产品 + 合作 + CTA)
├── about.html          # 关于我们 (品牌故事 + 历程 + 荣誉 + 团队)
├── videos.html         # 视频中心 (筛选 + 视频网格)
├── products.html       # 产品中心 (分类 + 筛选 + 网格)
├── product-detail.html # 产品详情 (图片 + 规格 + 询价)
└── contact.html        # 联系我们 (信息 + 地图 + 表单)
```

### 3.2 响应式断点
- Desktop: 1200px+ (4列网格)
- Tablet: 768px-1199px (2列网格)
- Mobile: <768px (单列, 汉堡菜单)

### 3.3 首页结构
1. **Header**: 固定透明导航, 滚动后白色背景
2. **Hero**: 全屏视频背景 + 品牌标语 + 双CTA按钮
3. **Stats Bar**: 4个核心数据(年销售额/产品SKU/覆盖国家/合作伙伴)
4. **About Preview**: 左图右文, 品牌故事摘要
5. **Strengths Grid**: 4个核心优势图标卡片
6. **Video Showcase**: 精选视频预览, 点击跳转视频中心
7. **Products Preview**: 6个精选产品, 查看全部按钮
8. **Partners**: 合作伙伴Logo墙
9. **CTA Section**: 联系咨询区块
10. **Footer**: 多栏链接 + 社交媒体 + 版权

## 4. Features & Interactions

### 4.1 全局功能
- **导航栏**:
  - 滚动超过100px时背景变白 + 阴影
  - 当前页面高亮
  - 移动端汉堡菜单(滑入动画)
  - 语言切换(EN/ZH)占位

- **返回顶部**: 滚动超过500px显示, 平滑回到顶部

- **加载动画**: 松鼠Logo呼吸动画, 环形进度条

### 4.2 首页功能
- **Hero视频**: 自动播放静音背景视频, 点击播放按钮可播放/暂停
- **数据计数器**: 进入视口时触发数字滚动动画
- **产品卡片Hover**: 图片放大1.05, 显示"View Details"按钮

### 4.3 视频中心功能
- **视频分类**: All / Company Profile / Products / Brand Story
- **视频卡片**: 封面图 + 播放图标 + 时长 + 标题
- **视频播放器**:
  - 自定义控制栏(播放/暂停、音量、进度、全屏)
  - 点击封面播放
  - 键盘快捷键(空格播放/暂停, F全屏)

### 4.4 产品中心功能
- **分类侧边栏**: 主分类 + 子分类复选框
- **筛选条件**: Price Range, MOQ, Customizable (开关)
- **搜索框**: 实时搜索, 300ms debounce
- **产品网格**:
  - 2/3/4列切换
  - 列表/网格视图切换
- **产品卡片**: 图片 + 名称 + 分类 + MOQ + 价格区间
- **分页**: 每页12个, 页码导航

### 4.5 产品详情功能
- **图片画廊**: 主图 + 缩略图列表, 点击切换
- **规格信息**: 净含量、配料表、产地、保质期
- **MOQ显示**: 最小起订量
- **询价按钮**: 跳转联系表单并预填产品信息

### 4.6 联系表单功能
- **表单字段**:
  - Name (必填)
  - Company (必填)
  - Email (必填, 格式验证)
  - Phone (选填)
  - Inquiry Type (下拉: Product / Business Cooperation / General)
  - Product Interest (产品勾选, 多选)
  - Message (必填, 最少20字符)
- **实时验证**: 字段失焦时验证, 错误提示
- **提交反馈**: loading状态 → 成功提示/错误提示

## 5. Component Inventory

### 5.1 Button
- **Primary**: 橙色背景, 白色文字, hover变深
- **Secondary**: 白色背景, 橙色边框, hover填充
- **Ghost**: 透明背景, 橙色文字, hover背景色
- **States**: default / hover / active / disabled / loading

### 5.2 Card
- **Product Card**: 白色背景, 12px圆角, 轻微阴影
- **Video Card**: 封面图 + 渐变遮罩 + 播放图标
- **Stat Card**: 数字 + 单位 + 标签, 无背景
- **Team Card**: 头像 + 姓名 + 职位

### 5.3 Form Elements
- **Input**: 1px灰色边框, focus时橙色边框
- **Select**: 自定义下拉箭头
- **Checkbox**: 自定义橙色勾选
- **Textarea**: 可拉伸, 最小高度120px

### 5.4 Navigation
- **Desktop Nav**: 水平排列, hover下划线动画
- **Mobile Nav**: 全屏覆盖, 垂直列表
- **Breadcrumb**: 路径导航, 分隔符">"

### 5.5 Video Player
- **Cover**: 封面图 + 居中播放按钮 + 标题
- **Controls**: 底部黑色条, 进度条可拖拽
- **States**: loading / playing / paused / ended

## 6. Technical Approach

### 6.1 技术栈
- **前端**: 纯HTML5 + CSS3 + Vanilla JavaScript (ES6+)
- **样式**: CSS Variables + Flexbox/Grid + CSS Animations
- **图标**: Lucide Icons (CDN引入)
- **字体**: Google Fonts (Poppins, Inter)
- **视频**: HTML5 Video API
- **构建**: 无需构建工具, 直接部署

### 6.2 文件结构
```
/three-squirrels-overseas/
├── index.html
├── about.html
├── videos.html
├── products.html
├── product-detail.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   ├── logo.svg
│   ├── hero-video-poster.jpg
│   ├── products/
│   ├── videos/
│   └── partners/
└── assets/
    └── videos/
```

### 6.3 兼容性
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- iOS Safari 14+, Chrome for Android 90+

### 6.4 性能目标
- 首屏加载 < 3秒
- Lighthouse Performance > 90
- 图片懒加载
- CSS/JS gzip压缩
