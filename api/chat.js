export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return res.status(500).json({ error: '未配置 DEEPSEEK_API_KEY，请在 Vercel Settings → Environment Variables 添加' });

  const { prompt, images } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  try {
    let messages;
    let model = 'deepseek-chat';

    if (images && images.length > 0) {
      // DeepSeek vision
      model = 'deepseek-chat';
      const content = [
        ...images.map(img => ({
          type: 'image_url',
          image_url: { url: `data:${img.type};base64,${img.base64}` }
        })),
        { type: 'text', text: prompt }
      ];
      messages = [{ role: 'user', content }];
    } else {
      messages = [{ role: 'user', content: prompt }];
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, max_tokens: 1500, messages }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(502).json({ error: `DeepSeek 错误 ${response.status}`, detail: err });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
