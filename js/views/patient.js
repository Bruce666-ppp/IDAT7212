// 用户端 · 今日概览（计划卡+连续天数点阵+ROM 周趋势+质量分柱）+ 记录列表（source chip）+ 导出
import { getSessions, getPlan } from '../data/repo.js';
import { exportAll } from '../data/export.js';
import { drawRomTrend, drawQualityBars } from '../viz/charts.js';

const pad = n => String(n).padStart(2, '0');
const dayKey = ts => { const d = new Date(ts); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const avg = a => a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0;

function dailyRom(sessions, days = 14) {
  const map = new Map();
  sessions.forEach(s => {
    const k = dayKey(s.tsStart);
    if (!map.has(k)) map.set(k, { k, l: [], r: [] });
    const e = map.get(k);
    e.l.push(s.metrics.kneePeakL); e.r.push(s.metrics.kneePeakR);
  });
  return [...map.values()].sort((a, b) => (a.k < b.k ? -1 : 1)).slice(-days)
    .map(e => ({ label: e.k.slice(5).replace('-', '/'), l: Math.round(avg(e.l)), r: Math.round(avg(e.r)) }));
}

function streakInfo(sessions) {
  const perDay = new Map();
  sessions.forEach(s => {
    if (s.counts.completed > 0) {
      const k = dayKey(s.tsStart);
      perDay.set(k, (perDay.get(k) || 0) + 1);
    }
  });
  const cur = new Date();
  if (!perDay.has(dayKey(cur.toISOString()))) cur.setDate(cur.getDate() - 1); // 今天未练不算断
  let streak = 0;
  while (perDay.has(dayKey(cur.toISOString()))) { streak++; cur.setDate(cur.getDate() - 1); }
  return { streak, perDay };
}

function dotGrid(perDay) {
  const cells = [];
  const start = new Date(); start.setHours(12, 0, 0, 0); start.setDate(start.getDate() - 27);
  const offset = (start.getDay() + 6) % 7; // 周一=0
  for (let i = 0; i < offset; i++) cells.push('<span class="streak-dot ghost" aria-hidden="true"></span>');
  const todayKey = dayKey(new Date().toISOString());
  for (let i = 0; i < 28; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const k = dayKey(d.toISOString());
    const c = perDay.get(k) || 0;
    const lv = c >= 3 ? 3 : c;
    const lbl = `${d.getMonth() + 1}/${d.getDate()}, ${c > 0 ? `Completed ${c} training session${c === 1 ? '' : 's'}` : "No entries"}`;
    cells.push(`<span class="streak-dot ${c > 0 ? `on lv${lv}` : ''} ${k === todayKey ? 'today' : ''}" role="img" aria-label="${lbl}" title="${lbl}"></span>`);
  }
  return cells.join('');
}

const EX = { squat: "Squat", 'seated-ext': "Seated knee extension" };
function recRow(s) {
  const d = new Date(s.tsStart);
  const chip = s.source === 'live'
    ? "<span class=\"ku-chip live\">LIVE · Measured input</span>"
    : "<span class=\"ku-chip sim\">SIMULATED</span>";
  return `<div class="rec-row">
    <span class="rec-date">${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}</span>
    <span class="rec-main">${EX[s.exercise] || s.exercise} · Completed ${s.counts.completed}/${s.counts.target} reps · Self-report ${s.subjective.pain}/10<span class="muted">(self-reported)</span></span>
    <span class="rec-metric">Quality ${Math.round(s.metrics.qualityAvg)} · Symmetry ${Math.round(s.metrics.symmetryAvg)}%</span>
    ${chip}
  </div>`;
}

export function render(root) {
  const sessions = getSessions();
  const plan = getPlan();
  const { streak, perDay } = streakInfo(sessions);
  const rom = dailyRom(sessions);
  const now = new Date();

  root.innerHTML = `
  <div class="view-head">
    <span class="eyebrow">Patient Dashboard</span>
    <h1>Today's Overview</h1>
    <p class="view-sub">${new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(now)}  · Local SIMULATED demo data; exported JSON retains a source label on every record</p>
  </div>

  <div class="grid-2">
    <div class="col">
      <div class="panel">
        <h3>Today's Plan</h3>
        <p class="panel-sub">From Coach Console settings (plan.v1 · Local demo data)</p>
        <div class="plan-nums">
          <span><b class="stat-inline">${plan.sets}</b> sets</span>
          <span class="muted">×</span>
          <span><b class="stat-inline">${plan.reps}</b> reps/set</span>
          <span class="plan-sep"></span>
          <span>Support level <b class="stat-inline">${plan.supportPct}%</b></span>
        </div>
        <div class="quick-links">
          <a class="btn" href="#/game">Start Training</a>
          <a class="btn ghost" href="#/body">Body Map</a>
        </div>
      </div>

      <div class="panel">
        <h3>Training Streak</h3>
        <p class="panel-sub">Past 28 days · A day lights up when at least one session is completed</p>
        <div class="streak-top"><span class="streak-num">${streak}</span><span class="streak-unit">days</span></div>
        <div class="streak-grid">${dotGrid(perDay)}</div>
      </div>

      <div class="panel">
        <h3>Range of Motion · Weekly Trend</h3>
        <p class="panel-sub">Peak knee angle in degrees · Fixed vertical scale 0–150° · Daily aggregation</p>
        <canvas class="chart-canvas chart-rom" id="pt-rom"></canvas>
        <div class="legend-row">
          <span class="lg"><i></i>Left knee L</span>
          <span class="lg"><i class="dash"></i>Right knee R</span>
          <span class="lg"><i class="area"></i>Peak-angle range</span>
        </div>
      </div>

      <div class="panel">
        <h3>Movement Quality (Last 20 Sessions)</h3>
        <p class="panel-sub">0–100 · Bars: sessions · Line: 7-session moving average · ▲: safety alert</p>
        <canvas class="chart-canvas chart-q" id="pt-q"></canvas>
        <p class="chart-note" id="pt-q-note"></p>
      </div>
    </div>

    <div class="col">
      <div class="panel">
        <h3>Training Records</h3>
        <p class="panel-sub">Every record retains its data-source label</p>
        <div class="rec-list">${sessions.slice(0, 9).map(recRow).join('') || "<p class=\"muted\">No records yet</p>"}</div>
        <button class="btn ghost btn-block" id="pt-export">Export Data as JSON</button>
        <p class="plan-note" id="pt-export-note">The export includes an integrityNote. Every simulated record retains its source label; do not remove it.</p>
      </div>
    </div>
  </div>`;

  const romCv = root.querySelector('#pt-rom');
  const qCv = root.querySelector('#pt-q');
  const draw = () => {
    drawRomTrend(romCv, rom);
    const info = drawQualityBars(qCv, sessions);
    const note = root.querySelector('#pt-q-note');
    if (note && info) note.textContent = `Last ${sessions.slice(0, 20).length} sessions: mean ${Math.round(info.baseline)} points; safety alerts: ${info.warns}`;
  };
  draw();

  let tid = null;
  const onResize = () => { clearTimeout(tid); tid = setTimeout(draw, 150); };
  window.addEventListener('resize', onResize);

  root.querySelector('#pt-export').addEventListener('click', () => {
    const name = exportAll();
    root.querySelector('#pt-export-note').textContent = name ? `Exported: ${name}` : "Export failed. Please try again.";
  });

  return () => { window.removeEventListener('resize', onResize); clearTimeout(tid); };
}
