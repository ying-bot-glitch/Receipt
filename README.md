# 家厨菜谱助手 · 部署指南

## 你需要准备
- GitHub 账号（已有）
- [Vercel 账号](https://vercel.com)（用 GitHub 登录，免费）
- [DeepSeek API Key](https://platform.deepseek.com/api_keys)

---

## 部署步骤（约 10 分钟）

### 第一步：上传代码到 GitHub

1. 打开 https://github.com/new，新建一个仓库，名字随意（如 `jiaochu`）
2. 把这整个 `jiaochu` 文件夹里的所有文件上传进去
   - 点击 **uploading an existing file**
   - 把 `api/chat.js`、`public/index.html`、`vercel.json` 拖进去
   - 点击 **Commit changes**

### 第二步：部署到 Vercel

1. 打开 https://vercel.com，用 GitHub 账号登录
2. 点击 **Add New → Project**
3. 找到刚才的仓库，点击 **Import**
4. 配置页面直接点 **Deploy**（不需要改任何设置）
5. 等待约 1 分钟，部署完成 ✓

### 第三步：填入 DeepSeek API Key

1. 在 Vercel 项目页面，点击顶部 **Settings**
2. 左侧点击 **Environment Variables**
3. 添加一个变量：
   - Name: `DEEPSEEK_API_KEY`
   - Value: 你的 DeepSeek Key（从 platform.deepseek.com 获取）
4. 点击 **Save**
5. 回到 **Deployments** 页面，点击最新那条右边的 **⋯ → Redeploy**

### 第四步：访问你的网站

Vercel 会给你一个免费域名，格式类似：
```
https://jiaochu-xxxx.vercel.app
```

收藏这个地址，手机电脑都能用，也可以发给家人。

---

## 文件结构说明

```
jiaochu/
├── api/
│   └── chat.js          # 后端：转发请求到 DeepSeek，隐藏 API Key
├── public/
│   └── index.html       # 前端：菜谱助手完整页面
└── vercel.json          # Vercel 路由配置
```

---

## 常见问题

**Q: AI 识别失败？**
检查 Vercel → Settings → Environment Variables 里的 Key 是否正确，记得 Redeploy。

**Q: 菜谱数据会丢失吗？**
目前数据存在浏览器 localStorage，换设备或清除缓存会丢失。如需多设备同步，后续可以接入数据库（如 Vercel KV）。

**Q: 费用？**
Vercel 免费版每月有 100GB 流量，个人使用完全够。DeepSeek API 极便宜，每次 AI 识别约 $0.001。
