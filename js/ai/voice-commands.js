// voice-commands.js — 语音指令解析（纯函数,Node 可测;供 assist 面板语音助手）
// 中文指令 → 动作:开始训练 / 停止 / 切换场景(平地·起身·上坡·上楼·下楼) / 报告当前助力
// 解析器不含任何浏览器 API;识别与合成在视图层(Web Speech API,本地)。

export const SCENE_WORDS = [
  [['平地', '平路'], 'flat'],
  [['起身', '站起', '起立'], 'standup'],
  [['上坡', '爬坡'], 'uphill'],
  [['上楼', '楼梯', '爬楼梯'], 'stairs'],
  [['下楼', '下坡'], 'downhill'],
];

/**
 * parseVoiceCommand(text) →
 *   { action:'set-scene', scene } | { action:'report-assist' } |
 *   { action:'start-training' } | { action:'stop-training' } | null(未命中)
 */
function parseOriginalVoiceCommand(text) {
  const t = String(text || '').trim();
  if (!t) return null;
  for (const [words, scene] of SCENE_WORDS) {
    if (words.some(w => t.includes(w))) return { action: 'set-scene', scene };
  }
  if (/报告|汇报|多少|当前|现在/.test(t) && /助力|assist|等级/i.test(t)) return { action: 'report-assist' };
  if (/停止|停下|结束|取消/.test(t)) return { action: 'stop-training' };
  if (/开始|启动|打开/.test(t) && /训练|演示|游戏/.test(t)) return { action: 'start-training' };
  if (/报告|汇报/.test(t)) return { action: 'report-assist' };   // 口语省略「助力」也按报告处理
  return null;
}

export const VOICE_HINT_TEXT = 'Say: start training / stop / switch to uphill / report current assistance';

// English input localisation. The original parser and command actions remain intact.
export function parseVoiceCommand(text) {
  const t = String(text || '').trim().toLowerCase();
  const scenes = [
    [/\b(downstairs|downhill|down stairs|down hill)\b/, '下楼'],
    [/\b(upstairs|stairs up|climb stairs|up stairs|stair ascent|stairs)\b/, '上楼'],
    [/\b(uphill|up hill|climb slope)\b/, '上坡'],
    [/\b(stand up|standup|standing up|get up|stand)\b/, '起身'],
    [/\b(level ground|flat ground|flat|level)\b/, '平地'],
  ];
  for (const [re, canonical] of scenes) if (re.test(t)) return parseOriginalVoiceCommand(canonical);
  if (/\b(report|tell|current|how much|what is)\b/.test(t) && /\b(assist|assistance|level|support)\b/.test(t)) return parseOriginalVoiceCommand('报告当前助力');
  if (/\b(stop|end|cancel|finish)\b/.test(t)) return parseOriginalVoiceCommand('停止');
  if (/\b(start|open|begin)\b/.test(t) && /\b(training|demo|game)\b/.test(t)) return parseOriginalVoiceCommand('开始训练');
  if (/\b(report)\b/.test(t)) return parseOriginalVoiceCommand('报告');
  return parseOriginalVoiceCommand(text);
}
