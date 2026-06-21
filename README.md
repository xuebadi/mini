<p align="center">
  <img src="https://img.shields.io/badge/语言-中文版-green" alt="中文版">
  <img src="https://img.shields.io/badge/Three.js-r128-blue" alt="Three.js">
  <img src="https://img.shields.io/badge/许可证-AGPL--3.0-orange" alt="License">
  <img src="https://img.shields.io/badge/状态-可用-brightgreen" alt="Status">
</p>

<h1 align="center">🌍 小宇宙 Builder</h1>

<p align="center">
  <strong>Tiny World Builder 中文版</strong><br>
  在浏览器中建造你的像素小宇宙
</p>

<p align="center">
  <a href="#快速开始">🚀 快速开始</a> • <a href="#功能特性">✨ 功能特性</a> • <a href="#操作指南">🎮 操作指南</a> • <a href="#常见问题">❓ 常见问题</a>
</p>

---

> 🌍 基于 [jasonkneen/tiny-world-builder](https://github.com/jasonkneen/tiny-world-builder) 的中文本地化版本，界面完全中文化，开箱即用。

## 🚀 快速开始

1. 直接在浏览器中打开 `tiny-world-builder.html`
2. 无需安装任何依赖，开箱即用

```bash
# 或克隆仓库
git clone https://github.com/xuebadi/mini.git
cd mini
```

## ✨ 功能特性

| 功能 | 说明 |
|------|------|
| 🏗️ **体素编辑器** | 8×8 网格，建造你的小世界 |
| 🧩 **智能拼接** | 路径、河流、栅栏、房屋自动连接 |
| 🎨 **17种元素** | 地形 / 建筑 / 装饰 / 生物 |
| 🌤️ **天气系统** | 动态云朵、天气变化、昼夜流转 |
| 📷 **多种视角** | 等距 / 俯视 / 透视 / 第一人称 |
| 💾 **本地保存** | 多槽位存档，数据不丢失 |
| 🌐 **多语言** | 中/英/法/西/泰，可自由切换 |
| 📡 **离线可用** | 所有资源本地化，零网络依赖 |
| 🥽 **AR/VR** | 支持 WebXR 模式 |

## 🎮 操作指南

### 基础操作

| 操作 | 方式 |
|------|------|
| 放置元素 | 选择工具 → 点击网格 |
| 删除元素 | 按 `E` 或选择橡皮擦 |
| 旋转视角 | 鼠标拖拽 |
| 缩放 | 鼠标滚轮 |
| 平移 | 右键拖拽 / 空格+拖拽 |

### 高级操作

| 操作 | 快捷键 |
|------|--------|
| 抬高地形 | `R` |
| 降低地形 | `F` |
| 切换视角 | `P` / `I` |
| 命令面板 | `Ctrl+P` |

### 🧩 智能拼接示例

- 🛤️ **路径** → 自动连接成完整道路
- 🌊 **河流** → 自动生成河岸过渡
- 🏠 **房屋** → L 型、T 型等建筑群
- 🪨 **岩石** → 崎岖山石群

## 📁 文件结构

```
├── tiny-world-builder.html     # 主文件（默认中文）
├── engine/
│   ├── i18n/                   # 国际化
│   │   ├── zh.js              # 中文翻译
│   │   ├── en.js              # 英文翻译
│   │   └── i18n-core.js       # 语言核心（默认: zh）
│   └── world/                  # 世界逻辑
├── styles/                      # 样式
├── assets/                      # 资源
├── vendor/                      # Three.js 等第三方库
└── models/                      # 3D 模型
```

## 🌐 语言切换

点击右上角语言按钮即可切换：🇨🇳 中文 · 🇬🇧 English · 🇫🇷 Français · 🇪🇸 Español · 🇹🇭 ไทย

## ❓ 常见问题

<details>
<summary><b>打开后界面是英文？</b></summary>

清除浏览器缓存即可：

```javascript
localStorage.removeItem('tinyworld:lang');
location.reload();
```
</details>

<details>
<summary><b>能离线使用吗？</b></summary>

可以！所有资源（包括 Three.js）都已本地化，双击 HTML 即可。
</details>

<details>
<summary><b>如何添加自定义元素？</b></summary>

参考 `engine/world/19-tools-toolbar.js` 添加新工具定义。
</details>

## 📝 修改说明

相比原项目，中文版做了以下修改：

1. ✏️ `i18n-core.js` — 默认语言改为 `zh`
2. 🏷️ HTML 标题改为"小宇宙 Builder"
3. 🔤 添加思源黑体 (Noto Sans SC) 字体支持
4. 📄 完整中文语言包

## 🔗 原项目

- **作者**: [Jason Kneen](https://github.com/jasonkneen)
- **原仓库**: [jasonkneen/tiny-world-builder](https://github.com/jasonkneen/tiny-world-builder)
- **许可**: AGPL-3.0

---

<p align="center">
  享受建造你的小宇宙！🌍✨<br>
  <sub>小宇宙 Builder · 中文版</sub>
</p>
